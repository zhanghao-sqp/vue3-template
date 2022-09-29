import {
	createRouter,
	createWebHashHistory,
	RouteLocationNormalized,
	NavigationGuardNext,
	RouteRecordRaw
} from 'vue-router'
import { npStart, npDone } from '@/utils/NProgress'
import { isInRoutes } from '@/utils/router'
import type { Route, RouteDate } from '@/utils/router'
import { useRouteStoreWithOut, useCountStoreWithOut } from '@/store'
import { storeToRefs } from 'pinia'

// 静态路由
export const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'Login',
		meta: {
			title: '登录'
		},
		component: () => import('@view/login/index.vue')
	},
	{
		path: '/404',
		name: '404',
		meta: {
			title: '404'
		},
		component: () => import('@view/exception/404.vue')
	}
]
// 白名单
const whiteList = routes.map(v => v.name)

const router = createRouter({
	history: createWebHashHistory(), // hash 路由模式
	// history: createWebHistory(), // history 路由模式
	routes // 路由规则
})

// 异步路由列表
const routeStore = useRouteStoreWithOut()
const { routeList } = storeToRefs(routeStore)
// 用户token
const userStore = useCountStoreWithOut()
const { token } = storeToRefs(userStore)

// 路由守卫
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
	npStart()
	// // 白名单直接放行
	// if (whiteList.includes(to.name as string)) {
	// 	next()
	// }
	// // 不存在该路由
	// if (!isInRoutes((to.name as string), (router.getRoutes() as RouteDate[]))) {
	// 	next({ name: '404' })
	// }
	// next()
})

router.afterEach((to: RouteLocationNormalized) => {
	// 设置页面标题
	document.title = to.meta.title as string || 'vue3-vite-ts'
	npDone()
})
export default router
