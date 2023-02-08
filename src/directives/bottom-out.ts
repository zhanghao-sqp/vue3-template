import type { ObjectDirective } from 'vue'

let node: Element | null | undefined = null

export const bottomOut: ObjectDirective = {
	mounted(el, { arg, value }) {
    if (arg) {
      let element = el.querySelector(arg) || document.querySelector(arg)
      node = element || el
    } else {
      node = el
    }
    if (!node) return
		if (typeof value !== 'function') return
		el.$scroll = (e: MouseEvent) => {
			const element: HTMLElement = e.target as HTMLElement
			const isBottom =
				element.scrollHeight - element.scrollTop <= element.clientHeight
			if (isBottom) {
				// 触底调用方法
				value()
			}
		}
		node.addEventListener('scroll', el.$scroll)
	},
	beforeUnmount(el) {
		node && node.removeEventListener('scroll', el.$scroll)
	}
}
