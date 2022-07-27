import { App } from 'vue'

export default {
	install: (app: App<Element>) => {
		// 注册一个全局自定义指令 `v-focus`
		app.directive('focus', {
			// 当被绑定的元素挂载到 DOM 中时……
			mounted(el) {
				// 聚焦元素
				el.focus()
			}
		})

		// v-debounce="{fn, event, delay}"
		app.directive('debounce', {
			mounted(el, binding) {
				// 至少需要回调函数以及监听事件类型
				if (typeof binding.value.fn !== 'function' || !binding.value.event)
					return
				let delay = 200 // 默认延迟时间
				el.timer = null
				el.handler = function () {
					if (el.timer) {
						clearTimeout(el.timer)
						el.timer = null
					}
					el.timer = setTimeout(() => {
						binding.value.fn.apply(this, arguments)
						el.timer = null
					}, binding.value.delay || delay)
				}
				el.addEventListener(binding.value.event, el.handler)
			},
			// 元素卸载前也记得清理定时器并且移除监听事件
			beforeMount(el, binding) {
				if (el.timer) {
					clearTimeout(el.timer)
					el.timer = null
				}
				el.removeEventListener(binding.value.event, el.handler)
			}
		})

		// v-throttle="{fn, event, delay}"
		app.directive('throttle', {
			mounted(el, binding) {
				// 至少需要回调函数以及监听事件类型
				if (typeof binding.value.fn !== 'function' || !binding.value.event)
					return
				let delay = 200
				el.timer = null
				el.handler = function () {
					if (el.timer) return
					el.timer = setTimeout(() => {
						binding.value.fn.apply(this, arguments)
						el.timer = null
					}, binding.value.delay || delay)
				}
				el.addEventListener(binding.value.event, el.handler)
			},
			// 元素卸载前也记得清理定时器并且移除监听事件
			beforeMount(el, binding) {
				if (el.timer) {
					clearTimeout(el.timer)
					el.timer = null
				}
				el.removeEventListener(binding.value.event, el.handler)
			}
		})

		// v-grounding = "fn"
		app.directive('grounding', {
			mounted(el, binding) {
				if (typeof binding.value !== 'function') return
				el.addEventListener('scroll', (e: MouseEvent) => {
					const element: HTMLElement = e.target as HTMLElement
					const isBottom =
						element.scrollHeight - element.scrollTop <= element.clientHeight
					if (isBottom) {
						// 触底调用方法
						binding.value()
					}
				})
			}
			// beforeUnmount(el) {
			//   el.removeEventListener('scroll')
			// }
		})
	}
}
