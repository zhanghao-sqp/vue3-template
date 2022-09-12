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
		:header-row-class-name="
			showHeaderColor ? 'define-header' : 'default-header'
		"
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
			<template v-if="item.render" #default="scoped">
				<span>
					{{item.render!(scoped.row[(item.prop as string)], scoped.row)}}
				</span>
			</template>
			<!-- 插槽 -->
			<template v-if="item.defineColumn" #default="scoped">
				<slot :name="item.prop || 'operation'" :row="scoped.row" />
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup lang="ts">
import { getCurrentInstance, ComponentInternalInstance, ref, onBeforeMount } from 'vue'
interface Props {
	data: object[] // 表格数据
	column: ColumnOption[] // 表头配置项
	loading?: boolean // 加载动画
	size?: 'default' | 'large' | 'small' // 表格大小
	showHeader?: boolean // 展示表头
	showHeaderColor?: boolean // 表头颜色
	border?: boolean // 边框
	height?: number | string | null// 高度
	fit?: boolean // 列的宽度是否自动撑开
	emptyText?: string // 没数据时展示的内容
	tooltipEffect?: string // 文字提示
	selection?: boolean // 多选框
	index?: boolean // 序号
}
interface ColumnOption {
	label: string
	prop?: string | null | undefined
	align?: string
	width?: number
	render?: Function
	defineColumn?: boolean
}

withDefaults(defineProps<Props>(), {
	data: () => [],
	column: () => [],
	loading: false,
	size: 'default',
	showHeader: true,
	showHeaderColor: true,
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

const instance: ComponentInternalInstance | null = getCurrentInstance()
defineExpose({ instance })
</script>

<style scoped lang="scss">
.el-table {
	:deep(.el-table__header-wrapper) {
		border: #ccc;
		.define-header {
			color: #fff;
			th {
				background-color: $main-color;
				border-color: #aaa;
			}
		}
		.default-header {
			color: $main-color;
			th {
				background-color: #f1f1f1;
				border-color: #ddd;
			}
		}
	}
}
</style>
