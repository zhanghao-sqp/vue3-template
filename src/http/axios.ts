import axios from 'axios'
import {
	AxiosResponse,
	AxiosRequestConfig,
	AxiosError,
	AxiosInstance
} from 'axios'
import { useMessage } from '@/utils/useActions'
import type { Type } from '@/utils/useActions'

const instance: AxiosInstance = axios.create({
	baseURL: 'api',
	timeout: 20000,
	headers: {
		'Content-Type': 'application/json'
	}
})

// 请求拦截器
instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
		console.log('请求拦截器', config)
		return config
	},
	(error: AxiosError) => {
		// Do something with request error
		return Promise.reject(error)
	}
)

// 响应拦截器
instance.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.status === 200) {
			if (response.data.code !== 200) {
				const code = response.data.code
				let type: Type = 'error'
				// 2,3开头的code为警告提示
				if (new RegExp(/^[23]\d{2}/).test(code)) type = 'warning'
				useMessage(type, response.data.msg)
			}
			return response.data
		} else {
			const message = response.data.msg || '请求失败'
			useMessage('error', message)
			return Promise.reject(response)
		}
	},
	(error: AxiosError) => {
		// Do something with response error
		return Promise.reject(error)
	}
)

export const get = (
	url: string,
	params?: any,
	config?: AxiosRequestConfig
) => {
	return instance.get(url, { params, ...config })
}

export const post = (
	url: string,
	data?: any,
	config?: AxiosRequestConfig
) => {
	return instance.post(url, data, config)
}

// post请求url中带有参数
// export const paramsPost = (
// 	url: string,
// 	data?: any,
// 	...config: AxiosRequestConfig[]
// ) => {
// 	let paramStr = ''
// 	for (let key in data) {
// 		if (data.hasOwnProperty(key)) {
// 			paramStr += `&${key}=${encodeURIComponent(data[key])}`
// 		}
// 	}
// 	paramStr.length > 1 && (paramStr = paramStr.substring(1))
// 	paramStr.length > 1 && (url += `?${paramStr}`)
// 	return instance.post(url, data, ...config)
// }
