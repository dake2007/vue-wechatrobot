import request from '@/utils/request'
import qs from 'qs'
let param = {
  username: 'ddddddd',
  password: 'kaokaokao'
}
param = qs.stringify(param)
export const registerAPI = () => {
  return request({
    url: 'api/register',
    method: 'post',
    data: param
  })
}
