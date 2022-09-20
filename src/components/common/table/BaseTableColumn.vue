<template>
	<el-table-column
		show-overflow-tooltip
		v-for="(item, index) in column"
		:fixed="item.fixed"
		:key="index"
		:prop="item.prop!"
		:label="item.label"
		:align="item.align || 'center'"
		:width="item.width || 'auto'"
	>
		<!-- 多级表头 -->
		<template v-if="item.children">
			<CommonTableBaseTableColumn :column="item.children">
				<template v-for="child in item.children" :key="child.label + Date.now()" #default="{ row }">
					<slot :name="child.defineColumn" :row="row" />
				</template>
			</CommonTableBaseTableColumn>
		</template>
		<!-- 渲染值 -->
		<template v-if="item.render" #default="{ row }">
			<span>
				{{ item.render!(row[item.prop as string], row) }}
			</span>
		</template>
		<!-- 插槽 -->
		<template v-if="item.defineColumn" #default="{ row }">
			<slot :name="item.defineColumn" :row="row" />
		</template>
	</el-table-column>
</template>

<script setup lang="ts" name="CommonTableBaseTableColumn">
import type { ColumnOption } from './BaseTable.vue'

defineProps<{ column: ColumnOption[] }>()
</script>

<style scoped lang="scss"></style>
