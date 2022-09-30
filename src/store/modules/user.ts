import { defineStore } from 'pinia'
import store from '../index'

export const useUserStore = defineStore('user', {
  persist: {
    key: 'user',
    storage: window.localStorage
  },
  state: () => ({
    token: '123456',
  }),
  getters: {
    
  },
  actions: {
    // 登录
    // async login(params: any) {
    //   try {
    //     const { data } = await login(params)
    //     this.token = data
    //   } catch (error) {
    //     throw(error)
    //   }
    // },
    // // 退出登录
    // async logout() {
    //   try {
    //     await logout()
    //     this.token = ''
    //   } catch (error) {
    //     throw(error)
    //   }
    // }
    test() {
      this.token = 'test'
    }
  }
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}