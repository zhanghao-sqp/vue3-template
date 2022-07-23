import { defineStore } from 'pinia'

export default defineStore('main', {
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
