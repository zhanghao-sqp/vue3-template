import type { App } from 'vue'

import { appear } from './appear'
import { droppable } from './droppable'
import { waves } from './waves'

export default {
	install: (app: App<Element>) => {
		app.directive('appear', appear) // v-appear 元素出现在视口时触发
		app.directive('droppable', droppable) // v-droppable 是否可拖拽
		app.directive('waves', waves) // v-waves 点击涟漪效果
		/**
		 * 常用指令
		 */
		// `v-focus`
		app.directive('focus', {
			// 当被绑定的元素挂载到 DOM 中时……
			mounted(el) {
				const input = el.querySelector('input')
				input ? input.focus() : el.focus()
			}
		})

		// v-disabled
		app.directive('disabled', {
			created(el, { value }) {
				if (value === true || value === undefined) {
					el.style.pointerEvents = 'none'
					el.style.opacity = '0.7'
				}
			},
			updated(el, { value }) {
				if (value === true || value === undefined) {
					el.style.pointerEvents = 'none'
					el.style.opacity = '0.5'
				} else {
					el.style.pointerEvents = 'auto'
					el.style.opacity = 1
				}
			}
		})

		// v-debounce="{fn, event, delay}"
		app.directive('debounce', {
			created(el, { value }) {
				// 至少需要回调函数以及监听事件类型
				if (typeof value.fn !== 'function' || !value.event) return
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
				if (typeof value.fn !== 'function' || !value.event) return
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

		// v-download:filename="url"
		app.directive('download', {
			created(el, binding) {
				el.$download = () => {
					const a = document.createElement('a')
					a.href = binding.value
					a.download = binding.arg || 'download'
					a.click()
					a.remove()
				}
				el.addEventListener('click', el.$download)
			},
			beforeUnmount(el) {
				el.$download && el.removeEventListener('click', el.$download)
			}
		})

		// v-remote-download:filename="fn"
		app.directive('remote-download', {
			created(el, { arg, value }) {
				el.$remoteDownload = async () => {
					try {
						const blob = await value()
						if (!(blob instanceof Blob)) return
						const link = document.createElement('a')
						link.href = window.URL.createObjectURL(blob)
						link.download = arg || 'download'
						link.click()
						window.URL.revokeObjectURL(link.href)
						link.remove()
					} catch (error) {
						throw error
					}
				}
				el.addEventListener('click', el.$remoteDownload)
			},
			beforeUnmount(el) {
				el.$remoteDownload &&
					el.removeEventListener('click', el.$remoteDownload)
			}
		})
	}
}
