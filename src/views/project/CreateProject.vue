<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper :title='false' :content="$t('form.basic-form.basic.description')">
    <a-card :body-style="{padding: '24px 32px'}" :bordered='false'>
      <a-form @submit='handleSubmit'>
        <a-form-item
          :label="$t('form.basic-form.title.label')"
          :labelCol='{lg: {span: 7}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 10}, sm: {span: 17} }'>
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: '请输入项目名称' }]}
            ]"
            name='name'
            v-model='project.title'
            :placeholder="$t('form.basic-form.title.placeholder')" />
        </a-form-item>
        <a-form-item
          label='项目描述'
          :labelCol='{lg: {span: 7}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 10}, sm: {span: 17} }'>
          <a-input
            v-model='project.description'
            placeholder='简要对项目进行描述' />
        </a-form-item>
        <a-form-item
          label='起止时间'
          :labelCol='{lg: {span: 7}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 10}, sm: {span: 17} }'>
          <a-range-picker
            name='buildTime'
            style='width: 100%'
            v-model='timerange'
          />
        </a-form-item>
        <a-form-item
          label='项目图标'
          :labelCol='{lg: {span: 7}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 10}, sm: {span: 17} }'
          :required='true'>
          <UploadIcon @getFileImageFromChild='getFileImageFromChild'></UploadIcon>
        </a-form-item>
        <a-form-item
          label='项目文件'
          :labelCol='{lg: {span: 7}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 10}, sm: {span: 17} }'
          :required='true'>
          <UploadFile @getFileUrlFromChild='getFileUrlFromChild'></UploadFile>
        </a-form-item>
        <a-form-item
          label='项目详情'
          :labelCol='{lg: {span: 7}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 10}, sm: {span: 17} }'>
          <a-textarea
            rows='4'
            placeholder='请输入项目的详细描述'
            v-model='project.detail'
            />
        </a-form-item>
        <a-form-item
          label='项目成员'
          :labelCol='{lg: {span: 7}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 10}, sm: {span: 17} }'
        >
          <TeamTags @getTeamUsersFromChild='getTeamUsersFromChild'></TeamTags>
        </a-form-item>
        <a-form-item
          label='项目节点'
          :labelCol='{lg: {span: 7}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 10}, sm: {span: 17} }'
        >
          <ProjectProcess @getProcessNodes='getProcessNodes'></ProjectProcess>
        </a-form-item>
        <a-form-item
          :label="$t('form.basic-form.public.label')"
          :labelCol='{lg: {span: 7}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 10}, sm: {span: 17} }'
          :required='false'
        >
          <a-radio-group v-model='project.permmit'>
            <a-radio :value='1' v-model='project.permmit'>{{ $t('form.basic-form.radio.public') }}</a-radio>
            <a-radio :value='2' v-model='project.permmit'>{{ $t('form.basic-form.radio.partially-public') }}</a-radio>
            <a-radio :value='3' v-model='project.permmit'>{{ $t('form.basic-form.radio.private') }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :wrapperCol='{ span: 24 }'
          style='text-align: center'
        >
          <a-button size='large' type='primary' @click='onSubmitProject'>
            创建项目
          </a-button>
        </a-form-item>
        <a-form-item
          :wrapperCol='{ span: 24 }'>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import UploadFile from '@/views/upload/UploadFile'
import UploadIcon from '@/views/upload/UploadIcon'
import TeamTags from '@/views/project/TeamTags'
import { createProject } from '@/api/project'
import ProjectProcess from '@/views/project/ProjectProcess'
export default {
  name: 'CreateProject',
  components: {
    UploadFile,
    UploadIcon,
    TeamTags,
    ProjectProcess
  },
  data() {
    return {
      // form: this.$form.createForm(this),
      project: {
        title: '',
        description: '',
        detail: '',
        current_process: '',
        stars: 0,
        score: 0,
        url: '',
        avatar_url: '',
        permmit: 1,
        users: '',
        start: 0,
        end: 0,
        all_process_node:''
      },
      timerange: [],
      usersArr: [],
      nodesArr: []
    }
  },
  watch: {
    timerange: {
      handler: function(newVal, oldVal) {
        this.project.start = Date.parse(newVal[0])
        this.project.end = Date.parse(newVal[1])
      },
      deep: true
    }
  },
  methods: {
    getFileUrlFromChild(filename) {
      this.project.url = filename
    },
    getFileImageFromChild(filename) {
      this.project.avatar_url = filename
    },
    getTeamUsersFromChild(users) {
      this.usersArr = users
      this.project.users = users.reduce((u, cur) => {
        return u + cur + '|'
      }, '|')
      console.log(this.usersArr)
    },
    getProcessNodes(nodes) {
      this.project.all_process_node = nodes.reduce((u, cur) =>{
        return u + cur + '|'
      }, '|')
    },
    // handler
    handleSubmit(e) {
      e.preventDefault().stopPropagation()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    onSubmitProject() {
      createProject(this.project).then(res => {
        if (res.code !== 0) {
          this.$message.error(res.message)
          return
        }
        localStorage.setItem('projectID', res.data.id)
        this.$router.push({
          name: 'Success',
          params: {
            projectID: res.data.id
          }
        })
      })
    }
  }
}
</script>
