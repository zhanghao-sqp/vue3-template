import { defineStore } from 'pinia'

export const useCountStore = defineStore('myCount', {
	state: () => ({
		count: 0
	}),
	getters: {
		doubleCount(state) {
			return state.count * 2
		}
	},
	// 持久化
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
