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
import { useRouteStoreWithOut, useUserStoreWithOut } from '@/store'

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
// 白名单-静态路由
const staticList = routes.map(v => v.name)

const router = createRouter({
	history: createWebHashHistory(), // hash 路由模式
	// history: createWebHistory(), // history 路由模式
	routes // 路由规则
})

// 路由守卫
router.beforeEach(
	async (
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	) => {
		// 开启进度条
		npStart()

		// 白名单直接放行
		if (staticList.includes(to.name as string)) {
			next()
		}

		// 异步路由列表 用户token 放外面数据持久化失效
		const routeList = useRouteStoreWithOut().$state.routeList
		const userStore = useUserStoreWithOut()
		// 不存在该路由
		if (!isInRoutes(to.name as string, router.getRoutes() as RouteDate[])) {
			next({ name: '404' })
		}
		next()
	}
)

router.afterEach((to: RouteLocationNormalized) => {
	// 设置页面标题
	document.title = (to.meta.title as string) || 'vue3-vite-ts'
	npDone()
})
export default router
