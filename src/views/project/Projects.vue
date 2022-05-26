<template>
  <div>
    <a-card :bordered='false' class='ant-pro-components-tag-select'>
      <a-form :form='form' layout='inline'>
        <standard-form-row title='所属类目' block style='padding-bottom: 11px;'>
          <a-form-item>
            <tag-select>
              <tag-select-option value='Category1'>软件工程类</tag-select-option>
              <tag-select-option value='Category2'>电子信息类</tag-select-option>
              <tag-select-option value='Category3'>建筑工程类</tag-select-option>
              <tag-select-option value='Category4'>机械工程类</tag-select-option>
              <tag-select-option value='Category5'>水电工程类</tag-select-option>
              <tag-select-option value='Category5'>其它</tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>

        <standard-form-row title='其它选项' grid last>
          <a-row>
            <a-col :lg='8' :md='10' :sm='10' :xs='24'>
              <a-form-item :wrapper-col='{ sm: { span: 16 }, xs: { span: 24 } }' label='作者'>
                <a-select
                  style='max-width: 200px; width: 100%;'
                  mode='multiple'
                  placeholder='不限'
                  v-decorator="['author']"
                  @change='handleChange'
                >
                  <a-select-option value='lisa'>王昭君</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg='8' :md='10' :sm='10' :xs='24'>
              <a-form-item :wrapper-col='{ sm: { span: 16 }, xs: { span: 24 } }' label='好评度'>
                <a-select
                  style='max-width: 200px; width: 100%;'
                  placeholder='不限'
                  v-decorator="['rate']"
                >
                  <a-select-option value='good'>优秀</a-select-option>
                  <a-select-option value='normal'>普通</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </standard-form-row>
      </a-form>
    </a-card>
    <ProjectDetailList :projects='projects'></ProjectDetailList>
  </div>
</template>

<script>
import moment from 'moment'
import ProjectDetailList from '@/views/project/ProjectDetailList'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'

const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.Item
import { listProject } from '@/api/project'
import { EventBus } from '@/bus/bus'

export default {
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    ProjectDetailList
  },
  data() {
    return {
      projects: [],
      data: [],
      form: this.$form.createForm(this),
      loading: true
    }
  },
  filters: {
    fromNow(date) {
      return moment(date).fromNow()
    }
  },
  mounted() {
    let value = ''
    if (this.$route.params.searchValue !== undefined && this.$route.params.searchValue !== '') {
      value = this.$route.params.searchValue
    }
    this.getList(value)
    EventBus.$on('project-get-searchvalue', this.getList)
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    getList(value) {
      let params = {}
      if (value !== undefined && value !== '') {
        params = {
          project_name_like: value
        }
      }
      listProject(params).then(res => {
        if (res.code !== 0) {
          this.$message.error('获取项目列表失败')
          return
        }
        this.projects = res.data
      })
    }
  }
}
</script>

<style lang='less' scoped>
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}

.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0, 0, 0, .45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
</style>
