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

// post请求url中带有参数
export const paramsPost = (params: any) => {
  return post('/user/list', params, { params })
}

export const getRoutes = () => {
  return get('/asyncRoutes.json', null, { baseURL: '' })
}