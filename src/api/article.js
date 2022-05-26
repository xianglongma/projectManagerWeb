import request from '@/utils/request'

const articleApi = {
  ArticleCreate: 'article',
  ArticleList: 'article/list'
}

export function createArticle(params) {
  return request({
    url: articleApi.ArticleCreate,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: params
  })
}

export function listArticle(params) {
  return request({
    url: articleApi.ArticleList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: params
  })
}