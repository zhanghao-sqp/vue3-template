<template>
	<el-table
		ref="table"
		v-loading="loading"
		:data="data"
		:border="border"
		:size="size"
		:fit="fit"
		:height="height!"
		:show-header="showHeader"
		:tooltip-effect="tooltipEffect"
		:empty-text="emptyText"
		@cell-click="cellClick"
		@row-click="rowClick"
		@selection-change="selectionChange"
	>
		<!-- 序号 -->
		<el-table-column
			v-if="index"
			label="序号"
			type="index"
			width="54"
			align="center"
		/>
		<!-- 多选项 -->
		<el-table-column
			v-if="selection"
			type="selection"
			width="40"
			align="center"
		/>
		<!-- 表格项 -->
		<el-table-column
			show-overflow-tooltip
			v-for="(item, index) in column"
			:key="index"
			:prop="item.prop!"
			:label="item.label"
			:align="item.align || 'center'"
			:width="item.width || 'auto'"
		>
			<!-- 渲染值 -->
			<template v-if="item.render" #default="{ row }">
				<span>
					{{item.render!(row[(item.prop as string)], row)}}
				</span>
			</template>
			<!-- 插槽 -->
			<template v-if="item.defineColumn" #default="{ row }">
				<slot :name="item.defineColumn" :row="row" />
			</template>
		</el-table-column>
		<!-- <CommonTableBaseTableColumn :column="column">
			<template v-for="item in column" :key="item.label + Date.now()" #default="{ row }">
				<slot :name="item.defineColumn" :row="row" />
			</template>
		</CommonTableBaseTableColumn> -->
	</el-table>
</template>

<script setup lang="ts">
import { getCurrentInstance, ComponentInternalInstance, ref, onBeforeMount } from 'vue'
export interface TableProps {
	data: Array<Record<string, any>> // 表格数据
	column: ColumnOption[] // 表头配置项
	loading?: boolean // 加载动画
	size?: 'default' | 'large' | 'small' // 表格大小
	showHeader?: boolean // 展示表头
	border?: boolean // 边框
	height?: number | string | null// 高度
	fit?: boolean // 列的宽度是否自动撑开
	emptyText?: string // 没数据时展示的内容
	tooltipEffect?: string // 文字提示
	selection?: boolean // 多选框
	index?: boolean // 序号
}
export interface ColumnOption {
	label: string
	prop?: string | null | undefined
	fixed?: boolean | 'left' | 'right'
	align?: string
	width?: number
	render?: Function
	defineColumn?: string // 具名插槽名称
	children?: ColumnOption[]
}

withDefaults(defineProps<TableProps>(), {
	data: () => [],
	column: () => [],
	loading: false,
	size: 'default',
	showHeader: true,
	border: true,
	height: null,
	fit: true,
	emptyText: '无数据',
	tooltipEffect: 'dark',
	selection: false,
	index: false
})

const emits = defineEmits([
	'cell-click', // 点击表格单元格
	'row-click', // 点击表格行
	'selection-change' // 选择的行
])

// const tableHeight = ref<string | number | null>(null)
// onBeforeMount(() => {
// 	const { height } = getCurrentInstance()!.props
// 	tableHeight.value = height === undefined ? null : (height as string | number)
// })

const cellClick = (
	row: object,
	column: object,
	cell: HTMLElement,
	event: MouseEvent
) => {
	emits('cell-click', row, column, cell, event)
}
const rowClick = (
	row: object,
	column: object,
	cell: HTMLElement,
	event: MouseEvent
) => {
	emits('row-click', row, column, cell, event)
}
const selectionChange = (row: object) => {
	emits('selection-change', row)
}
defineExpose({ instance: getCurrentInstance() })
</script>

<style scoped lang="scss"></style>
