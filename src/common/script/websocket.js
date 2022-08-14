/*
 *	1.没连接到ws服务器的时候要不停的重连
 *	2.重连的时候保证实例只有一个通道
 */

//params:{
//	path:string//sw地址
//	onmessage:function
//}
export class WhrWebSocket {
	constructor(params) {
		//只有params这个参数必须写在constructor方法里，其他的实例属性可以写在外面
		// 比如 socket = null
		this.socket = null
		this.params = params
		this.j = 0 //websocket重连次数
		this.i = 0 //发送信息次数
		if ('WebSocket' in window) {
			this.init(params)
		} else {
			alert('当前浏览器不支持websocket')
		}
	}

	init(params) {
		console.log('init方法开始')
		if (params.path) {
			this.path = params.path
		} else {
			throw new Error('参数socket服务器地址path必须存在')
		}

		this.socket = new WebSocket(this.path)

		this.socket.onopen = () => {
			console.log('连接开启')
		}
		this.socket.onclose = () => {
			this.j = 0
			console.log('连接关闭')
			this.reconnect()
		}
		this.socket.onerror = () => {
			this.j = 0
			console.log('连接错误')
		}

		this.socket.onmessage = params.onmessage || this.getMessage
	}

	getMessage(msg) {
		console.log('收到的消息', msg)
		return msg
	}

	send(data) {
		let s = null
		try {
			if (this.socket.readyState == 1) {
				this.i = 0
				clearTimeout(s)
				this.socket.send(data)
				console.log('发送成功' + data)
			} else {
				if (this.i <= 10) {
					console.log(this.socket.readyState)
					++this.i
					// this.send(data)
					s = setTimeout(() => {
						this.send(data)
					}, 100 * this.i)
				} else {
					this.i = 0
					clearTimeout(s)
				}
			}
		} catch (e) {
			console.log(e)
		}
	}
	close() {
		clearTimeout(this.time)
		this.socket.close(1000, '手动关闭')
		console.log('调用关闭')
	}
	reconnect() {
		this.j++
		//1.开始重连
		//2.如果连接不成功要继续重连
		if (this.j > 1) {
			return
		} else {
			if (this.socket.readyState == 1 || this.socket.readyState == 0) {
				// this.lock = false
				// clearTimeout(s)
				return false
			} else {
				console.log('开始重连')
				this.time = setTimeout(() => {
					this.init(this.params)
				}, 5000)
			}
		}
	}
}
