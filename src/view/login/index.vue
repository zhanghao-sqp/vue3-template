<template>
	<h2>login</h2>
	<CommonFormBaseForm :model="formData" :fields="fields" :rules="rules"/>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FieldsOption, Model } from '@/components/common/form/BaseForm.vue'
import { validatePhone, validateEmail } from '@/utils/validate';
const formData: Model = reactive({
	username: '123',
	password: ''
})
const rules = {
	phone: [
		{ required: true, validator: validatePhone, trigger: 'blur' }
	],
	email: [
		{ required: true, validator: validateEmail, trigger: 'blur' }
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
	]
}
const fields: FieldsOption = [
	{
		prop: 'username',
		label: '用户名',
		type: 'input',
		placeholder: '请输入用户名'
	},
	{
		prop: 'phone',
		label: '手机号',
		type: 'input',
		placeholder: '请输入手机号'
	},
	{
		prop: 'email',
		label: '邮箱',
		type: 'input',
		placeholder: '请输入邮箱'
	},
	{
		prop: 'password',
		label: '密码',
		type: 'input',
		placeholder: '请输入密码'
	},
]
</script>

<style scoped lang="scss"></style>
