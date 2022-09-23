<template>
	<el-form
		ref="formRef"
		:model="formData"
		:rules="rules"
		:inline="false"
		:size="'default'"
		:label-suffix="':'"
		:require-asterisk-position="'right'"
		:status-icon="true"
		:scroll-to-error="true"
		:label-width="'auto'"
		:label-position="'right'"
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
			></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="" @click="resetFields(formRef!)">重置</el-button>
			<el-button type="primary" @click="confirm(formRef!)">确认</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { ElForm, FormItemRule, FormInstance } from 'element-plus'

export type Model = Record<string, any>
export type FieldsOption = Array<{
	prop: keyof Model  // 属性名
	label: string  // 标签名
	type: 'input' | 'number' | 'select' | 'date' | 'upload'  // 类型
	placeholder?: string  // 占位符
	options?: Array<{
		label: string  // 选项名
		value: string  // 选项值
	}>
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
	labelPosition?: 'left' | 'right'  // 表单域标签label向左右对齐
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
const formRef = ref<FormInstance>()
const formData = computed(() => model)
const resetFields = (instance: FormInstance) => {
	instance.resetFields()
}
const confirm = (instance: FormInstance) => {
	instance.validate((valid: boolean) => {
		if (!valid) return
    // emits('confirm', formData.value)
	})
}
</script>

<style scoped lang="scss"></style>
