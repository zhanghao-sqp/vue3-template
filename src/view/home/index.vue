<template>
	<span>count：{{ count }}</span>
	<el-button type="primary" @click="resetCount">重置count</el-button>
	<router-link to="/login">去登录页1234</router-link>
	<!-- <UseDarkSwitch></UseDarkSwitch>
	<UseExportExcel></UseExportExcel>
	<OlMap style="width: 90%; height: 800px; margin: 0 auto;"></OlMap> -->
	<div id="parallax">
		<!-- <div style="position: absolute; left: 0; top: 18px;">
			<img src="../../../public/picture.jpg" alt="" />
		</div>
		<div style="position: absolute; left: 500px; top: 50px;">
			<img src="../../../public/rain.png" alt="" />
		</div> -->
		<UploadTable :fileTypes="['zip','docx','png']"></UploadTable>
		<!-- <div
			v-focus
			v-droppable
			v-throttle="{fn: (e: Event)=>appearFn(1, e), event: 'mousemove' }"
			style="
				width: 300px;
				height: 200px;
				background-color: cornflowerblue;
				left: 100px;
				top: 300px;
				position: absolute;
			"
		>
			<input type="text">
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useCount from '@/store/index'
// import WS from '@/http/WS'
import { CanvasFocusPoint } from '@/utils/canvasDraw'
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'

// const ws = new WS('ws://121.40.165.18:8800', {
// 	onmessage: (e: any) => {
// 		console.log('ws message', e)
// 	},
// })
const value = ref('2021-10-29')
const store = useCount()
const { count } = storeToRefs(store) // 直接解构会失去响应式，配合storeToRefs使用
store.increment()
const resetCount = () => {
	store.$reset()
}

const canvasFocusPoint = new CanvasFocusPoint('#ff0000', 2, 1)

const flag = ref(true)
setTimeout(() => {
	store.increment()
	count.value++
	flag.value = false
}, 3000)
const appearFn = (num: number, e: Event) => {
	count.value += num
}
onMounted(() => {
	canvasFocusPoint.start()

})
onBeforeUnmount(() => {
	canvasFocusPoint.close()
})
</script>

<style scoped lang="scss"></style>
