<template>
	<span>count：{{ count }}</span>
	<el-button type="primary" @click="resetCount">重置count</el-button>
	<span style="padding: 0 20px;">{{hour}}:{{minute}}:{{second}},周{{week}}</span>
	<router-link to="/login">去登录页</router-link>
  <DarkSwitch></DarkSwitch>
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
		<UploadTable
			:fileTypes="['zip','docx','png','doc']"
			url="/api/upload"
		/>
    <div v-waves style="width: 90%;height: 50px;"></div>
		<div
			v-focus
			v-droppable
			v-throttle="{fn: (e: Event)=>appearFn(1, e), event: 'mousemove' }"
			style="
				width: 300px;
				height: 200px;
				background-color: cornflowerblue;
				right: 0;
				top: 300px;
				position: absolute;
			"
		>
			<input type="text">
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCountStore } from '@/store'
// import WS from '@/http/WS'
import { ref } from 'vue'

import { useTime, useFoucsPoint } from '@/hooks';
useFoucsPoint()
const { month, day, hour, minute, second, week } = useTime();
// const ws = new WS('ws://121.40.165.18:8800', {
// 	onmessage: (e: any) => {
// 		console.log('ws message', e)
// 	},
// })
const countStore = useCountStore()
const { count } = storeToRefs(countStore) // 直接解构会失去响应式，配合storeToRefs使用
countStore.increment()
const resetCount = () => {
	countStore.$reset()
}

const flag = ref(true)
setTimeout(() => {
	countStore.increment()
	count.value++
	flag.value = false
}, 3000)
const appearFn = (num: number, e: Event) => {
	count.value += num
}
</script>

<style scoped lang="scss"></style>
