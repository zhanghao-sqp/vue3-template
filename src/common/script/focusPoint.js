let canvas, W, H, draw // 绘布 canvas宽高 绘制函数
const mouse = { x: null, y: null, max: null } // 鼠标位置
const points = [] //存放点的数组
//获得窗口宽高，并设置canvas元素宽高
const getWindowWH = () => {
	;(W = canvas.width =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth),
		(H = canvas.height =
			window.innerHeight ||
			document.documentElement.clientHeight ||
			document.body.clientHeight)
	points.length = Math.floor((W * H) / 12000)
	mouse.max = points.length * 100
	putPoint(points)
}
//window.requestAnimationFrame与setTimeout相似，形成递归调用，
//不过window.requestAnimationFrame采用系统时间间隔，保持最佳绘制效率,提供了更好地优化，使动画更流畅
//经过浏览器优化，动画更流畅；
//窗口没激活时，动画将停止，省计算资源;
const animation =
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (i) {
		window.setTimeout(i, 1000 / 60)
	} //各个浏览器支持的requestAnimationFrame有所不同，兼容各个浏览器
let animationId = null // 动画id
// 鼠标移动事件
const mousemoveFunc = e => {
	mouse.x = e.clientX
	mouse.y = e.clientY
}
const mouseoutFunc = () => {
	mouse.x = null
	mouse.y = null
}
// 放入小点
const putPoint = points => {
	for (let i = 0; i < points.length; i++) {
		points[i] = new Object()
		points[i].x = Math.random() * W
		points[i].y = Math.random() * H
		points[i].xa = 2 * Math.random() - 1
		points[i].ya = 2 * Math.random() - 1
		points[i].max = points.length * 100
	}
}
// 16进制颜色转换为RGB
const set16ToRgb = str => {
	var reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
	if (!reg.test(str)) {
		// return
		return str.split('(')[1].split(')')[0]
	}
	let newStr = str.toLowerCase().replace(/\#/g, '')
	let len = newStr.length
	if (len == 3) {
		let t = ''
		for (var i = 0; i < len; i++) {
			t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1))
		}
		newStr = t
	}
	let arr = [] //将字符串分隔，两个两个的分隔
	for (var i = 0; i < 6; i = i + 2) {
		let s = newStr.slice(i, i + 2)
		arr.push(parseInt('0x' + s))
	}
	// return 'rgb(' + arr.join(',') + ')'
	return arr.join(',')
}

export const start = (
	color = '#000',
	pointWidth = 1,
	opacity = 0.7,
	zIndex = -1
) => {
	color = set16ToRgb(color)
	//canvas元素相关
	//创建canvas元素，并设置canvas元素的id
	canvas = document.createElement('canvas')
	const context = canvas.getContext('2d')
	//设置创建的canvas的相关属性
	canvas.id = 'focusPointCanvas'
	canvas.style.cssText =
		'position:fixed;top:0;left:0;z-index:' + zIndex + ';opacity:' + opacity
	// canvas禁用鼠标右击事件
	canvas.oncontextmenu = e => {
		// e.preventDefault()
		return false
	}
	//该函数设置了canvas元素的width属性和height属性
	getWindowWH()
	//将canvas元素添加到body元素中
	document.getElementsByTagName('body')[0].appendChild(canvas)
	//onresize 事件会在窗口或框架被调整大小时发生
	//此处即为当窗口大小改变时，重新获取窗口的宽高和设置canvas元素的宽高
	window.addEventListener('resize', getWindowWH)

	//往points[]数组放点
	putPoint(points)
	//获取鼠标所在坐标
	window.addEventListener('mousemove', mousemoveFunc)
	//鼠标移出窗口后，消除鼠标点
	window.addEventListener('mouseout', mouseoutFunc)

	//绘制点，点移动(碰到边界反向移动)，点受鼠标束缚
	draw = () => {
		//清除画布
		context.clearRect(0, 0, W, H)
		let w = [mouse].concat(points) //连接(合并)鼠标点数组和其他点数组
		let x, v, A, B, z, y
		//square属性表：x，y，xa，ya，max
		points.forEach(i => {
			//实现点定向移动
			i.x += i.xa
			i.y += i.ya
			// 控制点移动方向
			// 当点达到窗口边界时，反向移动
			i.xa = i.xa * (i.x > W || i.x < 0 ? -1 : 1)
			i.ya = i.ya * (i.y > H || i.y < 0 ? -1 : 1)
			//fillRect前两个参数为矩形左上角的x，y坐标，后两个分别为宽度和高度
			//绘制点
			context.beginPath()
			context.arc(i.x - 0.5, i.y - 0.5, pointWidth, 0, Math.PI * 2, true)
			context.fillStyle = 'rgba(' + color + ', 0.7)'
			context.fill()
			//遍历w中所有元素
			for (let n = 0; n < w.length; n++) {
				x = w[n]
				//如果x与i不是同一个对象实例且x的xy坐标存在
				if (i !== x && null !== x.x && null !== x.y) {
					const x_diff = i.x - x.x //i和x的x坐标差
					const y_diff = i.y - x.y //i和x的y坐标差
					const distance = x_diff * x_diff + y_diff * y_diff //斜边平方
					if (distance < x.max) {
						//使i点受鼠标点束缚，即如果i点与鼠标点距离过大，i点会被鼠标点束缚,
						//造成 多个点以鼠标为圆心，mouse.max/2为半径绕成一圈
						if (x === mouse && distance > x.max / 2) {
							i.x = i.x - 0.03 * x_diff
							i.y = i.y - 0.03 * y_diff
						}
						A = (x.max - distance) / x.max
						context.beginPath()
						//设置画笔的画线的粗细与两个点的距离相关，范围0-0.5，两个点距离越远画线越细，达到max时画线消失
						context.lineWidth = A / 2
						//设置画笔的画线颜色为s.c即画布颜色，透明度为(A+0.2)即两个点距离越远画线越淡
						context.strokeStyle = 'rgba(' + color + ',' + (A + 0.2) + ')'
						//设置画笔的笔触为i点
						context.moveTo(i.x, i.y)
						//使画笔的笔触移动到x点
						context.lineTo(x.x, x.y)
						//完成画线的绘制，即绘制连接点的线
						context.stroke()
					}
				}
			}
			//把i点从w数组中去掉
			//防止两个点重复连线
			w.splice(w.indexOf(i), 1)
		})
		animationId = animation(draw)
	}
	//此处是等待0.1秒后，执行一次draw()，真正的动画效果是用window.requestAnimationFrame实现的
	setTimeout(() => {
		draw()
	}, 100)
}

export const close = () => {
	window.cancelAnimationFrame(animationId)
	window.removeEventListener('resize', getWindowWH)
	window.removeEventListener('mousemove', mousemoveFunc)
	window.removeEventListener('mouseout', mouseoutFunc)
	if (document.querySelector('#focusPointCanvas')) {
		document.querySelector('#focusPointCanvas').remove()
	}
}
