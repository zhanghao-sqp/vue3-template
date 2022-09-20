<template>
	<LayoutComponentsMenu :menuList="menuList" :currentName="currentName" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { MenuList } from './Menu.vue'
// 从路由中获取，这里模拟数据
const menuList = reactive<MenuList[]>([
	{
		path: '/home',
		name: 'Home',
		meta: {
			title: '首页',
			icon: 'HomeFilled'
		}
	},
	{
		path: '/about',
		name: 'About',
		meta: {
			title: '关于',
			icon: 'QuestionFilled'
		}
	},
	{
		path: '/user',
		name: 'User',
		meta: {
			title: '用户',
			icon: 'UserFilled'
		},
		children: [
			{
				path: 'list',
				name: 'UserList',
				meta: {
					title: '用户列表',
					icon: 'DocumentCopy'
				},
				children: [
					{
						path: 'detail',
						name: 'UserDetail',
						meta: {
							title: '用户详情',
							icon: 'Avatar'
						}
					}
				]
			},
			{
				path: 'add',
				name: 'UserAdd',
				meta: {
					title: '添加用户',
					icon: 'Plus'
				}
			}
		]
	}
])
const currentName = 'UserAdd'
</script>

<style scoped lang="scss"></style>
