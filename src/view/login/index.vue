<template>
	<h2>login</h2>
	<router-link to="/">去首页</router-link>
	<br />
	<canvas id="canvas" width="600" height="500"></canvas>
</template>

<script lang="ts" setup>
import { CanvasFocusPoint } from '@/utils/canvasDraw'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const canvasFocusPoint = new CanvasFocusPoint('#0f8189')
onBeforeUnmount(() => {
	canvasFocusPoint.close()
})
onMounted(() => {

	canvasFocusPoint.start()
	const canvas: HTMLCanvasElement = document.getElementById(
		'canvas'
	) as HTMLCanvasElement
	const ctx: CanvasRenderingContext2D = canvas.getContext(
		'2d'
	) as CanvasRenderingContext2D
	// 画线
	ctx.beginPath()
	ctx.moveTo(0, 0)
	ctx.lineTo(400, 300)
	ctx.strokeStyle = 'red'
	ctx.lineWidth = 3
	ctx.stroke()
	ctx.closePath()

	ctx.beginPath()
	ctx.moveTo(400, 0)
	ctx.lineTo(0, 300)
	ctx.strokeStyle = 'orange'
	ctx.lineWidth = 3
	ctx.stroke()
	ctx.closePath()

	ctx.closePath()
})
</script>

<style scoped lang="scss">
#canvas {
	display: block;
	margin: 0 auto;
	background-color: #eee;
}
</style>
