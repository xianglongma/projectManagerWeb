<template>
  <a-col>
    <a-card :bordered='false'>
      <div style='text-align: center; font-size: 24px;'>{{ article.title }}</div>
      <div style='text-align: center; font-size: 14px; margin-bottom: 40px;color: darkgray'>{{ article.description }}
      </div>
      <a-divider dashed />
      <p>{{ article.content }}</p>
    </a-card>
    <my-comment :resource-id='article.ID' resource-type='article'></my-comment>
  </a-col>
</template>

<script>
import MyComment from '@/views/comment/MyComment'

export default {
  name: 'ArticleDetail.vue',
  components: {
    MyComment
  },
  mounted() {
    this.article = this.$route.params.article
    localStorage.setItem('articleID', this.article.ID)
  },
  data() {
    return {
      article: {}
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>