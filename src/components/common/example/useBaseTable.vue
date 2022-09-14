<template>
	<CommonTableBaseTable style="width: 60%" :data="tableData" :column="column">
		<template #age="{ row }">
			<span>我今年{{row.age}}</span>
		</template>
		<template #operation="{ row }">
			<el-button type="warning" @click="clickBtn(row.name)">点击</el-button>
		</template>
	</CommonTableBaseTable>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { ColumnOption } from '@/components/common/table/BaseTable.vue'

const { tableData } = reactive({
	tableData: [
		{ id: 1, name: 'z', age: '17', render: 1 },
		{ id: 2, name: 'x', age: '18', render: 2 },
		{ id: 3, name: 'y', age: '19' }
	]
})

const column: ColumnOption[] = reactive([
	{ label: 'id', prop: 'id' },
	{ label: '姓名', prop: 'name' },
	{ label: '年龄', prop: 'age', defineColumn: 'age' },
	{
		label: '渲染值',
		prop: 'render',
		render: (val: number | undefined) => `我是${val}`
	},
	{ label: '弹窗', defineColumn: 'operation' }
])
const clickBtn = (msg: string) => {
	alert(msg)
}
</script>
