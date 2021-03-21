import VueRouter from "vue-router"
import Home from '@/components/views/Home'
import Trade from '@/components/views/Trade'

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      needLogin: false
    }
  },
  {
    path: '/trade/:id',
    name: 'trade',
    component: Trade,
    meta: {
      needLogin: false
    }
  }
]

// mode如果不配置为history,会默认使用hash方式打开，#！开头
var router = new VueRouter({
  routes,
  mode: 'hash'
})
export default router
