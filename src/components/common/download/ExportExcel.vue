<template>
	<vue3-json-excel
		ref="excel"
		type="xls"
		class="excel"
		:json-data="jsonData"
		:fields="excelFields"
		:name="form.name + form.fileType"
		:header="form.header"
	/>
	<el-button type="primary" :size="size" @click="dialogVisible = true">
		导出
	</el-button>
	<!-- custom-class 已被 废弃，将于版本 2.3.0时移除，请使用class。 -->
	<el-dialog
		class="custom-export-dialog"
		v-model="dialogVisible"
		:close-on-click-modal="false"
		append-to-body
		center
	>
		<el-form :model="form" :rules="rules">
			<el-form-item label="文件名称" prop="name" label-width="80px">
				<el-input v-model="form.name" />
			</el-form-item>
			<el-form-item label="表格标题" label-width="80px">
				<el-input v-model="form.header" :disabled="!form.showHeader">
					<template #prepend>
						<el-switch v-model="form.showHeader"></el-switch>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item label="文件类型" label-width="80px">
				<el-select disabled placeholder=".xls" :value="form.fileType">
					<el-option label=".xls" value=".xls"></el-option>
					<el-option label=".crv" value=".csv"></el-option>
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
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Vue3JsonExcel } from 'vue3-json-excel'

interface Option {
	jsonData: object[] // 需要导出的数据
	excelFields: object // 需要导出的字段 {'姓名': 'name'}
}
const { option, size } = withDefaults(
	defineProps<{
		option: Option
		size?: '' | 'default' | 'large' | 'small' | undefined
	}>(),
	{ size: 'default' }
)
const { jsonData, excelFields } = option
const form = reactive({
	name: '表格数据',
	header: '',
	showHeader: false,
	fileType: '.xls'
})
const rules = {
	name: [{ required: true, message: '文件名称不能为空', trigger: 'blur' }]
}
watch(
	form,
	() => {
		if (!form.showHeader) {
			form.header = ''
		}
	},
	{ deep: true }
)
let excel = ref(null)
const dialogVisible = ref(false)
const download = () => {
	(excel.value as any).$el.click()
	dialogVisible.value = false
}
</script>

<style lang="scss">
.excel {
	display: block;
	width: 0;
	height: 0;
	visibility: hidden;
}

.custom-export-dialog {
	width: 350px;
	margin-top: 30vh;

	.el-form {
		width: 290px;
		.el-input-group__prepend {
			padding: 0 !important;
		}
	}
}
</style>
