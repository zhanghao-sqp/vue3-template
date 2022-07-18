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
