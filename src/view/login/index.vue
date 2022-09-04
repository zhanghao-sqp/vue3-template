<template>
	<h2>login</h2>
	<router-link to="/">去首页</router-link>
	<br />
	<canvas id="canvas" ref="canvasDom" width="600" height="500"></canvas>
	<BigFileUpload />
</template>

<script lang="ts" setup>
import CanvasDraw from '@/utils/canvasDraw'
import { useTime } from '@/hooks'
import { randomColor } from '@/utils/common'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasDom = ref()
const animationId = ref()
const { hour, minute, second } = useTime()
const init = () => {
	const canvasDraw = new CanvasDraw(canvasDom.value)
	const render = () => {
	animationId.value = requestAnimationFrame(render as unknown as FrameRequestCallback)
	canvasDraw.clear()
	canvasDraw.drawLine(20, 20, 50, 20, randomColor('rgb'))
		.drawLine(50, 20, 20, 50, randomColor('rgb'))
		.drawLine(20, 50, 50, 50, randomColor('hex'))
		.drawLine(70, 20, 70, 50, randomColor('hsl'))
		.drawLine(70, 35, 100, 35, randomColor('hsl'))
		.drawLine(100, 20, 100, 50, randomColor('hsl'))
	canvasDraw.drawText('张浩 ' + `${hour.value}:${minute.value}:${second.value}`,
		200, 100, '409eff', '20px Arial bold', 'center', 'bottom')

}
	render()
}

onMounted(() => {
	init()
})
onBeforeUnmount(() => {
	cancelAnimationFrame(animationId.value)
})
</script>

<style scoped lang="scss">
#canvas {
	display: block;
	margin: 0 auto;
	background-color: #eee;
}
h2 {
	color: $main-color;
}
</style>
