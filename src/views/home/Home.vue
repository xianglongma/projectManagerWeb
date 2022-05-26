<template>
  <div>
    <a-row type='flex' justify='space-between' align='top'>
      <a-col :span='18'>
        <a-card title='推荐' :head-style='{fontSize:"20px",height:"70px"}'>
          <div slot='extra'>
            <a-button type='link' @click='goToProjectMore'>
              <svg
                t='1652978630224'
                class='icon'
                viewBox='0 0 1024 1024'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                p-id='3017'
                width='1em'
                height='1em'>
                <path
                  d='M910.496 213.536C804.16 82.208 611.488 61.952 480.128 168.32l-100.768 81.6 50.336 62.176 100.768-81.6a225.984 225.984 0 1 1 284.448 351.264l-107.968 87.424 50.336 62.176 107.968-87.424a305.984 305.984 0 0 0 45.248-430.4zM516.352 823.552a225.984 225.984 0 1 1-284.448-351.264l110.976-89.856-50.336-62.176-110.976 89.856C50.24 516.448 29.984 709.152 136.32 840.48c106.336 131.328 299.04 151.584 430.368 45.248l105.12-85.12-50.336-62.176-105.12 85.12z'
                  p-id='3018'
                  fill='#1296db'></path>
                <path d='M676.16 353.28l51.232 61.44-343.552 286.304-51.2-61.44z' p-id='3019' fill='#1296db'></path>
              </svg>
              更多
            </a-button>
            <a-radio-group v-model='type'>
              <a-radio-button value='time'>最新</a-radio-button>
              <a-radio-button value='star'>收藏</a-radio-button>
              <a-radio-button value='score'>积分</a-radio-button>
            </a-radio-group>
          </div>
        </a-card>
        <ProjectList :projects='projects'></ProjectList>
      </a-col>
      <a-col :span='6' style='align-items: flex-end; background: rgb(240, 242, 245)'>
        <a-card title='排行榜'>
<!--          <a slot='extra' @click='goToProjectMore'>更多</a>-->
          <a-card size='small' :bordered='false' v-for='(user, index) in users' :key='index'>
            <a-card-meta :title='user.nickname'>
              <template slot='avatar'>
                <a-avatar :src='user.avatar' />
              </template>
            </a-card-meta>
            积分:{{user.score}}
          </a-card>
        </a-card>
      </a-col>

    </a-row>
  </div>
</template>

<script>
import { listProject } from '@/api/project'
import ProjectList from '@/views/home/ProjectList'
import { getUserOrderList } from '@/api/login'
export default {
  name: 'Home',
  components: {
    ProjectList
  },
  data() {
    return {
      type: '',
      projects: [],
      users:[]
    }
  },
  created() {
    this.updateProjects()
    this.updateUsers()
  },
  methods: {
    updateProjects() {
      listProject({ type: this.type }).then(res => {
        if (res.code !== 0) {
          this.$message.error('获取项目列表错误')
        }
        this.projects = res.data
      })
    },
    updateUsers() {
      getUserOrderList().then(res=>{
        if (res.code !== 0) {
          this.$message.error('获取用户列表错误')
        }
        this.users = res.data
      })
    },
    goToProjectMore(e) {
      e.preventDefault()
      this.$router.push({ path: '/ManagerProjects' })
    },
  }
}
</script>

<style scoped>

</style>
