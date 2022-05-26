<template>
  <div>
    <a-card title='文章列表' :head-style='{fontSize:"20px",height:"70px"}'>
      <div slot='extra'>
        <CreateArticle @syncArticle='syncArticle'></CreateArticle>
      </div>
    </a-card>
    <a-card style='margin-top: 24px;' :bordered='false'>
      <a-list
        size='large'
        rowKey='id'
        :loading='loading'
        itemLayout='vertical'
        :dataSource='data'
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
        <div slot='footer' v-if='data.length > 0' style='text-align: center; margin-top: 16px;'>
          <a-button :loading='loadingMore'>加载更多</a-button>
        </div>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { TagSelect, StandardFormRow, ArticleListContent } from '@/components'
import IconText from './components/IconText'
import { listArticle } from '@/api/article'
import CreateArticle from '@/views/list/search/CreateArticle'

export default {
  components: {
    TagSelect,
    StandardFormRow,
    ArticleListContent,
    IconText,
    CreateArticle
  },
  data() {
    return {
      loading: true,
      loadingMore: false,
      data: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    getList() {
      listArticle().then(res => {
        console.log('res', res)
        this.data = res.data
        this.loading = false
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
    syncArticle() {
      this.getList()
    }
    // loadMore () {
    //   this.loadingMore = true
    //   this.$http.get('/list/article').then(res => {
    //     this.data = this.data.concat(res.result)
    //   }).finally(() => {
    //     this.loadingMore = false
    //   })
    // },
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

.list-articles-trigger {
  margin-left: 12px;
}
</style>
