<template>
	<div class="login-layout">
		<div class="login-form">
			<CommonFormBaseForm
				ref="loginForm"
				:inline="false"
				:model="formData"
				:fields="fields"
				:rules="rules"
				label-width="80px"
			>
				<el-button type="primary" @click="confirm">登录</el-button>
			</CommonFormBaseForm>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useFocusPoint } from '@/hooks/useFocusPoint'
import type { FieldsOption, Model } from '@/components/common/form/BaseForm.vue'
import { validatePhone, validateEmail } from '@/utils/validate'
import { Md5 } from 'ts-md5'
import { objDiff } from '@/utils/common'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

const router = useRouter()
const userStore = useUserStore()
const { token } = storeToRefs(userStore)
const formData: Model = reactive({
	username: '123',
	phone: '15723208056',
	password: '123456789',
	email: '1668471805@qq.com',
	select: ''
})
const rules = {
	phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
	email: [{ required: true, validator: validateEmail, trigger: 'blur' }],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
	]
}
const selectOptions = ref<Array<{ label: string; value: string | number }>>([])
const fields: FieldsOption = reactive([
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
	{
		prop: 'select',
		label: '选项',
		type: 'select',
		placeholder: '请选择',
		options: selectOptions.value
	}
])
const loginForm = ref()

setTimeout(() => {
	let options = [
		{ label: '选项1', value: 1 },
		{ label: '选项2', value: 2 },
		{ label: '选项3', value: 3 }
	]
	selectOptions.value.push(...options)
}, 3000)
const confirm = async () => {
	loginForm.value.confirm().then((res: false | Model) => {
		if (!res) return
		console.log(objDiff(formData, res))
		console.log('password', Md5.hashStr(res.password))
		console.log('md5', Md5.hashStr(''))
		userStore.$state.token = '改变了'
		router.push('/')
	}).catch((err: any) => err)
}
useFocusPoint({ color: '#0f0' })
</script>

<style scoped lang="scss">
.login-layout {
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	// 背景颜色渐变
	background: linear-gradient(to bottom, #e4777bd2, #b90c7cb7 99%);
	.login-form {
		padding: 20px;
		width: 400px;
		transform: translateY(-10vh);
		background-color: #05bbaf;
		border: rgba(255, 255, 255, 0.664) 1px solid;
		border-radius: 20px;
		box-shadow: 0 0 20px 0 rgb(0 237 242);
	}
}
</style>
