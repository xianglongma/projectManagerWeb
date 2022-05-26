<template>
  <div class='account-settings-info-view'>
    <a-row :gutter='16' type='flex' justify='center'>
      <a-col :order='isMobile ? 2 : 1' :md='24' :lg='16'>

        <a-form layout='vertical'>
          <a-form-item
            :label="$t('account.settings.basic.nickname')"
          >
            <a-input v-model='user.nickname' :placeholder="$t('account.settings.basic.nickname-message')" />
          </a-form-item>
          <a-form-item
            :label="$t('account.settings.basic.profile')"
          >
            <a-textarea v-model='user.description' rows='4'
                        :placeholder="$t('account.settings.basic.profile-message')" />
          </a-form-item>

          <a-form-item
            :label="$t('account.settings.basic.email')"
            :required='false'
          >
            <a-input v-model='user.email' placeholder='name@example.com' />
          </a-form-item>
          <a-form-item
            :label="$t('account.settings.basic.phone')"
            :required='false'
          >
            <a-input v-model='user.mobile' placeholder='请输入手机号' />
          </a-form-item>

          <a-form-item>
            <a-button type='primary' @click='onHandleSubmit'>{{ $t('account.settings.basic.update') }}</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :order='1' :md='24' :lg='8' :style="{ minHeight: '180px' }">
        <UploadIcon @getFileImageFromChild='setavatar' style='margin-left: 100px'></UploadIcon>
      </a-col>

    </a-row>
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { baseMixin } from '@/store/app-mixin'
import UploadIcon from '@/views/upload/UploadIcon'
import { updateUserInfo } from '@/api/login'

export default {
  mixins: [baseMixin],
  components: {
    AvatarModal,
    UploadIcon
  },
  data() {
    return {
      // cropper
      preview: {},
      user: {
        nickname: '',
        description: '',
        avatar: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    setavatar(url) {
      this.user.avatar = url
    },
    onHandleSubmit() {
      updateUserInfo(this.user).then(res => {
        if (res.code !== 0) {
          this.$message.error(`更新失败，原因：${res.message}`)
          return
        }
        this.$message.info(`更新成功`)
      })
    }
  }
}
</script>

<style lang='less' scoped>

.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img, .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
