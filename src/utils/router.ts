import { cloneDeep } from 'lodash-es'
export type RouteDate = Array<{
	name: string
	title?: string
	path: string
	component?: any
	meta: any
	redirect?: string
	alwaysShow?: boolean
	sort?: number
	hidden?: boolean
	children?: RouteDate
}>
export interface Route {
	path: string
	name: string
}
type GenerateRoutes = (routes: RouteDate) => any[]
type IsInRoutes = (route: Route, routes: RouteDate) => boolean

// 生成路由
const comp = import.meta.glob(`@/**/*.vue`)
// console.log(comp)
export const generateRoutes: GenerateRoutes = (routes) => {
	const list = cloneDeep(routes)
	return list.map(route => {
		if (route.component as string) {
			// route.component = () => import(/* @vite-ignore */ `@/${route.component}`)
			route.component = comp[`../${route.component}`]
		}
		if (route.children && route.children.length) {
			route.children = generateRoutes(route.children)
		}
		return route
	})
}

// 判断是否在路由列表中
export const isInRoutes: IsInRoutes = (current, routes) => {
	let flag = false
  for (const route of routes) {
		if (route.name === current.name || route.path === current.path) {
      return (flag = true)
		}
    if (route.children && route.children.length) {
      flag = isInRoutes(current, route.children)
    }
	}
	return flag
}
