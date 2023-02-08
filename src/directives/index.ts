import type { App } from 'vue'

import { appear } from './appear'
import { droppable } from './droppable'
import { waves } from './waves'
import { dragSort } from './drag-sort'
import { clickOutside } from './click-outside'
import { debounce, throttle } from './debounce-throttle'
import { bottomOut } from './bottom-out'
import { clearEmoji } from './clear-emoji'
import { copy } from './copy'
import { forbidden } from './forbidden'
import { input } from './input'

export default {
	install: (app: App<Element>) => {
		app.directive('appear', appear) // v-appear 元素出现在视口时触发
		app.directive('droppable', droppable) // v-droppable 是否可拖拽
		app.directive('waves', waves) // v-waves 点击涟漪效果
		app.directive('drag-sort', dragSort) // v-drag-sort 拖拽排序
		app.directive('click-outside', clickOutside) // v-click-outside 点击外部区域
		app.directive('debounce', debounce) // v-debounce 防抖
		app.directive('throttle', throttle) // v-throttle 节流
		app.directive('bottom-out', bottomOut) // v-bottom-out 滚动到底部触发
		app.directive('clear-emoji', clearEmoji) // v-clear-emoji 清除表情符号
		app.directive('copy', copy) // v-copy 复制
		app.directive('forbidden', forbidden) // v-forbidden 禁用
		app.directive('input', input) // v-input 限制输入类型

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

		// v-download:filename="url"
		app.directive('download', {
			created(el, { value, arg }) {
				el.$download = () => {
					const a = document.createElement('a')
					a.href = value
					a.download =
						arg ||
						'download' +
							new Date().getFullYear() +
							(new Date().getMonth() + 1).toString().padStart(2, '0') +
							new Date().getDate().toString().padStart(2, '0')
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
						link.download =
							arg ||
							'download' +
								new Date().getFullYear() +
								(new Date().getMonth() + 1).toString().padStart(2, '0') +
								new Date().getDate().toString().padStart(2, '0')
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
