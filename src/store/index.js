
import { getUserInfoAPI } from '@/api'
import Vue from 'vue'
import Vuex from 'vuex'
// vuex的持久化存储
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '', // 保存token字符串
    userinfo: {}
  },
  getters: {
    username: state => state.userinfo.username,
    nickname: state => state.userinfo.nickname,
    user_pic: state => state.userinfo.user_pic

  },
  mutations: {
    // 保存token
    updateToken (state, val) {
      state.token = val
    },
    updateUserInfo (state, val) {
      state.userinfo = val
    }
  },
  actions: {
    // 请求用户的信息
    async getUserInfoActions (store) {
      const res = await getUserInfoAPI()
      //  console.log(res)
      store.commit('updateUserInfo', res.data.data)
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState()
  ]
})
