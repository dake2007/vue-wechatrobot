import request from '@/utils/request'
import qs from 'qs'

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
