import request from '@/utils/request'

const projectApi = {
  ProjectCreate: 'project',
  ProjectRetrieve: 'project',
  ProjectList: 'project/list',
  ProjectHistoryModify: 'history',
  HistoryList: 'history/list'
}

/****
 * 创建项目
 * */
export function createProject(data) {
  return request({
    url: projectApi.ProjectCreate,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: data
  })
}

/****
 * 根据id获取项目
 * */
export function retrieveProject(id) {
  return request({
    url: projectApi.ProjectRetrieve + '/' + id,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/****
 * 获取项目列表
 * */
export function listProject(params) {
  return request({
    url: projectApi.ProjectList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: params
  })
}

/****
 * 修改项目项目记录
 * */
export function modifyHistory(params) {
  return request({
    url: projectApi.ProjectHistoryModify,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: params
  })
}


/****
 * 获取项目记录
 * */
export function listHistory(params) {
  return request({
    url: projectApi.HistoryList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: params
  })
}
