<template>
	<LayoutComponentsMenu mode="horizontal" :menuList="menuList" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { MenuList } from './Menu.vue'
// 从路由中获取，这里模拟数据
const menuList = reactive<MenuList[]>([
	{
		path: '/home',
		meta: {
			title: '首页',
			icon: 'HomeFilled'
		}
	},
	{
		path: '/about',
		meta: {
			title: '关于',
			icon: 'QuestionFilled'
		}
	},
	{
		path: '/user',
		meta: {
			title: '用户',
			icon: 'UserFilled'
		},
		children: [
			{
				path: '/user/list',
				meta: {
					title: '用户列表',
					icon: 'DocumentCopy'
				}
			},
			{
				path: '/user/add',
				meta: {
					title: '添加用户',
					icon: 'Plus'
				}
			}
		]
	}
])
</script>

<style scoped lang="scss"></style>
