import type { ObjectDirective } from 'vue'

export const droppable: ObjectDirective = {
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
			el.style.boxShadow = `0 0 5px 2px rgba(0,0,0,0.5)`
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
}
