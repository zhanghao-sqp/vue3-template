<template>
	<span>home</span>
	<UseDarkSwitch></UseDarkSwitch>
	<UseBaseTable />
	<UseExportExcel />
	<el-input style="width: 100px" v-model="value"></el-input>
	<transition name="el-zoom-in-top">
		<el-select v-show="value == 'Option1'" v-model="value" placeholder="Select">
			<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			/>
		</el-select>
	</transition>

	<el-select v-model="value" class="m-2" placeholder="Select">
		<el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value"
		/> </el-select
	><br />
	<el-select v-model="value" class="m-2" placeholder="Select">
		<el-option
			v-for="(item, i) in options2"
			:key="i"
			:label="item.label"
			:value="item.value"
		/>
	</el-select>
	<UseRichTextEditor />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const value = ref('导出')
const getTime = () => {
	const date = new Date()
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const options = [
	{
		value: 'Option1',
		label: 'Option1fsdgdgddsssdgsdgsdgsddgsdg'
	},
	{
		value: 'Option2',
		label: 'Option2'
	},
	{
		value: 'Option3',
		label: 'Option3'
	}
]
interface Option {
	label: string
	value: string
}
const options2: Option[] = []
</script>

<style scoped lang="scss"></style>
