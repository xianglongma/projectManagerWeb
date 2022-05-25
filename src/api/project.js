import request from '@/utils/request'

const projectApi = {
  ProjectCreate: 'project',
  ProjectRetrieve: 'project',
  ProjectHistoryModify: 'project/history/update'
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
 * 获取项目
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
 * 获取项目
 * */
export function modifyHistory(params) {
  return request({
    url: projectApi.ProjectHistoryModify,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data:params,
  })
}
