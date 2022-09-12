<template>
	<h2>login</h2>
	<router-link to="/">去首页</router-link>
	<br />
	<canvas id="canvas" ref="canvasDom" width="200" height="80"></canvas>
	<CommonUploadBigFileUpload />
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
	canvasDraw.drawText('张浩 ' + `${hour.value}:${minute.value}:${second.value}`,
		100, 40, randomColor('hex'))
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
