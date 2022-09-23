import store from '@/store'
import axios from 'axios'

const myAxios = axios.create({
  baseURL: 'http://127.0.0.1:3007',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
myAxios.interceptors.request.use((config) => {
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
export default myAxios
