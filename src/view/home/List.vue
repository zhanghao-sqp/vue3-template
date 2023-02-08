<template>
	<ul v-bottom-out="bottomOut">
		<el-button @click="addLi">添加一个li</el-button>
		<li v-for="(item, index) in list" :key="index + item">{{ item }}</li>
	</ul>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const list = reactive(['a', 'b', 'c'])
const addLi = () => {
	list.push('d' + list.length)
}
const bottomOut = (e: any) => {
	console.log('触底了')
}
</script>

<style scoped lang="scss">
ul {
	max-height: 200px;
	padding-top: 10px;
	background-color: burlywood;
	overflow: auto;
	li {
		list-style: none;
		padding: 10px;
		border: 1px solid #ccc;
		margin-bottom: 10px;
		background-color: cornflowerblue;
	}
}
</style>
