import { App } from 'vue'
import Observer from '@/utils/Observer'
export default {
	install: (app: App<Element>) => {
		// `v-focus`
		app.directive('focus', {
			// 当被绑定的元素挂载到 DOM 中时……
			mounted(el) {
				const input = el.querySelector('input')
				input ? input.focus() : el.focus()
			}
		})

		// v-debounce="{fn, event, delay}"
		app.directive('debounce', {
			created(el, { value }) {
				// 至少需要回调函数以及监听事件类型
				if (typeof value.fn !== 'function' || !value.event)
					return
				el.timer = null
				el.handler = function () {
					if (el.timer) {
						clearTimeout(el.timer)
						el.timer = null
					}
					el.timer = setTimeout(() => {
						value.fn.apply(this, arguments)
						el.timer = null
					}, value.delay || 200)
				}
				el.addEventListener(value.event, el.handler)
			},
			beforeUnmount(el, { value }) {
				if (el.timer) {
					clearTimeout(el.timer)
					el.timer = null
				}
				el.removeEventListener(value.event, el.handler)
			}
		})

		// v-throttle="{fn, event, delay}"
		app.directive('throttle', {
			created(el, { value }) {
				// 至少需要回调函数以及监听事件类型
				if (typeof value.fn !== 'function' || !value.event)
					return
				el.timer = null
				el.handler = function () {
					if (el.timer) return
					el.timer = setTimeout(() => {
						value.fn.apply(this, arguments)
						el.timer = null
					}, value.delay || 200)
				}
				el.addEventListener(value.event, el.handler)
			},
			beforeUnmount(el, { value }) {
				if (el.timer) {
					clearTimeout(el.timer)
					el.timer = null
				}
				el.removeEventListener(value.event, el.handler)
			}
		})

		// v-grounding = "fn"
		app.directive('grounding', {
			created(el, { value }) {
				if (typeof value !== 'function') return
				el.$scoll = (e: MouseEvent) => {
					const element: HTMLElement = e.target as HTMLElement
					const isBottom =
						element.scrollHeight - element.scrollTop <= element.clientHeight
					if (isBottom) {
						// 触底调用方法
						value()
					}
				}
				el.addEventListener('scroll', el.$scoll)
			},
			beforeUnmount(el) {
				el.removeEventListener('scroll', el.$scoll)
			}
		})

		// v-appear = "fn"
		app.directive('appear', {
			mounted(el, { arg, value }) {
				if (typeof value !== 'function') return
				const sustain = arg === undefined ? false : arg
				const observer = new Observer([el], value, <boolean>sustain)
				observer.start()
			}
		})

		// v-droppable 有些bug，慎用
		app.directive('droppable', {
			created(el, { value }) {
				let innerX: number, innerY: number
				// 鼠标移动事件
				const move = (e: MouseEvent) => {
					// 鼠标移动的时候不停的修改div的left和top值
					el.style.left = e.clientX - innerX + 'px'
					el.style.top = e.clientY - innerY + 'px'
					// 边界判断
					if (parseInt(el.style.left) <= 0) {
						el.style.left = '0px'
					}
					if (parseInt(el.style.top) <= 0) {
						el.style.top = '0px'
					}
					if (
						parseInt(el.style.left) >=
						window.innerWidth - parseInt(el.offsetWidth)
					) {
						el.style.left = window.innerWidth - parseInt(el.offsetWidth) + 'px'
					}
					if (
						parseInt(el.style.top) >=
						window.innerHeight - parseInt(el.offsetHight)
					) {
						el.style.top = window.innerHeight - parseInt(el.offsetHight) + 'px'
					}
				}
				// 鼠标按下事件 处理程序
				el.$mouseDown = (e: MouseEvent) => {
					el.style.position = 'absolute'
					el.style.cursor = 'move'
					el.style.zIndex = '999'
					el.style.boxShadow = `0 0 10px 4px #ccc`
					// 获取当前的x轴距离
					let offsetX = el.getBoundingClientRect().left
					// 获取当前的y轴距离
					let offsetY = el.getBoundingClientRect().top
					// 获取鼠标在方块内的x轴距
					innerX = e.clientX - offsetX
					// 获取鼠标在方块内的y轴距
					innerY = e.clientY - offsetY
					document.addEventListener('mousemove', move)
				}
				// 鼠标抬起事件 处理程序
				el.$mouseUp = () => {
					el.style.cursor = 'default'
					el.style.boxShadow = 'none'
					document.removeEventListener('mousemove', move)
				}
				// 绑定鼠标按下事件
				el.addEventListener('mousedown', el.$mouseDown)
				// 鼠标抬起事件
				document.addEventListener('mouseup', el.$mouseUp)
				// 解绑鼠标事件
				// if (value !== undefined && !value) {
				// 	el.removeEventListener('mousedown', el.$mouseDown)
				// 	document.removeEventListener('mouseup', el.$mouseUp)
				// }
			},
			updated(el, binding) {
				// 鼠标移出事件
				if (binding.value !== undefined && !binding.value) {
					el.removeEventListener('mousedown', el.$mouseDown)
					el.removeEventListener('mouseup', el.$mouseUp)
				}
			},
			beforeUnmount(el) {
				el.removeEventListener('mousedown', el.$mouseDown)
				el.removeEventListener('mouseup', el.$mouseUp)
			}
		})
		
	}
}
