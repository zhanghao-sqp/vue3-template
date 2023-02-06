import type { ObjectDirective } from 'vue'

export const dragSort: ObjectDirective = {
	created(el, { value }) {
		let draging: any = null
		//使用事件委托，给父元素绑定事件
		el.ondragstart = (event: any) => {
			//console.log("start");
			//firefox设置了setData后元素才能拖动！！！！
			//event.target出发事件的元素
			event.dataTransfer.setData('text', event.target.innerText) //不能使用text，firefox会打开新tab
			//event.dataTransfer.setData("self", event.target);
			// 记录当前拖拽元素
			draging = event.target
		}
		el.ondragover = (event: any) => {
			//console.log("onDrop over");
			//取消默认行为
			event.preventDefault()
			let target = event.target
			//因为dragover会发生在el的子元素上，所以要判断target是否是el的子元素
			if (target.parentNode === el) {
				if (target !== draging) {
					//getBoundingClientRect()用于获取某个元素相对于视窗的位置集合
					let targetRect = target.getBoundingClientRect()
					let dragingRect = draging.getBoundingClientRect()
					if (target) {
						if (target.animated) {
							return
						}
					}
					if (_index(draging) < _index(target)) {
						//nextSibling 属性可返回某个元素之后紧跟的节点（处于同一树层级中）。
						target.parentNode.insertBefore(draging, target.nextSibling)
					} else {
						target.parentNode.insertBefore(draging, target)
					}
					_animate(dragingRect, draging)
					_animate(targetRect, target)
				}
			}
		}
		// 子元素添加draggable属性
		for (let node of el.childNodes) {
			if (node.nodeType === 1) {
				node.setAttribute('draggable', 'true')
			}
		}
	},
	updated(el, binding) {
		// 子元素添加draggable属性
		for (let node of el.childNodes) {
			if (node.nodeType === 1) {
				node.setAttribute('draggable', 'true')
			}
		}
	},
	beforeUnmount(el) {}
}

//获取元素在父元素中的index
function _index(el: Element | null) {
	let index = 0
	if (!el || !el.parentNode) {
		return -1
	}
	//previousElementSibling属性返回指定元素的前一个兄弟元素（相同节点树层中的前一个元素节点）。
	while (el && (el = el.previousElementSibling)) {
		//console.log(el);
		index++
	}
	return index
}

//添加动画
function _animate(prevRect: any, target: any) {
	const ms = 300
	let currentRect = target.getBoundingClientRect()
	//nodeType 属性返回以数字值返回指定节点的节点类型。1=元素节点  2=属性节点
	if (prevRect.nodeType === 1) {
		prevRect = prevRect.getBoundingClientRect()
	}
	_css(target, 'transition', 'none')
	_css(
		target,
		'transform',
		'translate3d(' +
			(prevRect.left - currentRect.left) +
			'px,' +
			(prevRect.top - currentRect.top) +
			'px,0)'
	)

	target.offsetWidth // 触发重绘
	//放在timeout里面也可以
	// setTimeout(function() {
	//     _css(target, 'transition', 'all ' + ms + 'ms');
	//     _css(target, 'transform', 'translate3d(0,0,0)');
	// }, 0);
	_css(target, 'transition', 'all ' + ms + 'ms')
	_css(target, 'transform', 'translate3d(0,0,0)')

	clearTimeout(target.animated)
	target.animated = setTimeout(function () {
		_css(target, 'transition', '')
		_css(target, 'transform', '')
		target.animated = false
	}, ms)
}
//给元素添加行内style
function _css(el: any, prop: string, val: any) {
	let style = el && el.style

	if (style) {
		if (val === void 0) {
			//使用DefaultView属性可以指定打开窗体时所用的视图
			if (document.defaultView && document.defaultView.getComputedStyle) {
				val = document.defaultView.getComputedStyle(el, '')
			} else if (el.currentStyle) {
				val = el.currentStyle
			}
			return prop === void 0 ? val : val[prop]
		} else {
			if (!(prop in style)) {
				prop = '-webkit-' + prop
			}
			style[prop] = val + (typeof val === 'string' ? '' : 'px')
		}
	}
}
