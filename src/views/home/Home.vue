<template>
  <div>
    <a-row type='flex' justify='space-between' align='top'>
      <a-col :span='17'>
        <a-card title='推荐' :head-style='{fontSize:"20px",height:"70px"}'>
          <div slot='extra'>
            <a-button type='link'>
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
            <a-radio-group v-model='status'>
              <a-radio-button value='all'>全部</a-radio-button>
              <a-radio-button value='processing'>进行中</a-radio-button>
              <a-radio-button value='waiting'>等待中</a-radio-button>
            </a-radio-group>
          </div>
        </a-card>
        <a-list
          :data-source='items'
          :grid='{ gutter: 16, column: 3}'>
          <a-list-item slot='renderItem' slot-scope='item'>
            <a-card style='width: 300px'>
              <a-card-meta :title='item.title'>
                <template slot='avatar'>
                  <a-avatar :src='url' />
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
              <p>{{ item.description }}</p>
            </a-card>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :span='6' style='align-items: flex-end; background: rgb(240, 242, 245)'>
        <a-card title='排行榜'>
          <a href='www.baidu.com' slot='extra'>更多</a>
          <a-card size='small' :bordered='false'>
            <a-card-meta :title='title'>
              <template slot='avatar'>
                <a-avatar :src='url' />
              </template>
            </a-card-meta>
            积分:20
          </a-card>
          <a-card size='small' :bordered='false'>
            <a-card-meta :title='title'>
              <template slot='avatar'>
                <a-avatar :src='url' />
              </template>
            </a-card-meta>
            积分:20
          </a-card>
          <a-card size='small' :bordered='false'>
            <a-card-meta :title='title'>
              <template slot='avatar'>
                <a-avatar :src='url' />
              </template>
            </a-card-meta>
            积分:20
          </a-card>
        </a-card>
      </a-col>

    </a-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      status: 0,
      url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      title: 'title',
      items: [
        {
          stars: 1,
          url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: 'title',
          description: '这是 1 哥米哦啊书'
        },
        {
          stars: 2,
          url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: 'title',
          description: '这是 2 哥米哦啊书'
        },
        {
          stars: 3,
          url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: '4',
          description: '这是 3 哥米哦啊书'
        },
        {
          stars: 4,
          url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          title: '5',
          description: '这是 4 哥米哦啊书'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
