import type { ObjectDirective } from 'vue'

export const forbidden: ObjectDirective = {
	created(el, { value }) {
		// 禁用点击事件的回调函数
		el.__forbidden__ = (e: MouseEvent) => {
			e.preventDefault()
			e.stopPropagation()
			return false
		}
		if (value === true || value === undefined) {
			// 给el及其子元素添加行内样式
			let style =
				'opacity: 0.7; cursor: not-allowed; pointer-events: none;'
			el.setAttribute('style', style)
			el.querySelectorAll('*').forEach((child: HTMLElement) => {
				child.setAttribute('style', style)
			})
			// 禁用el及其子元素的点击事件
			el.addEventListener('click', el.__forbidden__)
		}
	},
	updated(el, { value }) {
		if (value === true || value === undefined) {
			let style =
			'opacity: 0.7; cursor: not-allowed; pointer-events: none;'
			el.setAttribute('style', style)
			el.querySelectorAll('*').forEach((child: HTMLElement) => {
				child.setAttribute('style', style)
			})
			el.addEventListener('click', el.__forbidden__)
		} else {
			el.removeAttribute('style')
			el.querySelectorAll('*').forEach((child: HTMLElement) => {
				child.removeAttribute('style')
			})
			el.removeEventListener('click', el.__forbidden__)
		}
	}
}
