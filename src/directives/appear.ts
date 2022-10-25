import type { ObjectDirective } from 'vue'

class Observer {
	// 观察对象
	public observers: Element[]
	// 观察者
	public observe: IntersectionObserver
	// 是否持续观察
	protected sustain: boolean

	constructor(
		observers: Element[] | Element,
		callback: Function,
		sustain: boolean = false
	) {
		this.observers = Array.isArray(observers) ? observers : [observers]
		this.sustain = sustain
		this.observe = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]) => {
				entries.forEach(entry => {
					// 当前观察对象
					const target = entry.target
					// 判断是否出现在视口范围内
					if (entry.isIntersecting) {
						callback(target)
						// 取消观察
						if (!this.sustain) this.observe.unobserve(target)
					}
				})
			}
		)
	}
	public start() {
		this.observers.forEach(dom => {
			this.observe.observe(dom)
		})
	}
}

export const appear: ObjectDirective = {
	mounted(el, { arg, value }) {
    if (typeof value !== 'function') return
    const sustain = arg === undefined ? false : arg
    const observer = new Observer(el, value, <boolean>sustain)
    observer.start()
  }
}
