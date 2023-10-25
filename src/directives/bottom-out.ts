import type { ObjectDirective } from 'vue'

const NodesWeakMap = new WeakMap<Element, Element>()

export const bottomOut: ObjectDirective = {
	mounted(el, { arg, value }) {
    if (arg) {
      let element = el.querySelector(arg) || document.querySelector(arg)
      NodesWeakMap.set(el, element || el)
    } else {
      NodesWeakMap.set(el, el)
    }
    if (!NodesWeakMap.get(el)) return
		if (typeof value !== 'function') return
		el.__scroll__ = (e: MouseEvent) => {
			const element: HTMLElement = e.target as HTMLElement
			const isBottom =
				element.scrollHeight - element.scrollTop <= element.clientHeight
			if (isBottom) {
				// 触底调用方法
				value()
			}
		}
		NodesWeakMap.get(el)!.addEventListener('scroll', el.__scroll__)
	},
	beforeUnmount(el) {
		NodesWeakMap.get(el)?.removeEventListener('scroll', el.__scroll__)
	}
}
