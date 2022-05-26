<template>
  <a-list
    class='ant-pro-pages-list-applications-filterCardList'
    :data-source='projects'
    :grid='{ gutter: 24, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }'>
    <a-list-item slot='renderItem' slot-scope='item' style='margin-top: 20px;' @click='goToProjectDetail(item.ID)'>
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

</template>
<script>
export default {
  name: 'ProjectList',
  props: ['projects'],
  methods: {
    goToProjectDetail(id) {
      localStorage.setItem('projectID', id)
      this.$router.push({
        name: 'Success',
        params: {
          projectID: id
        }
      })
    }
  }
}
</script>
