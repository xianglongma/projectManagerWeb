<template>
  <a-result
    :isSuccess="true"
    :content="false"
    :title="email"
    :sub-title="description">

    <template #extra>
<!--      <a-button size="large" type="primary">查看邮箱</a-button>-->
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">前往首页</a-button>
    </template>

  </a-result>
</template>

<script>
export default {
  name: 'RegisterResult',
  data () {
    return {
      description: '欢迎在 sigma 开源项目管理平台，眼光真不错！',
      form: {}
    }
  },
  computed: {
    email () {
      const v = this.form && this.form.nickname || 'xxx'
      return `你的账户：${v} 注册成功`
    }
  },
  created () {
    this.form = this.$route.params
  },
  methods: {
    goHomeHandle () {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>

</style>
