import { defineStore } from 'pinia'

export default defineStore('myCount', {
	state: () => ({
		count: 0
	}),
	getters: {
		doubleCount(state) {
			return state.count * 2
		}
	},
	// ζδΉε
  persist: {
    key: "myCount",
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log("load userStore data start");
    },
    afterRestore: (context) => {
      console.log("load userStore data end");
    },
  },
	actions: {
		increment() {
			this.count++
		}
	}
})
