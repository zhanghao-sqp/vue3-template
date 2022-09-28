


export default class Request {
	private async getValue<T>(
		method: 'POST' | 'GET',
		fetchPath: string,
		data: T,
		loading: boolean
	): Promise<any> {
		if (loading) {
			// 自定义全局Loading的产生方式，在项目开发中建议在全局写一个工具类 例如 xxxx.showLoading()
		}
		// 如果是get请求，请将数据封装拼接在url的后面 post请求请放入参数中的body
		return fetch(`${import.meta.env.VITE_BASE_URL}${fetchPath}`, {
			method,
			headers: {
				// 自定义头部信息
				accept: '*',
				'content-type': 'application/json'
			},
			// post数据参照之下的写法
			body: data && JSON.stringify(data)
		})
			.then(async res => {
				const data = await res.json()
				switch (data.code) {
					// case insideStatus.success:  // 200
					//     return data;
					// case insideStatus.error: // 500
					//     return Promise.reject(data.msg);
					// case insideStatus.noLogin: // 401
					//     this.utils.toLogin();
					//     return Promise.reject(data.msg);
					// default:
					//     return Promise.reject(data.msg);
					default:
						return data //示例数据，请自行剔除
				}
			})
			.catch(err => {
				const tempErr = err.toString()
				return Promise.reject(tempErr)
			})
			.finally(() => {
				if (loading) {
					// 自定义全局Loading的关闭方式，在项目开发中建议在全局写一个工具类 例如 xxxx.hideLoading()
				}
			})
	}

	public async post<T, S>(fetchPath: string, data: T): Promise<S | string> {
		return this.getValue('POST', fetchPath, data, true)
			.then(res => Promise.resolve(res))
			.catch(err => Promise.reject(err))
	}

	public async postNoLoading<T, S>(
		fetchPath: string,
		data: T
	): Promise<S | string> {
		return this.getValue('POST', fetchPath, data, false)
			.then(res => Promise.resolve(res))
			.catch(err => Promise.reject(err))
	}

	public async get<T, S>(fetchPath: string, data: T): Promise<S | string> {
		return this.getValue('GET', fetchPath, data, true)
			.then(res => Promise.resolve(res))
			.catch(err => Promise.reject(err))
	}

	public async getNoLoading<T, S>(
		fetchPath: string,
		data: T
	): Promise<S | string> {
		return this.getValue('GET', fetchPath, data, false)
			.then(res => Promise.resolve(res))
			.catch(err => Promise.reject(err))
	}
}


// 自定义拦截器类
// class InterceptorManager {
//   private handlers: any[]
//   constructor() {
//     // 保存拦截器
//     this.handlers = []
//   }
//   use(fulfilled, rejected) {
//     this.handlers.push([fulfilled, rejected])
//   }
//   get() {
//     return this.handlers
//   }
// }
// const fetchPlus = (url, config) => {
//   const requestInterceptors = fetchPlus.requestInterceptors.get()
//   const responseInterceptors = fetchPlus.responseInterceptors.get()
//   const dispatchRequest = config => fetch(url, config)
//   const chain = [
//     ...requestInterceptors,
//     [dispatchRequest, undefined],
//     ...responseInterceptors
//   ]
//   let promise = Promise.resolve(config)

//   while (chain.length) {
//     const [fulfilled, rejected] = chain.shift()

//     promise = promise.then(fulfilled, rejected)
//   }

//   return promise
// }
// // 设置请求拦截器
// fetchPlus.requestInterceptors = new InterceptorManager()
// // 设置响应拦截器
// fetchPlus.responseInterceptors = new InterceptorManager()
// // 配置请求拦截器
// fetchPlus.requestInterceptors.use(config => {
//   // console.log('request interceptor')
//   // console.log(config)
//   return config
// }, err => {})
// // 配置响应拦截器
// fetchPlus.responseInterceptors.use(async res => {
//   // console.log('response interceptor')
//   // console.log(res)
//   // const json = await res.json()
//   // return json
// })
