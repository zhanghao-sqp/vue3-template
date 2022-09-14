<template>
	<el-menu
		:active-text-color="activeTextColor"
		:background-color="mainColor"
		:default-active="'1'"
		class="el-menu-demo"
		mode="horizontal"
		text-color="#fff"
	>
		<el-menu-item index="1">Processing Center</el-menu-item>
		<el-sub-menu index="2">
			<template #title>Workspace</template>
			<el-menu-item index="2-1">item one</el-menu-item>
			<el-menu-item index="2-2">item two</el-menu-item>
			<el-menu-item index="2-3">item three</el-menu-item>
			<el-sub-menu index="2-4">
				<template #title>item four</template>
				<el-menu-item index="2-4-1">item one</el-menu-item>
				<el-menu-item index="2-4-2">item two</el-menu-item>
				<el-menu-item index="2-4-3">item three</el-menu-item>
			</el-sub-menu>
		</el-sub-menu>
		<el-menu-item index="3" disabled>Info</el-menu-item>
		<el-menu-item index="4">Orders</el-menu-item>
	</el-menu>
</template>

<script setup lang="ts">
import {} from 'vue'
import varCss from '@/style/global/var.module.scss'
const mainColor = varCss.mainColor
const activeTextColor = varCss.activeTextColor
</script>

<style scoped lang="scss"></style>
