<template>
	<el-menu :default-active="currentName" :mode="mode">
	  <LayoutComponentsMenuItem :menuList="menuList" />
	</el-menu>
</template>

<script lang="ts" setup>
export type MenuList = Array<{
  path: string
  name: string
  meta: {
    title: string
    icon?: string
  }
  children?: MenuList
}>
withDefaults(defineProps<{
  mode?: 'vertical' | 'horizontal'
  currentName: string
  menuList: MenuList
}>(), {
  mode: 'vertical',
  currentName: 'default',
  menuList: () => ([{
    path: 'default',
    name: 'default',
    meta: {
      title: '未获取到数据',
      icon: 'WarningFilled'
    }
  }])
})

</script>

<style scoped lang="scss">
</style>
