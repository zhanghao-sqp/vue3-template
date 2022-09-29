import {
	createRouter,
	createWebHashHistory,
	RouteLocationNormalized,
	RouteRecordRaw
} from 'vue-router'
import { npStart, npDone } from '@/utils/NProgress'
import { isInRoutes } from '@/utils/router'
import type { Route, RouteDate } from '@/utils/router'
import { useRouteStoreWithOut } from '@/store'
import { storeToRefs } from 'pinia'

// 静态路由
export const routes: RouteRecordRaw[] = [
	// {
	// 	path: '/',
	// 	name: 'index',
	// 	meta: {
	// 		title: '首页'
	// 	},
	// 	component: () => import('@components/layout/index.vue'),
	// 	redirect: '/home',
	// 	children: [
	// 		{
	// 			path: 'home',
	// 			name: 'home',
	// 			meta: {
	// 				title: 'home'
	// 			},
	// 			component: () => import('@view/home/index.vue'),
	// 		},
	// 		// {
	// 		// 	path: 'three',
	// 		// 	name: 'three',
	// 		// 	meta: {
	// 		// 		title: 'three'
	// 		// 	},
	// 		// 	component: () => import('@view/studyThree/index.vue')
	// 		// }
	// 	]
	// },
	{
		path: '/login',
		name: 'login',
		meta: {
			title: '登录'
		},
		component: () => import('@view/login/index.vue')
	},
	{
		path: '/404',
		name: '页面未找到',
		meta: {
			title: '404'
		},
		component: () => import('@view/exception/404.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory('/hash/a'), // hash 路由模式
	// history: createWebHistory(), // history 路由模式
	routes // 路由规则
})

// 异步路由
const routeStore = useRouteStoreWithOut()
const { routeList } = storeToRefs(routeStore)

// 路由守卫
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
	npStart()
	// 如果没有动态路由，就去获取路由
	if (!routeList.value.length) {
		try {
			await routeStore.getRouteList()
		} catch (error) {
			console.log(error)
		}
	}
	if (!isInRoutes((to as Route), (router.getRoutes() as RouteDate[]))) {
		router.replace('/404')
	}
})

router.afterEach((to: RouteLocationNormalized) => {
	document.title = to.meta.title as string || 'vue3-vite-ts'
	npDone()
})
export default router
