import { createRouter, createWebHashHistory, createWebHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { npStart, npDone } from '@/utils/NProgress'

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@view/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@view/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), // hash 路由模式
  // history: createWebHistory(), // history 路由模式
  routes // 路由规则
})

router.beforeEach((to: RouteLocationNormalized) => {
  console.log(to)
  npStart()
})

router.afterEach((to: RouteLocationNormalized) => {
  console.log(to)
  npDone()
})
export default router