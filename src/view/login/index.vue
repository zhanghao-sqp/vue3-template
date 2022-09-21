<template>
	<h2>login</h2>
	<el-form
		ref="formRef"
		:model="formData"
		:rules="rules"
		:inline="false"
		:size="'default'"
		:label-suffix="': '"
		:require-asterisk-position="'right'"
		:status-icon="true"
		:scroll-to-error="true"
		:label-width="'auto'"
		:label-position="'right'"
	>
		<el-form-item
			v-for="item in formItems"
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
			<el-button type="primary" @click="submit">提交</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const formRef = ref()
const formData = reactive({
	username: '123',
	password: ''
})
const rules = {
	username: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
	],
	password: [
		{ required: false, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
	]
}
interface P {
	prop: keyof typeof formData
	label: string
	type: string
	placeholder: string
	options?: Array<{ label: string; value: string }>
}
const formItems: P[] = [
	{
		prop: 'username',
		label: '用户名123',
		type: 'input',
		placeholder: '请输入用户名'
	},
	{
		prop: 'password',
		label: '密码',
		type: 'input',
		placeholder: '请输入密码'
	},
	{
		prop: 'username',
		label: '用户名123',
		type: 'input',
		placeholder: '请输入用户名'
	},
	{
		prop: 'password',
		label: '密码',
		type: 'input',
		placeholder: '请输入密码'
	},
	{
		prop: 'username',
		label: '用户名123',
		type: 'input',
		placeholder: '请输入用户名'
	},
	{
		prop: 'password',
		label: '密码',
		type: 'input',
		placeholder: '请输入密码'
	}
]
const submit = () => {
	// formRef.value.resetFields()
	formRef.value.validate((valid: boolean) => {
		if (valid) {
			console.log('submit!')
		} else {
			console.log('error submit!!')
			return false
		}
	})
}
</script>

<style scoped lang="scss"></style>
