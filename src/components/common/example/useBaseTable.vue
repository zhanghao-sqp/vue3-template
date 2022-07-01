<template>
	<BaseTable style="width: 60%" :data="tableData" :column="column">
		<template #age="{ row }">
			<span>我今年{{row.age}}</span>
		</template>
		<template #operation="{ row }">
			<el-button type="warning" @click="clickBtn(row.name)">点击</el-button>
		</template>
	</BaseTable>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import BaseTable from '@components/common/table/BaseTable.vue'

const { tableData } = reactive({
	tableData: [
		{ id: 1, name: 'z', age: '17', render: 1 },
		{ id: 2, name: 'x', age: '18', render: 2 },
		{ id: 3, name: 'y', age: '19' }
	]
})

const column = reactive([
	{ label: 'id', prop: 'id' },
	{ label: '姓名', prop: 'name' },
	{ label: '年龄', prop: 'age', defineColumn: true },
	{
		label: '渲染值',
		prop: 'render',
		render: (val: number | undefined) => `我是${val}`
	},
	{ label: '弹窗', defineColumn: true }
])
const clickBtn = (msg: string) => {
	alert(msg)
}
</script>
