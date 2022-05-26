<template>
  <div class='page-header-index-wide page-header-wrapper-grid-content-main'>
    <a-row :gutter='24'>
      <a-col :md='24' :lg='7'>
        <a-card :bordered='false'>
          <div class='account-center-avatarHolder'>
            <div class='avatar'>
              <img :src='avatar'>
            </div>
            <div class='username'>{{ nickname }}</div>
            <div class='bio'>海纳百川，有容乃大</div>
          </div>
          <div class='account-center-detail'>
            <p>
              <i class='title'></i>交互专家
            </p>
            <p>
              <i class='group'></i>嘿嘿嘿
            </p>
            <p>
              <i class='address'></i>
              <span>浙江省</span>
              <span>杭州市</span>
            </p>
          </div>
          <a-divider />

          <div class='account-center-tags'>
            <div class='tagsTitle'>标签</div>
            <div>
              <template v-for='(tag, index) in tags'>
                <a-tooltip v-if='tag.length > 20' :key='tag' :title='tag'>
                  <a-tag
                    :key='tag'
                    :closable='index !== 0'
                    :close='() => handleTagClose(tag)'
                  >{{ `${tag.slice(0, 20)}...` }}
                  </a-tag>
                </a-tooltip>
                <a-tag
                  v-else
                  :key='tag'
                  :closable='index !== 0'
                  :close='() => handleTagClose(tag)'
                >{{ tag }}
                </a-tag>
              </template>
              <a-input
                v-if='tagInputVisible'
                ref='tagInput'
                type='text'
                size='small'
                :style="{ width: '78px' }"
                :value='tagInputValue'
                @change='handleInputChange'
                @blur='handleTagInputConfirm'
                @keyup.enter='handleTagInputConfirm'
              />
              <a-tag v-else @click='showTagInput' style='background: #fff; borderStyle: dashed;'>
                <a-icon type='plus' />
                New Tag
              </a-tag>
            </div>
          </div>
          <a-divider :dashed='true' />

          <div class='account-center-team'>
            <div class='teamTitle'>团队</div>
            <a-spin :spinning='teamSpinning'>
              <div class='members'>
                <a-row>
                  <a-col :span='12' v-for='(item, index) in teams' :key='index'>
                    <a>
                      <a-avatar size='small' :src='item.avatar' />
                      <span class='member'>{{ item.name }}</span>
                    </a>
                  </a-col>
                </a-row>
              </div>
            </a-spin>
          </div>
        </a-card>
      </a-col>
      <a-col :md='24' :lg='17'>
        <a-card
          style='width:100%'
          :bordered='false'
          :tabList='tabListNoTitle'
          :activeTabKey='noTitleKey'
          :title='projectTitle'
          @tabChange="key => handleTabChange(key, 'noTitleKey')"
        >
          <!--          <article-page v-if="noTitleKey === 'article'"></article-page>-->
          <!--          <app-page v-else-if="noTitleKey === 'app'"></app-page>-->
          <!--          <project-page if="noTitleKey === 'project'"></project-page>-->
          <a-list
            v-if="noTitleKey === 'project'"
            class='ant-pro-pages-list-applications-filterCardList'
            :data-source='projects'
            :grid='{ gutter: 24, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }'>
            <a-list-item slot='renderItem' slot-scope='item' style='margin-top: 20px;'
                         @click='goToProjectDetail(item.ID)'>
              <a-card hoverable style='width:300px;'>
                <img slot='cover' :src='item.icon' style='height: 240px' />
                <a-card-meta :title='item.title'>
                  <template slot='description'>
                    {{ item.description }}
                  </template>
                </a-card-meta>
                <template slot='actions'>
                  <a-tooltip title='收藏'>
                    <a-icon onclick='console.log("收藏")' type='heart' />
                    {{ item.stars }}
                  </a-tooltip>
                  <a-tooltip title='查看'>
                    <a-icon type='edit' />
                  </a-tooltip>
                  <a-tooltip title='分享'>
                    <a-icon type='share-alt' />
                  </a-tooltip>
                </template>
              </a-card>
            </a-list-item>
          </a-list>
          <a-list
            v-else-if='noTitleKey === "article"'
            size='large'
            rowKey='id'
            :loading='loading'
            itemLayout='vertical'
            :dataSource='articles'
          >
            <a-list-item :key='item.id' slot='renderItem' slot-scope='item'>
              <!--          <template slot='actions'>-->
              <!--            <icon-text type='star-o' :text='item.star' />-->
              <!--            <icon-text type='like-o' :text='item.like' />-->
              <!--            <icon-text type='message' :text='item.message' />-->
              <!--          </template>-->
              <a-list-item-meta>
                <a slot='title' @click='goToArticleDetail(item)'>{{ item.title }}</a>
                <template slot='description'>
              <span>
                <a-tag>文章</a-tag>
                <a-tag>aaa</a-tag>
                <a-tag>bb</a-tag>
              </span>
                </template>
              </a-list-item-meta>
              <article-list-content
                :description='item.description'
                :owner='item.nickname'
                :avatar='item.avatar'
                :updateAt='item.updatedAt' />
            </a-list-item>
            <div slot='footer' v-if='articles.length > 0' style='text-align: center; margin-top: 16px;'>
<!--              <a-button :loading='loadingMore'>加载更多</a-button>-->
            </div>
          </a-list>


        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { AppPage, ArticlePage, ProjectPage } from './page'

import { mapGetters } from 'vuex'
import { listProject } from '@/api/project'
import { listArticle } from '@/api/article'

export default {
  components: {
    RouteView,
    PageView,
    AppPage,
    ArticlePage,
    ProjectPage
  },
  data() {
    return {
      tags: ['杭电学生', '热爱编程'],
      projects: [],
      articles: [],
      tagInputVisible: false,
      tagInputValue: '',

      teams: [],
      teamSpinning: true,

      noTitleKey: 'project'
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar']),
    tabListNoTitle() {
      return [
        {
          key: 'project',
          tab: `项目（${this.projects.length}）`
        },
        {
        key: 'article',
        tab: `文章（${this.articles.length}）`
      }]
    }
  },
  mounted() {
    this.getTeams()
    this.updateProjects()
    this.updateArticles()
  },
  methods: {
    getTeams() {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
        this.teamSpinning = false
      })
    },
    updateArticles() {
      listArticle({ owner: this.nickname, type: this.type }).then(res => {
        if (res.code !== 0) {
          this.$message.error('获取项目列表错误')
        }
        this.articles = res.data
      })
    },
    goToArticleDetail(article) {
      console.log('article', article)
      this.$router.push({
        name: 'ArticleDetail',
        params: {
          article: article
        }
      })
    },
    updateProjects() {
      listProject({ owner: this.nickname, type: this.type }).then(res => {
        if (res.code !== 0) {
          this.$message.error('获取项目列表错误')
        }
        this.projects = res.data
      })
    },
    goToProjectDetail(id) {
      localStorage.setItem('projectID', id)
      this.$router.push({
        name: 'Success',
        params: {
          projectID: id
        }
      })
    },
    handleTabChange(key, type) {
      this[type] = key
    },

    handleTagClose(removeTag) {
      const tags = this.tags.filter(tag => tag !== removeTag)
      this.tags = tags
    },

    showTagInput() {
      this.tagInputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    },

    handleInputChange(e) {
      this.tagInputValue = e.target.value
    },

    handleTagInputConfirm() {
      const inputValue = this.tagInputValue
      let tags = this.tags
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }

      Object.assign(this, {
        tags,
        tagInputVisible: false,
        tagInputValue: ''
      })
    }
  }
}
</script>

<style lang='less' scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }

    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }

    .title {
      background-position: 0 0;
    }

    .group {
      background-position: 0 -22px;
    }

    .address {
      background-position: 0 -44px;
    }
  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;

        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }

        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>
