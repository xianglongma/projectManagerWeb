<template>
  <div>
    <a-button type='' @click='showDrawer'>历史记录</a-button>
    <a-drawer
      title='项目修改记录'
      :width='600'
      :visible='visible'
      :body-style="{ paddingBottom: '0px' }"
      @close='onClose'
    >
      <a-row>
        <a-col :span='3'>
        </a-col>
        <a-col :span='21'>
          <a-timeline>
            <a-timeline-item :key='index' v-for='(item, index) in history' color='green'>
              <p>{{ item.CreatedAt.slice(0, 10) }}
              {{ item.modify_user_name }}
              {{ item.description }}</p>
              <p>项目节点为： {{item.process_node}}</p>
              <p>当前链接为：<a :href='item.file_url'>项目文件</a></p>
            </a-timeline-item>
          </a-timeline>
        </a-col>
      </a-row>
    </a-drawer>
  </div>

</template>
<script>
import { listHistory } from '@/api/project'
import { Timeline } from 'ant-design-vue'

export default {
  components: {
    [Timeline.Item.name]: Timeline.Item
  },
  props: ['project'],
  data() {
    return {
      visible: false,
      history: []
    }
  },

  methods: {
    showDrawer() {
      listHistory({ 'project_id': this.project.ID }).then(res => {
          this.history = res.data
        }
      )
      this.visible = true
    },
    onClose() {
      this.visible = false
    }
  }
}
</script>
