<template>
	<h2>login</h2>
	<router-link to="/">去首页</router-link>
	<br />
	<canvas id="canvas" ref="canvasDom" width="600" height="500"></canvas>
	<BigFileUpload />
</template>

<script lang="ts" setup>
import { CanvasFocusPoint } from '@/utils/canvasDraw'
import CanvasDraw from '@/utils/canvasDraw'
import { formatDate } from '@/utils/common/common'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const canvasFocusPoint = new CanvasFocusPoint('#0f8189')
const canvasDom = ref()
onBeforeUnmount(() => {
	canvasFocusPoint.close()
})
onMounted(() => {

	canvasFocusPoint.start()
	const canvasDraw = new CanvasDraw(canvasDom.value)
	canvasDraw.drawLine(20, 20, 50, 20, '#0f0')
		.drawLine(50, 20, 20, 50, '#00f')
		.drawLine(20, 50, 50, 50, '#f00')
		.drawLine(70, 20, 70, 50, '#0f0')
		.drawLine(70, 35, 100, 35, '#00f')
		.drawLine(100, 20, 100, 50, '#f00')
	const nowTime = formatDate(new Date())
	canvasDraw.drawText('张浩 ' + nowTime, 200, 100, '409eff', '20px Arial bold', 'center', 'bottom')
})
</script>

<style scoped lang="scss">
#canvas {
	display: block;
	margin: 0 auto;
	background-color: #eee;
}
</style>
