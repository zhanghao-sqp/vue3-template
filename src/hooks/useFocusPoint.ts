import { onMounted, onBeforeUnmount } from 'vue'

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
class Npoint implements Point {
	public x: number | null
	public y: number | null
	public xa: number | null
	public ya: number | null
	public max: number | null
	constructor(
		x: number | null,
		y: number | null,
		xa: number | null,
		ya: number | null,
		max: number | null
	) {
		this.x = x
		this.y = y
		this.xa = xa
		this.ya = ya
		this.max = max
	}
}
export interface Params {
	color?: string // 颜色
	pointWidth?: number // 点的半径
	opacity?: number // 透明度
	zIndex?: number // 层级
	pointRatio?: number // 点的数量与屏幕像素点的比例
}

class CanvasFocusPoint {
	private color: string
	private pointWidth: number
	private opacity: number
	private zIndex: number
	private pointRatio: number
	private canvas: HTMLCanvasElement | null = null
	private W: number | null = null
	private H: number | null = null
	private mouse: Mouse
	private points: Point[] = []
	private animationId: number | null = null
	constructor(params: Params) {
		this.color = params.color!
		this.pointWidth = params.pointWidth!
		this.opacity = params.opacity!
		this.zIndex = params.zIndex!
		this.pointRatio = params.pointRatio!
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
		this.points = Array(Math.floor(this.W * this.H * this.pointRatio))
		for (let i = 0; i < this.points.length; i++) {
			this.points[i] = new Npoint(null, null, null, null, null)
		}

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
				context.arc(
					i.x! - 0.5,
					i.y! - 0.5,
					this.pointWidth,
					0,
					Math.PI * 2,
					true
				)
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
		if (document.querySelector('#focusPointCanvas')) {
			window.cancelAnimationFrame(this.animationId!)
			document.querySelector('#focusPointCanvas')!.remove()
			window.removeEventListener('resize', this.getWindowWH)
			window.removeEventListener('mousemove', this.mousemoveFunc)
			window.removeEventListener('mouseout', this.mouseoutFunc)
		}
	}
}

export const useFocusPoint = (params: Params = {}) => {
	const canvasFocusPoint = new CanvasFocusPoint({
		color: '#333',
		pointWidth: 1,
		opacity: 1,
		zIndex: -1,
		pointRatio: 0.00008,
		...params
	})
	onMounted(() => {
		canvasFocusPoint.start()
	})
	onBeforeUnmount(() => {
		canvasFocusPoint.close()
	})
}
