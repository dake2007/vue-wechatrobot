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
// 浏览器第一次打开项目页面会触发全局前置路由守卫函数
const router = new VueRouter({ routes })
const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    if (!store.state.userinfo) {
      store.dispatch('getUserInfoActions')
    }
    next()
  } else {
    if (whiteList.includes(to.path)) return next()

    next('/login')
  }
})
export default router
