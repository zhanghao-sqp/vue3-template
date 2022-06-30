<template>
	<el-config-provider :locale="zhCn">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style lang="scss">
@import '@var';
// 滚动条样式
::-webkit-scrollbar {
	width: 5px;
}
::-webkit-scrollbar-thumb {
	background: $opacity-hover-color;
	border-radius: 5px;
	:hover {
		cursor: pointer;
	}
}
::-webkit-scrollbar-track {
	background: #ccc;
}
</style>
