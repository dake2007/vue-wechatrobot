import request from '@/utils/request'
import qs from 'qs'

/**
 *
 * @param {*} param0 {username:用户名，password:密码}
 * @returns Promise对象
 */
export const registerAPI = ({ username, password }) => {
  let param = {
    username,
    password
  }
  param = qs.stringify(param)
  return request({
    url: 'api/register',
    method: 'post',
    data: param
  })
}
/**
 *
 * @param {*} username 用户名
 * @param {*} password 密码
 * @returns Promise对象
 */
export const loginAPI = ({ username, password }) => {
  let param = {
    username,
    password
  }

  param = qs.stringify(param)
  // console.log(param)
  return request({
    url: 'api/login',
    method: 'post',
    data: param
  })
}
/**
 *
 * @returns 用户信息
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'

  })
}
/**
 *
 * @param {id,nickname,email} 用户id 用户昵称 用户邮箱
 * @returns
 */
export const updateUserInfoAPI = ({ id, nickname, email }) => {
  let param = {
    id,
    nickname,
    email

  }
  param = qs.stringify(param)
  return request({
    url: '/my/userinfo',
    method: 'post',
    data: param
  })
}
/**
 *
 * @param {*} avatar 头像base64
 * @returns
 */
export const updateAvatarAPI = (avatar) => {
  let param = {
    avatar
  }
  param = qs.stringify(param)
  console.log(param)
  return request({
    url: '/my/updata/avatar',
    method: 'post',
    data: param

  })
}
export const resetPwdAPI = (obj) => {
  let param = {
    oldPwd: obj.old_pwd,
    newPwd: obj.new_pwd
  }
  param = qs.stringify(param)
  return request({
    url: '/my/updatepwd',
    method: 'post',
    data: param
  })
}
