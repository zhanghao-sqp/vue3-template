<template>
	<vue3-json-excel
		ref="excel"
		type="xls"
		:class="dialog ? 'hidden' : ''"
		:json-data="jsonData"
		:fields="excelFields"
		:name="form.name + '.xls'"
		:header="form.header"
		:footer="footer"
	>
		<slot>
			<el-button type="primary" :size="size">导出</el-button>
		</slot>
	</vue3-json-excel>
	<span v-if="dialog">
		<el-button type="primary" :size="size" @click="dialogVisible = true">导出</el-button>
		<el-dialog
			custom-class="custom-export-dialog"
			v-model="dialogVisible"
			:close-on-click-modal="false"
			append-to-body
			center
		>
			<el-form :model="form">
				<el-form-item label="文件名称" label-width="80px">
					<el-input v-model="form.name" width="100px" />
				</el-form-item>
				<el-form-item label="表头" label-width="80px">
					<el-input v-model="form.header" width="100px" />
				</el-form-item>
				<el-form-item label="文件类型" label-width="80px">
					<el-select disabled placeholder=".xls" value="1">
						<el-option label=".xls" value="1"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="download">导出</el-button>
				</span>
			</template>
		</el-dialog>
	</span>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Vue3JsonExcel } from 'vue3-json-excel'

interface Option {
	jsonData: object[] // 需要导出的数据
	excelFields: object // 需要导出的字段 {'姓名': 'name'}
}
const { option, dialog } = withDefaults(
	defineProps<{
		option: Option
    dialog?: boolean
    size?: string
	}>(),
	{ dialog: false, size: 'default'}
)
const { jsonData, excelFields } = option
const form = reactive({
	name: '表格数据',
	header: ''
})
const footer = ref<string>('')
let excel = ref(null)
const dialogVisible = ref(false)
const download = () => {
  (<any>excel.value).$el.click()
  dialogVisible.value = false
}

</script>

<style lang="scss">
@import '@var';
.hidden {
	display: inline-block;
	width: 0;
	visibility: hidden;
}
.custom-export-dialog {
	width: 350px;
	margin-top: 30vh;
	.el-form {
		width: 290px;
	}
}
</style>
