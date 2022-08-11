import { get, post } from '@/http/axios'

export const login = (params: any) => {
  return post('/login', params)
}

export const logout = () => {
  return post('/logout')
}

export const getUserList = (params: any) => {
  return get('/user/list', params)
}
