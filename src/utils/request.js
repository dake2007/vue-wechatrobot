
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

const myAxios = axios.create({
  baseURL: 'http://127.0.0.1:3007',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Access-Control-Allow-Origin': '*'
  }
})
myAxios.interceptors.request.use((config) => {
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
myAxios.interceptors.response.use((response) => {
  // return到axios原地promise对象，作为成功的结果

  return response
}, (error) => {
  // return到axios原地promise对象的位置，作为失败拒绝的状态（如果那边用try—+catch捕获，可以捕获到我们传递过去的这个error变量的值）
  if (error.response.status === 401) {
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})
    router.push('/login')
    Message.error('用户身份已过期')
  }
  return Promise.reject(error)
})
export default myAxios
