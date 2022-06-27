import { defineStore } from 'pinia'

const useStore = defineStore('main', {
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

export default useStore
