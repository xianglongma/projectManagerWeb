<template>
  <a-col>
    <a-card :bordered='false'>
      <div>
        <!--      <a-rate style='width: 100px; height: 100px;' :default-value="2" disabled >测试</a-rate>-->
        <span>评分 <my-rate></my-rate> </span>
      </div>
      <template #extra>
        <a-button type=''>{{ $t('result.success.btn-return') }}</a-button>
        <a-button style='margin-left: 8px'>提交记录</a-button>
        <ModifyProjectProcess :projectID='project.ID' :current-node='project.current_process' :all-node='nodes' style='margin-left: 8px;display: inline-block'></ModifyProjectProcess>
      </template>
      <div style='width: 100%;text-align: center;'>
        <img :src='project.icon' style='height: 96px; width: 96px; vertical-align: middle;display: inline-block;'>

      </div>
      <div style='text-align: center; font-size: 24px;'>{{ project.title }}</div>
      <div style='text-align: center; font-size: 14px; margin-bottom: 40px;color: darkgray'>{{ project.description }}
      </div>
      <a-divider dashed />

      <div style='margin-top:10px;margin-bottom:10px;' v-if='userArr.length > 0'><span
        style='font-weight: 400; font-size: 14px; color: black;margin-right: 10px'>项目成员:</span>
        <span style='font-size: 16px' :key='index' v-for='(item, index) in userArr'>{{ item }} <span
          v-if='item.length < index + 1'>、</span></span>
      </div>
      <div style='margin-top:10px;margin-bottom:10px;' v-if='project.detail !== ""'><span
        style='font-weight: 400; font-size: 14px; color: black;margin-right: 10px'>项目详情:</span>{{ project.detail }}
      </div>
      <div style='margin-top:10px;margin-bottom:10px;' v-if='project.url !== ""'><span
        style='font-weight: 400; font-size: 14px; color: black;margin-right: 10px'>项目文件链接:</span><a
        :href='project.url'>{{ project.url }}</a>
      </div>
      <div class='content'>
        <div style='font-size: 14px; color: rgba(0, 0, 0, 0.85); font-weight: 400; margin-bottom: 20px;'>项目进度</div>
        <a-row style='margin-bottom: 16px'>
          <a-col :xs='24' :sm='12' :md='12' :lg='12' :xl='6'>
            <span style='color: rgba(0, 0, 0, 0.85)'>{{ $t('result.success.operate-id') }}：</span>
            {{ project.ID }}
          </a-col>
          <a-col :xs='24' :sm='12' :md='12' :lg='12' :xl='6'>
            <span style='color: rgba(0, 0, 0, 0.85)'>{{ $t('result.success.principal') }}：</span>
            {{ project.nickname }}
          </a-col>
          <a-col :xs='24' :sm='24' :md='24' :lg='24' :xl='12'>
            <span style='color: rgba(0, 0, 0, 0.85)'>{{ $t('result.success.operate-time') }}：</span>
            {{ projectStart }} ~ {{ projectEnd }}
          </a-col>
        </a-row>
        <a-steps :current='currentNode' :direction='isMobile && directionType.vertical || directionType.horizontal'
                 progressDot>
          <a-step v-for='(item, index) in nodes' :title='item'>
            <span style='font-size: 14px' slot='title'>{{ $t('result.success.step1-title') }}</span>
            <template slot='description'>
              <div
                style='fontSize: 12px;
                 color: rgba(0, 0, 0, 0.45); position: relative; left: 42px;text-align: left;'
                slot='description'>
                <div v-if='index <1'style='margin: 8px 0 4px'>
                  {{project.nickname}}
                </div>
                <div v-if='index <1'>{{ projectStart }}</div>
              </div>
            </template>
          </a-step>
        </a-steps>
      </div>
    </a-card>
    <my-comment></my-comment>
  </a-col>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'
import MyComment from '@/views/comment/MyComment'
import ModifyProjectProcess from '@/views/result/ModifyProjectProcess'
import logoUrl from '@/assets/logo.svg?inline'
import { retrieveProject } from '@/api/project'
import dayjs from 'dayjs'

const directionType = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

export default {
  name: 'Success',
  // eslint-disable-next-line standard/object-curly-even-spacing
  components: { MyComment, logoUrl, ModifyProjectProcess},
  mixins: [baseMixin],
  data() {
    this.directionType = directionType
    return {
      project: {},
      userArr: [],
      projectStart: '',
      projectEnd: '',
      nodes: [],
      currentNode: 0
    }
  },
  beforeCreate() {
    let projectID = localStorage.getItem('projectID')
    if (!projectID || projectID === '') {
      projectID = this.$route.params.projectID
    }
    retrieveProject(projectID).then(res => {
      if (res.code !== 0) {
        this.$message.error(res.message)
        return
      }
      this.project = res.data
      console.log(this.project)
    })
  },
  computed: {
    result() {
      return {
        title: this.$t('result.success.title'),
        description: this.$t('result.success.description')
      }
    }
  },
  watch: {
    project: {
      handler: function(newV, oldV) {
        // 项目成员数组
        this.userArr = newV.users.split('|')
        console.log(this.userArr)
        this.userArr = this.userArr.filter(u => {
          return u && u.trim()
        })
        // 项目节点数组
        this.nodes = newV.all_process_node.split('|')
        this.nodes = this.nodes.filter(u => {
          return u && u.trim()
        })
        // 当前项目节点
        this.currentNode = this.nodes.indexOf(this.project.current_process)
        this.projectStart = dayjs(this.project.start).format('YYYY-MM-DD')
        this.projectEnd = dayjs(this.project.end).format('YYYY-MM-DD')
      }
    }
  }
}
</script>
