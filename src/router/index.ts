import {
	createRouter,
	createWebHashHistory,
	RouteLocationNormalized,
	RouteRecordRaw
} from 'vue-router'
import { npStart, npDone } from '@/utils/NProgress'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'index',
		meta: {
			title: '首页'
		},
		component: () => import('@components/layout/index.vue'),
		redirect: '/home',
		children: [
			{
				path: 'home',
				name: 'home',
				meta: {
					title: 'home'
				},
				component: () => import('@view/home/index.vue'),
			},
			{
				path: 'login',
				name: 'login',
				meta: {
					title: 'login'
				},
				component: () => import('@view/login/index.vue')
			},
			{
				path: 'three',
				name: 'three',
				meta: {
					title: 'three'
				},
				component: () => import('@view/studyThree/index.vue')
			}
		]
	}
]

const router = createRouter({
	history: createWebHashHistory(), // hash 路由模式
	// history: createWebHistory(), // history 路由模式
	routes // 路由规则
})

router.beforeEach((to: RouteLocationNormalized) => {
	npStart()
})

router.afterEach((to: RouteLocationNormalized) => {
  npDone()
})
export default router
