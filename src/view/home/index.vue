<template>
	<span>home</span>
	<router-link to="/login">去登录页</router-link>
	<!-- <UseDarkSwitch></UseDarkSwitch>
	<UseExportExcel></UseExportExcel>
	<OlMap style="width: 90%; height: 800px; margin: 0 auto;"></OlMap> -->
	<div id="parallax" style="position: relative;">
		<div style="position: absolute; left: 0; top: 18px;">
			<img src="../../../public/picture.jpg" alt="" />
		</div>
		<div style="position: absolute; left: 500px; top: 50px;">
			<img src="../../../public/rain.png" alt="" />
		</div>
		<div style="padding-top: 1500px;">
			<div v-appear="appearFn" style="height: 200px; background-color: red;"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
// import { parseDate } from '@/utils/common/common'
// console.dir(parseDate('2020-01-01 08:00:00', 'yyyy-MM-dd'))
import { storeToRefs } from 'pinia';
import useCount from '@/store/index'
import { CanvasFocusPoint } from '@/utils/canvasDraw'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { count } = storeToRefs(useCount())
useCount().increment()
console.log(count)
const canvasFocusPoint = new CanvasFocusPoint('#ff0000', 2, 1)

const appearFn = () => {
	alert('出现了')
}
onMounted(() => {
	canvasFocusPoint.start()
})
onBeforeUnmount(() => {
	canvasFocusPoint.close()
})
</script>

<style scoped lang="scss"></style>
