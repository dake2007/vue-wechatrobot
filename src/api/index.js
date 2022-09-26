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
/**
 *
 * @param {*} obj 修改密码接口
 * @returns
 */
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
/**
 *
 * @returns 获取配置分类
 */
export const getArticleAPI = () => {
  return request({
    url: 'my/artcate/cates'

  })
}
/**
 *
 * @param {配置分类的名字，别名} obj 新增配置接口
 * @returns
 */
export const addArtCateAPI = (obj) => {
  let param = {
    name: obj.cate_name,
    alias: obj.cate_alias
  }
  param = qs.stringify(param)
  return request({
    url: '/my/artcate/addcates',
    method: 'post',
    data: param
  })
}
/**
 *
 * @param {修改文章分类} obj
 * @returns
 */
export const setArtCateAPI = (obj) => {
  let param = {
    Id: obj.Id,
    name: obj.cate_name,
    alias: obj.cate_alias
  }
  param = qs.stringify(param)
  return request({
    url: '/my/artcate/updatecate',
    method: 'post',
    data: param
  })
}
/**
 *
 * @param {删除文章分类} id
 * @returns
 */
export const deleteArtCateAPI = (id) => {
  return request({
    url: '/my/artcate/deletecate/' + id

  })
}
export const uploadArticleAPI = (fd) => {
  return request({
    url: '/my/article/add',
    method: 'post',
    data: fd
  })
}
