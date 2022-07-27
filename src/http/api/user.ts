import { get, post, paramsPost } from '@/http/axios'

export const login = (params: any) => {
  return paramsPost('/login', params)
}

export const logout = () => {
  return post('/logout')
}

export const getUserList = (params: any) => {
  return get('/user/list', params)
}
