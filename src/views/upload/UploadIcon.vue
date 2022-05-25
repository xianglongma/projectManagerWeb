<template>
  <a-upload name='file' :show-upload-list='false' listType='picture-card'
            class='file-uploader'
            :custom-request="(data) => onFileUpload(data, 'loading')">
    <img v-if='fileList.length !== 0' :src='fileList[0].url' style='height: 128px;width: 128px'  />
    <div v-else style='height: 128px;width: 128px'>
      <a-icon :type="loading ? 'loading' : 'plus'"  style='margin-top: 32px'/>
      <div class='ant-upload-text'>上传图标</div>
    </div>
  </a-upload>
</template>
<script>
import { fileUpload } from '@/api/login'

export default {
  name: 'UploadIcon',
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
        console.log(resp.data)
        if (code !== 0) {
          this.$message.error(`上传失败.${message}`)
        }
        this.fileList = [{
          uid: '-1',
          name: data.filename,
          status: 'done',
          url: `http://0.0.0.0/api/image/download?filename=${data.filename}`
        }]
        // 将fileName传递给父组件
        console.log(this.fileList[0].url)
        this.$emit('getFileImageFromChild', this.fileList[0].url)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>