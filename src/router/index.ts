import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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
  // history: createWebHashHistory(), // hash 路由模式
  history: createWebHistory(), // history 路由模式
  routes // 路由规则
})

export default router