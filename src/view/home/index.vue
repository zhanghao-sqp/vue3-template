<template>
	<span>count：{{ count }}</span>
	<el-button type="primary" @click="resetCount">重置count</el-button>
	<span style="padding: 0 20px">
		{{ hour }}:{{ minute }}:{{ second }},周{{ week }}
	</span>
	<router-link to="/login">去登录页</router-link>
	<br />
	<el-button type="primary" @click="loadingTest">加载中状态</el-button>
	<el-button type="primary" @click="loadingTest2">加载中状态百分比</el-button>
	<el-button type="success" @click="confirmTest">提示框</el-button>
	<!-- <UseDarkSwitch></UseDarkSwitch>
	<UseExportExcel></UseExportExcel> -->
	<div id="parallax">
		<!-- <div style="position: absolute; left: 0; top: 18px;">
			<img src="../../../public/picture.jpg" alt="" />
		</div>
		<div style="position: absolute; left: 500px; top: 50px;">
			<img src="../../../public/rain.png" alt="" />
		</div> -->
		<CommonUploadUploadTable
			:fileTypes="['zip', 'docx', 'png', 'doc']"
			url="/api/upload"
			@success-files="successFiles"
		/>
		<div
			v-waves
			style="width: 100%; height: 350px; background-color: cornflowerblue"
			class="custom-loading"
			v-loading="true"
			element-loading-text="加载中···"
			:element-loading-svg="svgLoading"
		></div>
		<!-- <div
			v-focus
			v-droppable
			v-throttle="{fn: (e: Event)=>appearFn(1, e), event: 'mousemove' }"
			style="
				width: 300px;
				height: 200px;
				right: 0;
				top: 300px;
				position: absolute;
			"
		>
			<input type="text" />
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountStore } from '@/store'
// import WS from '@/http/WS'
import { ref } from 'vue'

import { useTime, useFoucsPoint } from '@/hooks'
import { useLoading, useConfirm } from '@/utils/useActions'
import { svgLoading } from '@/utils/svgString'
useFoucsPoint()
const { month, day, hour, minute, second, week } = useTime()

const loadingTest = () => {
	const loading = useLoading('加载中...')
	console.log(loading)
	setTimeout(() => {
		loading.setText('加载完成')
		loading.close()
	}, 3000)
}

const loadingTest2 = () => {
	let percent = 0
	const loading = useLoading(`正在加载 ${percent}%`)
	let timer = setInterval(() => {
		percent += 1
		loading.setText(`正在加载 ${percent}%`)
		if (percent === 100) {
			loading.close()
			clearInterval(timer)
		}
	}, 50)
}
const confirmTest = () => {
	const confirm = useConfirm('确定删除吗？')
	confirm
		.then(() => {
			console.log('确定')
		})
		.catch(() => {
			console.log('取消')
		})
}
const successFiles = (files: object[]) => {
	console.log(files)
}
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
