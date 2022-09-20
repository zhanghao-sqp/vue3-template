export interface RouteDate {
	name: string
	title?: string
	path: string
	component?: any
	meta: any
	redirect?: string
	alwaysShow?: boolean
	sort?: number
	hidden?: boolean
	children?: RouteDate[]
}
export interface Route {
	path: string
	name: string
}
type GenerateRoutes = (routes: RouteDate[]) => any[]
type IsInRoutes = (route: Route, routes: RouteDate[]) => boolean

// 生成路由
export const generateRoutes: GenerateRoutes = (routes) => {
	return routes.map(route => {
		if (route.component) {
			route.component = () => import(/* @vite-ignore */ `@/views${route.component}`)
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
		if (route.path === current.path || route.name === current.name)
      return (flag = true)
    if (route.children && route.children.length) {
      flag = isInRoutes(current, route.children)
    }
	}
	return flag
}
