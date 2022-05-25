<template>
  <div>
    <a-button type='' @click='showDrawer'>修改记录</a-button>
    <a-drawer
      title='修改项目文件'
      :width='600'
      :visible='visible'
      :body-style="{ paddingBottom: '0px' }"
      @close='onClose'
    >
      <a-form layout='left' hide-required-mark>
        <a-form-item
          label='项目文件'
          :labelCol='{lg: {span: 3}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 21}, sm: {span: 17} }'
          :required='true'>
          <ModifyFile @getModifyFileUrlFromChild='getModifyFileUrlFromChild'></ModifyFile>
        </a-form-item>
        <a-form-item
          label='项目节点'
          :labelCol='{lg: {span: 3}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 21}, sm: {span: 17} }'>
          <a-select :default-value='currentNode' style='width: 120px' v-model='history.current_process'>
            <a-select-option v-for='node in allNode' :value='node'>
              {{ node }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label='提交描述'
          :labelCol='{lg: {span: 3}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 21}, sm: {span: 17} }'>
          <a-textarea
            rows='10'
            placeholder='请输入本次提交的项目信息'
            v-model='history.description'
          />
        </a-form-item>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >

        <a-button :style="{ marginRight: '8px' }" @click='onClose'>
          取消
        </a-button>
        <a-button type='primary' @click='modifyProjectHistory'>
          提交
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
// import UploadFile from '@/views/upload/UploadFile'
import ModifyFile from '@/views/upload/ModifyFile'
import { modifyHistory } from '@/api/project'

export default {
  components: {
    // UploadFilexx
    ModifyFile
  },
  props: ['currentNode', 'allNode', 'projectID'],
  data() {
    return {
      visible: false,
      history: {
        description: '',
        url: '',
        current_process: '',
      }
    }
  },
  methods: {
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    modifyProjectHistory() {
      this.history.project_id = this.projectID
      modifyHistory(this.history).then(res => {
        this.visible = false
       })
      this.visible = false
    },
    getModifyFileUrlFromChild(url) {
      this.history.url = url
      console.log(url)
    }
  }
}
</script>
