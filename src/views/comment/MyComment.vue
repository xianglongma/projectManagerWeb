<template>
  <div>
    <a-list
      v-if='comments.length'
      :data-source='comments'
      :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
      item-layout='horizontal'
    >
      <a-list-item v-for='item in comments'>
        <a-comment
          :author='item.nickname'
          :avatar='item.avatar'
          :content='item.content'
          :datetime='item.comment_time'
        />
      </a-list-item>
    </a-list>
    <a-comment>
      <a-avatar
        slot='avatar'
        :src='avatar'
        :alt='nickname'
      />
      <div slot='content'>
        <a-form-item>
          <a-textarea :rows='4' :value='value' @change='handleChange' />
        </a-form-item>
        <a-form-item>
          <a-button html-type='submit' :loading='submitting' type='primary' @click='handleSubmit'>
            添加评论
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
  </div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { createComment, listComment } from '@/api/comment'

export default {
  props: ['resourceId', 'resourceType'],
  data() {
    return {
      comments: [],
      submitting: false,
      value: '',
      moment
    }
  },
  created() {
    this.updateComments()
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  methods: {
    updateComments() {
      if (this.resourceId === undefined || this.resourceId === 0 || this.resourceId === '') {
        if (this.resourceType === 'project') {
          this.resourceId = localStorage.getItem('projectID')
        } else if (this.resourceType === 'article') {
          this.resourceId = localStorage.getItem('articleID')
        }
      }
      const params = {
        resource_id: Number(this.resourceId),
        resource_type: this.resourceType
      }
      listComment(params).then(res => {
        if (res.code !== 0) {
          this.$message.error(res.message)
          return
        }
        this.comments = res.data
        this.comments.forEach(c => {
          c.comment_time = moment(c.comment_time.slice(0, 19), 'YYYY-MM-DD hh:mm:ss').fromNow()
        })
        this.submitting = false
      })
    },
    handleSubmit() {
      if (!this.value) {
        return
      }
      if (!this.resourceId || this.resourceId === '') {
        this.resourceId = localStorage.getItem('projectID')
      }
      this.submitting = true
      createComment({
        content: this.value,
        resource_id: Number(this.resourceId),
        resource_type: this.resourceType
      }).then((res) => {
        if (res.code !== 0) {
          this.$message.error(res.message)
          return
        }
        this.$message.info('评论成功')
        this.updateComments()
      })
      this.value = ''
      // setTimeout(() => {
      //   this.submitting = false
      //   this.comments = [
      //     {
      //       author: 'Han Solo',
      //       avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      //       content: this.value,
      //       datetime: moment().fromNow()
      //     },
      //     ...this.comments
      //   ]
      //   this.value = ''
      // }, 1000)
    },
    handleChange(e) {
      this.value = e.target.value
    }
  }
}
</script>
