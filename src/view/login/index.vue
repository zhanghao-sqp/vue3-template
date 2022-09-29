<template>
	<div class="login-layout">
		<div class="login-form">
			<CommonFormBaseForm
				:inline="false"
				:model="formData"
				:fields="fields"
				:rules="rules"
				label-width="auto"
				@confirm="confirm"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { useFocusPoint } from '@/hooks/useFocusPoint'
import type { FieldsOption, Model } from '@/components/common/form/BaseForm.vue'
import { validatePhone, validateEmail } from '@/utils/validate'
import { objDiff } from '@/utils/common'
import { get } from '@/http/axios'
import { generateRoutes } from '@/utils/router'

const router = useRouter()
console.log(router)
const removeRoute = () => {
	router.removeRoute('login')
	console.log(router.getRoutes())
}

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

setTimeout(() => {
	let options = [
		{ label: '选项1', value: 1 },
		{ label: '选项2', value: 2 },
		{ label: '选项3', value: 3 }
	]
	selectOptions.value.push(...options)
}, 3000)
const confirm = async (form: Model) => {
	console.log(objDiff(formData, form))
	const { data } = await get('/asyncRoutes.json', 1, { baseURL: '' })
	const routes = generateRoutes(data)
	console.log(router.getRoutes())
	routes.forEach((route: RouteRecordRaw) => {
		router.addRoute(route)
	})
	router.push('/home')
	console.log(router.getRoutes())
}

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
	ElMessageBox.confirm('Are you sure to close this dialog?')
		.then(() => {
			done()
		})
		.catch(() => {
			// catch error
		})
}

onMounted(() => {
	useFocusPoint({ color: 'red', pointRatio: 0.00001 })
})
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
