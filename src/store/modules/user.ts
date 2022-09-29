import { defineStore } from 'pinia'
import store from '../index'

export const useUserStore = defineStore('user', {
  persist: true,
  state: () => ({
    token: '',
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
  }
})

export const useCountStoreWithOut = () => {
  return useUserStore(store)
}