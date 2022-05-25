<template>
  <a-upload name='file' :show-upload-list='true'
            :fileList='fileList'
            class='file-uploader' multiple
            :custom-request="(data) => onFileUpload(data, 'loading')">
    <a-button>
      <a-icon type='upload' />
      上传文件
    </a-button>
  </a-upload>
</template>
<script>
import { fileUpload } from '@/api/login'

export default {
  name: 'UploadFile',
  data() {
    return {
      loading: false,
      fileList: []
    }
  },
  methods: {
    onFileUpload({ file, name }, type) { // 文件上传
      if (this.fileList.length > 0) {
        this.$message.warning('至多上传一个文件，若上传多个请使用压缩包格式')
        return
      }
      this.loading = true

      const formData = new FormData()
      formData.append('file', file, name)
      formData.append('type', type)
      fileUpload(formData).then(resp => {
        const { code, data, message } = resp
        if (code !== 0) {
          this.$message.error(`上传失败.${message}`)
        }
        this.fileList = [{
          uid: '-1',
          name: data.filename,
          status: 'done',
          url: `http://0.0.0.0/api/file/download?filename=${data.filename}`
        }]
        // 将fileName传递给父组件
        this.$emit('getFileUrlFromChild', this.fileList[0].url)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
