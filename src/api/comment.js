import request from '@/utils/request'

const commentApi = {
  CommentCreate: 'comment',
  CommentList: 'comment/list'
}

/****
 * 创建评论
 * */
export function createComment (params) {
  return request({
    url: commentApi.CommentCreate,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: params
  })
}

/****
 * 修改项目项目记录
 * */
export function listComment (params) {
  return request({
    url: commentApi.CommentList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: params
  })
}
