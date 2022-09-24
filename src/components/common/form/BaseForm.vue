<template>
	<el-form
		ref="formRef"
		:model="formData"
		:rules="rules"
		:inline="inline"
		:size="size"
		:label-suffix="':'"
		:require-asterisk-position="requireAsteriskPosition"
		:status-icon="statusIcon"
		:scroll-to-error="scrollToError"
		:label-width="labelWidth"
		:label-position="labelPosition"
	>
		<el-form-item
			v-for="item in fields"
			:key="item.prop"
			:label="item.label"
			:prop="item.prop"
		>
			<el-input
				v-if="item.type === 'input'"
				v-model="formData[item.prop]"
				:placeholder="item.placeholder"
				:disabled="item.disabled"
			></el-input>
			<el-select
				v-if="item.type === 'select'"
				v-model="formData[item.prop]"
				:placeholder="item.placeholder"
				:disabled="item.disabled"
			>
				<el-option
					v-for="option in item.options"
					:key="option.value"
					:label="option.label"
					:value="option.value"
				></el-option>
			</el-select>
			<el-radio-group
				v-if="item.type === 'radio'"
				v-model="formData[item.prop]"
				:disabled="item.disabled"
			>
				<el-radio
					v-for="option in item.options"
					:key="option.value"
					:label="option.value"
				>
					{{ option.label }}
				</el-radio>
			</el-radio-group>
			<el-checkbox-group
				v-if="item.type === 'checkbox'"
				v-model="formData[item.prop]"
				:disabled="item.disabled"
			>
				<el-checkbox
					v-for="option in item.options"
					:key="option.value"
					:label="option.value"
				>
					{{ option.label }}
				</el-checkbox>
			</el-checkbox-group>
			<el-date-picker
				v-if="item.type === 'date'"
				v-model="formData[item.prop]"
				type="date"
				:placeholder="item.placeholder"
				:disabled="item.disabled"
			></el-date-picker>

		</el-form-item>
		<el-form-item class="form-operation">
			<el-button type="" @click="resetFields(formRef!)">重置</el-button>
			<el-button type="primary" @click="confirm(formRef!)">确认</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormItemRule, FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash'

export type Model = Record<string, any>
export type FieldsOption = Array<{
	prop: keyof Model  // 属性名
	label: string  // 标签名
	type: 'input' | 'number' | 'select' | 'radio' | 'checkbox' | 'date' | 'upload'  // 类型
	placeholder?: string  // 占位符
	options?: Array<{
		label: string  // 选项名
		value: string | number  // 选项值
	}>
	disabled?: boolean  // 是否禁用
}>
type Arrayable<T> = T | T[]; // 可以是数组也可以是单个值
const { model } = withDefaults(defineProps<{
	model: Model  // 表单数据
	fields: FieldsOption  // 表单配置
	rules?: Partial<Record<string, Arrayable<FormItemRule>>>  // 表单验证规则
	inline?: boolean  // 行内表单模式
	size?: 'default' | 'large' | 'small'  // 表单尺寸
	labelSuffix?: string  // 表单域标签的后缀
	requireAsteriskPosition?: 'right' | 'left'  // 必填字段的标签旁边的红色星号位置
	statusIcon?: boolean  // 是否在输入框中显示校验结果反馈图标
	scrollToError?: boolean  // 是否在第一个校验规则不通过时，滚动到该表单域
	labelWidth?: string  // 表单域标签的的宽度
	labelPosition?: 'left' | 'right' | 'top'  // 表单域标签label位置
}>(), {
  rules: {} as any,
	inline: false,
	size: 'default',
	labelSuffix: ':',
	requireAsteriskPosition: 'right',
	statusIcon: true,
	scrollToError: true,
	labelWidth: 'auto',
	labelPosition: 'right'
})
const emit = defineEmits<{
	(event: 'confirm', data: Model): void // 确认事件
}>()
const formRef = ref<FormInstance>()
const formData = reactive(cloneDeep(model))
const resetFields = (instance: FormInstance) => {
	instance.resetFields()
}
const confirm = (instance: FormInstance) => {
	instance.validate((valid: boolean) => {
		if (!valid) return
    emit('confirm', formData)
	})
}
</script>

<style scoped lang="scss">
.form-operation {
	@extend %flex-center;
	:deep(.el-form-item__content) {
		@extend %flex-center;
		.el-button {
			margin-left: 2rem;
		}
	}
}
</style>
