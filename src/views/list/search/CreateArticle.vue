<template>
  <div>
    <a-button type='' @click='showDrawer'>发布心愿</a-button>
    <a-drawer
      title='创建文章'
      :width='600'
      :visible='visible'
      :body-style="{ paddingBottom: '0px' }"
      @close='onClose'
    >
      <a-form layout='left' hide-required-mark>
        <a-form-item
          label='文章标题'
          :labelCol='{lg: {span: 3}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 21}, sm: {span: 17} }'>
          <a-input
            rows='10'
            placeholder='请输入文章标题'
            v-model='article.title'
          />
        </a-form-item>
        <a-form-item
          label='文章简介'
          :labelCol='{lg: {span: 3}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 21}, sm: {span: 17} }'>
          <a-input
            rows='10'
            placeholder='请输入文章简介'
            v-model='article.description'
          />
        </a-form-item>
        <a-form-item
          label='文章内容'
          :labelCol='{lg: {span: 3}, sm: {span: 7}}'
          :wrapperCol='{lg: {span: 21}, sm: {span: 17} }'>
          <a-textarea
            rows='10'
            placeholder='请输入文章内容'
            v-model='article.content'
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
        <a-button type='primary' @click='createNewArticle'>
          提交
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
// import UploadFile from '@/views/upload/UploadFile'
import ModifyFile from '@/views/upload/ModifyFile'
import { createArticle } from '@/api/article'

export default {
  name: 'CreateArticle',
  components: {
    // UploadFilexx
    ModifyFile
  },
  data() {
    return {
      visible: false,
      article: {
        title: '',
        description: '',
        content: ''
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
    syncArticle() {
      this.$emit('syncArticle')
    },
    createNewArticle() {
      debugger
      createArticle(this.article).then(res => {
        this.visible = false
        if (res.code !== 0) {
          this.$message.error(`创建文章失败，原因为${res.message}`)
          return
        }
        this.article.title = ''
        this.article.description = ''
        this.article.content = ''
        this.$message.info('创建成功')
        this.$emit('syncArticle')
      })
    }
  }
}
</script>
