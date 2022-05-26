import request from '@/utils/request'

const userApi = {
  Login: '/login',
  Logout: '/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/userinfo',
  UserMenu: '/navbar',
  FileUpload: '/file/upload',
  UserInfoList: '/user/list',
  UserInfoOrderList: '/user/order/list',
  UserUpdateInfo: '/user'
}

/**
 * login func
 * parameter: {
 *     nickname: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

/**
 * login func
 * parameter: {
 *     nickname: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function register (parameter) {
  return request({
    url: userApi.Register,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}

/**
 * 上传文件
 * @param parameter {*}
 */
export function fileUpload (parameter) {
  return request({
    url: userApi.FileUpload,
    method: 'post',
    data: parameter
  })
}

export function getUserList (params) {
  return request({
    url: userApi.UserInfoList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: params
  })
}

export function getUserOrderList (params) {
  return request({
    url: userApi.UserInfoOrderList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: params
  })
}

export function updateUserInfo (params) {
  return request({
    url: userApi.UserUpdateInfo,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: params
  })
}
