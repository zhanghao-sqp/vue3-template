import { defineStore } from 'pinia'
import { store } from '../index'

interface KeepAliveState {
	/** 需要缓存的路由组件名称列表 */
	list: string[]
}

const useKeepAliveStore = defineStore('keep-alive', {
	state: (): KeepAliveState => ({
		list: []
	}),
	actions: {
		add(name: string | string[]) {
			if (typeof name === 'string') {
				!this.list.includes(name) && this.list.push(name)
			} else {
				name.map(v => {
					v && !this.list.includes(v) && this.list.push(v)
				})
			}
		},
		remove(name: string | string[]) {
			if (typeof name === 'string') {
				this.list = this.list.filter(v => v !== name)
			} else {
				this.list = this.list.filter(v => !name.includes(v))
			}
		},
		clear() {
			this.list = []
		}
	}
})
export default useKeepAliveStore

// 在组件setup函数外使用
export const useKeepAliveStoreWithOut = () => {
  return useKeepAliveStore(store);
}
