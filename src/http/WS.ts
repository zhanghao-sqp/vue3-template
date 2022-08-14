type WebsocketEvent = {
  onopen: (this: WebSocket, ev: Event) => any | null
  onmessage: (this: WebSocket, ev: Event) => any | null
  onerror: (this: WebSocket, ev: Event) => any | null
  onclose: (this: WebSocket, ev: Event) => any | null
  sendData: string | ArrayBufferLike | Blob | ArrayBufferView
}

export default class {
  public options: any = {}
  public ws: WebSocket
	protected connectCount: number = 0 // 连接次数
	protected i: number = 0 // 发送次数

	constructor(
		url: string,
    options?: {
      onopen?: WebsocketEvent['onopen']
      onmessage: WebsocketEvent['onmessage']
      onerror?: WebsocketEvent['onerror']
      timeout?: number
		}
	) {
    this.options = options
    if (!('WebSocket' in window)) {
      throw new Error('当前浏览器不支持WebSocket')
    } else {
      this.ws = new WebSocket(url)
      this.init()
    }
  }
  private init(): void {
    this.connectCount++
    this.ws.onopen = this.options?.onopen || (() => console.log('websocket open'))
    this.ws.onerror = this.options?.onerror || (() => console.log('websocket error'))
    this.ws.onmessage = this.options?.onmessage || (() => console.log('websocket message'))
  }
  public onmessage(callback: WebsocketEvent['onmessage']): void {
    this.ws.onmessage = callback
  }
  public send(data: WebsocketEvent['sendData']): void {
    let timer = null
    try {
      if (this.ws.readyState == 1) {
				this.i = 0
				timer && clearTimeout(timer)
				this.ws.send(data)
			} else {
				if (this.i <= 10) {
					// console.log(this.ws.readyState)
					++this.i
					timer = setTimeout(() => {
						this.send(data)
					}, 1000 * this.i)
				} else {
					this.i = 0
					timer && clearTimeout(timer)
				}
			}
    } catch (error) {
      console.log(error)
    }
  }
  public close(code?: number, reason?: string): void {
    this.ws.close(code, reason)
  }
  public reconnect(): void {
    this.connectCount++
    this.init()
  }
}
