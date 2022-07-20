export default class CanvasDraw {
	public canvas: HTMLCanvasElement
	public ctx: CanvasRenderingContext2D
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
	}
	// 绘制点
	drawPoint(x: number, y: number, color = '#333', lineWidth = 1) {
		this.ctx.beginPath()
		this.ctx.arc(x, y, lineWidth, 0, Math.PI * 2, true)
		this.ctx.fillStyle = color
		this.ctx.fill()
		this.ctx.closePath()
		return this
	}
	//绘制直线
	drawLine(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		color = '#333',
		lineWidth = 1
	) {
		this.ctx.beginPath()
		this.ctx.moveTo(x1, y1)
		this.ctx.lineTo(x2, y2)
		this.ctx.lineWidth = lineWidth
		this.ctx.strokeStyle = color
		this.ctx.stroke()
		this.ctx.closePath()
		return this
	}
	// 绘制虚线
	drawDashedLine(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		color = '#333',
		lineWidth = 1,
		dashLength = 5
	) {
		this.ctx.beginPath()
		this.ctx.moveTo(x1, y1)
		this.ctx.lineTo(x2, y2)
		this.ctx.lineWidth = lineWidth
		this.ctx.strokeStyle = color
		this.ctx.setLineDash([dashLength, dashLength])
		this.ctx.stroke()
		this.ctx.setLineDash([])
		this.ctx.closePath()
		return this
	}
	// 绘制矩形
	drawRect(
		x: number,
		y: number,
		width: number,
		height: number,
		color = '#333',
		lineWidth = 1
	) {
		this.ctx.beginPath()
		this.ctx.rect(x, y, width, height)
		this.ctx.lineWidth = lineWidth
		this.ctx.strokeStyle = color
		this.ctx.stroke()
		this.ctx.closePath()
		return this
	}
	// 绘制多边形
	drawPolygon(
		points: Array<{ x: number; y: number }>,
		color = '#333',
		lineWidth = 1
	) {
		this.ctx.beginPath()
		this.ctx.moveTo(points[0].x, points[0].y)
		for (let i = 1; i < points.length; i++) {
			this.ctx.lineTo(points[i].x, points[i].y)
		}
		this.ctx.lineWidth = lineWidth
		this.ctx.strokeStyle = color
		this.ctx.stroke()
		this.ctx.closePath()
		return this
	}
	// 绘制圆形
	drawCircle(
		x: number,
		y: number,
		radius: number,
		color = '#333',
		lineWidth = 1
	) {
		this.ctx.beginPath()
		this.ctx.arc(x, y, radius, 0, Math.PI * 2, true)
		this.ctx.lineWidth = lineWidth
		this.ctx.strokeStyle = color
		this.ctx.stroke()
		this.ctx.closePath()
		return this
	}
	// 绘制实心圆形
	drawSolidCircle(x: number, y: number, radius: number, color = '#333') {
		this.ctx.beginPath()
		this.ctx.arc(x, y, radius, 0, Math.PI * 2, true)
		this.ctx.fillStyle = color
		this.ctx.fill()
		this.ctx.closePath()
		return this
	}
	// 绘制圆弧
	drawArc(
		x: number,
		y: number,
		radius: number,
		startAngle: number,
		endAngle: number,
		color = '#333',
		lineWidth = 1
	) {
		this.ctx.beginPath()
		this.ctx.arc(x, y, radius, startAngle, endAngle, true)
		this.ctx.lineWidth = lineWidth
		this.ctx.strokeStyle = color
		this.ctx.stroke()
		this.ctx.closePath()
		return this
	}
	// 绘制文字
	drawText(
		text: string,
		x: number,
		y: number,
		color = '#333',
		font = '14px',
		textAlign: CanvasTextAlign = 'center',
		textBaseline: CanvasTextBaseline = 'middle'
	) {
		this.ctx.fillStyle = color
		this.ctx.font = font
		this.ctx.textAlign = textAlign
		this.ctx.textBaseline = textBaseline
		this.ctx.fillText(text, x, y)
	}
	// 绘制图片
	drawImage(
		img: CanvasImageSource,
		x: number,
		y: number,
		width: number,
		height: number
	) {
		this.ctx.drawImage(img, x, y, width, height)
		return this
	}
	// 获取绘制的元素
	getImageData(
		x = 0,
		y = 0,
		width = this.canvas.width,
		height = this.canvas.height
	) {
		return this.ctx.getImageData(x, y, width, height)
	}
	// 放入元素
	putImageData(imageData: ImageData, x = 0, y = 0) {
		this.ctx.putImageData(imageData, x, y)
		return this
	}
	// 清除画布
	clearRect(
		x = 0,
		y = 0,
		width = this.canvas.width,
		height = this.canvas.height
	) {
		this.ctx.clearRect(x, y, width, height)
		return this
	}
}
type Mouse = {
	x: number | null
	y: number | null
	max: number | null
}
type Point = {
	x: number | null
	y: number | null
	max: number | null
	xa: number | null
	ya: number | null
}
export class CanvasFocusPoint {
	public color: string
	public pointWidth: number
	public opacity: number
	public zIndex: number
	public canvas: HTMLCanvasElement | null = null
	public W: number | null = null
	public H: number | null = null
	public mouse: Mouse
	public points: Point[] = []
	public animationId: number | null = null
	constructor(color = '#000', pointWidth = 1, opacity = 0.7, zIndex = -1) {
		this.color = color
		this.pointWidth = pointWidth
		this.opacity = opacity
		this.zIndex = zIndex
		this.mouse = { x: null, y: null, max: null }
	}

	// 16进制颜色转换为RGB
	static set16ToRgb = (str: string) => {
		const reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
		if (!reg.test(str)) {
			// return
			return str.split('(')[1].split(')')[0]
		}
		let newStr = str.toLowerCase().replace(/\#/g, '')
		let len = newStr.length
		if (len == 3) {
			let t = ''
			for (let i = 0; i < len; i++) {
				t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1))
			}
			newStr = t
		}
		let arr = []
		for (let i = 0; i < 6; i = i + 2) {
			let s = newStr.slice(i, i + 2)
			arr.push(parseInt('0x' + s))
		}
		// return 'rgb(' + arr.join(',') + ')'
		return arr.join(',')
	}
	mousemoveFunc = (e: MouseEvent) => {
		this.mouse.x = e.clientX
		this.mouse.y = e.clientY
	}
	mouseoutFunc = () => {
		this.mouse.x = null
		this.mouse.y = null
	}
	getWindowWH() {
		;(this.W = this.canvas!.width =
			window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth),
			(this.H = this.canvas!.height =
				window.innerHeight ||
				document.documentElement.clientHeight ||
				document.body.clientHeight)
		this.points = Array(Math.floor((this.W * this.H) / 12000)).fill({
			x: null, y: null, max: null, xa: null, ya: null
		})
		this.mouse.max = this.points.length * 100
		this.putPoint(this.points)
	}
	putPoint = (points: Point[]) => {
		for (let point of points) {
			point.x = Math.random() * this.W!
			point.y = Math.random() * this.H!
			point.xa = 2 * Math.random() - 1
			point.ya = 2 * Math.random() - 1
			point.max = points.length * 100
		}
	}
	start() {
		this.color = CanvasFocusPoint.set16ToRgb(this.color)
		this.canvas = document.createElement('canvas')
		const context: CanvasRenderingContext2D = this.canvas.getContext('2d')!
		this.canvas.id = 'focusPointCanvas'
		this.canvas.style.cssText =
			'position:fixed;top:0;left:0;z-index:' +
			this.zIndex +
			';opacity:' +
			this.opacity
		// canvas禁用鼠标右击事件
		this.canvas.oncontextmenu = (e: MouseEvent) => {
			// e.preventDefault()
			return false
		}
		this.getWindowWH()
		this.putPoint(this.points)
		document.getElementsByTagName('body')[0].appendChild(this.canvas)
		window.addEventListener('resize', this.getWindowWH.bind(this))
		window.addEventListener('mousemove', this.mousemoveFunc.bind(this))
		window.addEventListener('mouseout', this.mouseoutFunc.bind(this))

		const draw = () => {
			//清除画布
			context.clearRect(0, 0, this.W!, this.H!)
			let totalPoints = [this.mouse].concat(this.points) //连接(合并)鼠标点数组和其他点数组
			let current, lineWidth
			//square属性表：x，y，xa，ya，max
			this.points.forEach(i => {
				//实现点定向移动
				i.x! += i.xa!
				i.y! += i.ya!
				// 控制点移动方向
				// 当点达到窗口边界时，反向移动
				i.xa = i.xa! * (i.x! > this.W! || i.x! < 0 ? -1 : 1)
				i.ya = i.ya! * (i.y! > this.H! || i.y! < 0 ? -1 : 1)
				//fillRect前两个参数为矩形左上角的x，y坐标，后两个分别为宽度和高度
				//绘制点
				context.beginPath()
				context.arc(i.x! - 0.5, i.y! - 0.5, this.pointWidth, 0, Math.PI * 2, true)
				context.fillStyle = 'rgba(' + this.color + ', 0.7)'
				context.fill()
				//遍历totalPoints中所有元素
				for (let n = 0; n < totalPoints.length; n++) {
					current = totalPoints[n]
					//如果current与i不是同一个对象实例且current的xy坐标存在
					if (i !== current && null !== current.x && null !== current.y) {
						const x_diff = i.x! - current.x //i和current的x坐标差
						const y_diff = i.y! - current.y //i和current的y坐标差
						const distance = x_diff * x_diff + y_diff * y_diff //斜边平方
						if (distance < current.max!) {
							//使i点受鼠标点束缚，即如果i点与鼠标点距离过大，i点会被鼠标点束缚,
							//造成 多个点以鼠标为圆心，mouse.max/2为半径绕成一圈
							if (current === this.mouse && distance > current.max! / 2) {
								i.x = i.x! - 0.02 * x_diff
								i.y = i.y! - 0.02 * y_diff
							}
							lineWidth = (current.max! - distance) / current.max!
							context.beginPath()
							//设置画笔的画线的粗细与两个点的距离相关，范围0-0.5，两个点距离越远画线越细，达到max时画线消失
							context.lineWidth = lineWidth / 2
							//设置画笔的画线颜色为s.c即画布颜色，透明度为(A+0.2)即两个点距离越远画线越淡
							context.strokeStyle =
								'rgba(' + this.color + ',' + (lineWidth + 0.2) + ')'
							//设置画笔的笔触为i点
							context.moveTo(i.x!, i.y!)
							//使画笔的笔触移动到x点
							context.lineTo(current.x, current.y)
							//完成画线的绘制，即绘制连接点的线
							context.stroke()
						}
					}
				}
				//把i点从w数组中去掉
				//防止两个点重复连线
				totalPoints.splice(totalPoints.indexOf(i), 1)
			})
			this.animationId = requestAnimationFrame(draw)
		}
		setTimeout(() => {
			draw()
		}, 100)
	}
	close() {
		window.cancelAnimationFrame(this.animationId!)
		window.removeEventListener('resize', this.getWindowWH)
		window.removeEventListener('mousemove', this.mousemoveFunc)
		window.removeEventListener('mouseout', this.mouseoutFunc)
		if (document.querySelector('#focusPointCanvas')) {
			document.querySelector('#focusPointCanvas')!.remove()
		}
	}
}

