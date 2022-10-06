import {
	createRouter,
	createWebHashHistory,
	RouteLocationNormalized,
	NavigationGuardNext,
	RouteRecordRaw
} from 'vue-router'
import { npStart, npDone } from '@/utils/NProgress'
import { isInRoutes, generateRoutes } from '@/utils/router'
import type { Route, RouteDate } from '@/utils/router'
import { useRouteStoreWithOut, useUserStoreWithOut } from '@/store'

// 静态路由
const routes: RouteRecordRaw[] = [
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

// 生成路由
const generateRoutesFn = (routeList: RouteDate) => {
	const list = generateRoutes(routeList)
	list.forEach(route => {
		router.addRoute(route)
	})
	router.options.routes = [...routes, ...list]
}

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
			return next()
		}

		// 异步路由列表 用户token 放外面数据持久化失效
		let routeList = useRouteStoreWithOut().$state.routeList
		const token = useUserStoreWithOut().$state.token

		// 没有动态路由，获取动态路由
		if (!routeList.length) {
			try {
				await useRouteStoreWithOut().getRouteList()
				routeList = useRouteStoreWithOut().$state.routeList
				generateRoutesFn(routeList as RouteDate)
				if (isInRoutes(to as Route, routeList as RouteDate)) {
					return next({ ...to, replace: true })
				}
			} catch (error) {
				console.log(error)
			}
		}
		// 页面刷新
		if (routeList.length && router.getRoutes().length === staticList.length) {
			// 重新添加路由
			generateRoutesFn(routeList as RouteDate)
			return next({ ...to, replace: true })
		}

		// 不存在该路由
		if (!isInRoutes(to as Route, router.getRoutes() as RouteDate)) {
			return next({ name: '404' })
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
