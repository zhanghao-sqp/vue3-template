import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
	// 持久化
  persist: true,
	state: () => ({
		count: 0
	}),
	getters: {
		doubleCount(state) {
			return state.count * 2
		}
	},
	actions: {
		increment() {
			this.count++
		}
	}
})
