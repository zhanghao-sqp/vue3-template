import { defineStore } from 'pinia'
import store from '../index'
import { getRoutes } from '@/http/api/user'

type RouteState = {
  routeList: unknown[]
  keepAliveList: string[]
  max: number
}

export const useRouteStore = defineStore('routes', {
  // 持久化
  persist: true,

	state: (): RouteState => ({
		routeList: [], // 路由列表
    keepAliveList: [], // 需要缓存的路由组件名称列表
    max: 10 // 最大缓存数量
	}),
	getters: {
		
	},
	actions: {
		// 获取路由
    async getRouteList() {
      try {
        const { data } = await getRoutes()
        this.routeList = data || []
      } catch (error) {
        throw(error)
      }
    },
    // 清除路由
    clearRouteList() {
      this.routeList = []
    },
    // 添加缓存路由
    addKeepAlive(name: string | string[]) {
      if (typeof name === 'string') {
        !this.keepAliveList.includes(name) && this.keepAliveList.push(name)
        if (this.keepAliveList.length > this.max) {
          this.keepAliveList.shift()
        }
      } else {
        name.map(v => {
          v && !this.keepAliveList.includes(v) && this.keepAliveList.push(v)
        })
        if (this.keepAliveList.length > this.max) {
          this.keepAliveList.splice(0, this.keepAliveList.length - this.max)
        }
      }
    },
    // 移除缓存路由
    removeKeepAlive(name: string | string[]) {
      if (typeof name === 'string') {
        this.keepAliveList = this.keepAliveList.filter(v => v !== name)
      } else {
        this.keepAliveList = this.keepAliveList.filter(v => !name.includes(v))
      }
    },
    // 清除缓存路由
    clearKeepAlive() {
      this.keepAliveList = []
    }
	}
})

// 在组件setup函数外使用
export const useRouteStoreWithOut = () => {
  return useRouteStore(store)
}
