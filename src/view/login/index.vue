<template>
	<h2>login</h2>
	<a @click="removeRoute">removeRoute</a>
	<el-button @click="addRoute">异步加载路由</el-button>
	<CommonFormBaseForm
		:inline="false"
		:model="formData"
		:fields="fields"
		:rules="rules"
		label-position="right"
		@confirm="confirm"
	/>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FieldsOption, Model } from '@/components/common/form/BaseForm.vue'
import { validatePhone, validateEmail } from '@/utils/validate'
import { objDiff } from '@/utils/common'
import { get } from '@/http/axios'
import { generateRoutes } from '@/utils/router'
import { RouteRecordRaw } from 'vue-router'

const router = useRouter()
console.log(router)
const removeRoute = () => {
	router.removeRoute('login')
	console.log(router.getRoutes())
}

const addRoute = async () => {
	const { data } = await get('/asyncRoutes.json', 1, { baseURL: '' })
	const routes = generateRoutes(data)
	console.log(router.getRoutes())
	routes.forEach((route: RouteRecordRaw) => {
		router.addRoute(route)
	})
	console.log(router.getRoutes())
}


const formData: Model = reactive({
	username: '123',
	phone: '15723208056',
	password: '123456789',
	email: '1668471805@qq.com',
	select: '',
})
const rules = {
	phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
	email: [{ required: true, validator: validateEmail, trigger: 'blur' }],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
	]
}
const selectOptions = ref<Array<{label: string, value: string | number}>>([])
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
const confirm = (data: Model) => {
	console.log(objDiff(formData, data))
}
</script>

<style scoped lang="scss"></style>
