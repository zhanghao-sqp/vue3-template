<template>
	<el-breadcrumb>
		<el-breadcrumb-item
			v-for="item in breadcrumbList"
			:key="item.path"
			:to="item.path"
		>
			{{ item.name }}
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbList = computed(() => {
	const { matched } = route
	return matched.map(item => {
		return {
			name: item.meta.title,
			path: item.path
		}
	})
})
</script>
