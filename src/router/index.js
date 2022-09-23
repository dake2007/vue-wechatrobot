import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout')
  },
  {
    path: '/register',
    component: () => import('@/views/register')
    // webpack提供的improt函数来路由懒加载导入组件
    // 懒加载是当路径切换到reg页面才加载组件对应代码
    // 好处就是让首页加载的体积更小，加载更快
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({ routes })
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token && !store.state.userinfo) {
    store.dispatch('getUserInfoActions')
  }

  next()
})
export default router
