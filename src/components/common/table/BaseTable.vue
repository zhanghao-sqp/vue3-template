<template>
	<el-table ref="table" v-loading="loading" :data="data" border>
		<el-table-column label="id" prop="id"></el-table-column>
		<el-table-column label="姓名" prop="name"></el-table-column>
		<el-table-column label="年龄" prop="age"></el-table-column>
	</el-table>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, ComponentInternalInstance } from 'vue'

interface ColumnOption {
	id: string
	prop: string
	label: string
	align?: string
	width?: number
	render?: Function
	defineColumn?: boolean
}

const { data = [] } = defineProps<{
	data: ColumnOption[]
	likes?: number
}>()

const loading = ref(false)

const instance: ComponentInternalInstance | null = getCurrentInstance()
defineExpose({ instance })
</script>

<style scoped lang="scss"></style>
