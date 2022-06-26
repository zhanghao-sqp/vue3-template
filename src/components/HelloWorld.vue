<template>
	<h1 class="h">{{ msg }}</h1>
	<el-button type="primary" :icon="Apple">123</el-button>
	<el-icon>
		<i-ep-View />
	</el-icon>
	<img src="@/assets/image/logo.png" alt="" />
	<img :src="imgSrc" alt="" />
	<el-date-picker
		v-model="value1"
		type="date"
		placeholder="请选择日期"
		:default-value="new Date(2010, 0, 1)"
		@change="changeDate"
	/>
	<div style="width: 100%; height: 80vh; background: #333"></div>
	<div ref="div" style="text-align: center; font-size: 30px; color: orange">
		555
	</div>
	<BaseTable ref="studentTable" :data="tableData"></BaseTable>
	<el-button type="primary" @click="download">导出</el-button>
	<Editor @getContent="getContent" :content="content ? content : ''"></Editor>
</template>

<script setup lang="ts">
import {
	ComponentInternalInstance,
	getCurrentInstance,
	onMounted,
	reactive,
	ref
} from 'vue'
import BaseTable from '@components/common/table/BaseTable.vue'
import Editor from '@components/common/rich-text-editor/index.vue'
import imgSrc from '@assets/image/logo.png'
import { Apple } from '@element-plus/icons-vue'
import useStore from '@/store'
import Observer from '@/utils/Observer'

const proxy: ComponentInternalInstance | null = getCurrentInstance()

const { tableData } = reactive({
	tableData: [
		{ id: 1, name: 'z', age: '17' },
		{ id: 2, name: 'x', age: '18' },
		{ id: 3, name: 'y', age: '19' }
	]
})

const msg = ref('Hello World')
const value1 = ref('')
const changeDate = () => {
	store.increment()
	console.log(store.count)
}
const store = useStore()
const download = () => {
	const table = proxy?.refs['studentTable']
	console.log((table as any).$el)
	// exportExcel((<Element>table), '测试')
}
const content = ref(`<h1>我是标题</h1>`)
const getContent = (text: string) => {
	console.log(text)
	content.value = text
}

onMounted(() => {
	const domList: Element[] = [<Element>proxy?.refs['div']]
	const random = ['牛逼', '好看', '谢谢', '申请', '生气']
	const callback = (el: Element) => {
		let text = random[Math.round(Math.random() * 4)]
		setTimeout(() => {
			el.innerHTML = text
		}, 1000)
	}
	const observer = new Observer(domList, callback, true)
	observer.start()
})
</script>

<style scoped lang="scss">
@import '@var';
.h {
	color: $main-color;
	background: url('@assets/image/logo.png');
}
</style>
