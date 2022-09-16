<template>
	<el-menu
		:active-text-color="activeTextColor"
		:background-color="mainColor"
		:default-active="currentPath"
    :mode="mode"
		text-color="#fff"
	>
	  <LayoutComponentsMenuItem :menuList="menuList" />
	</el-menu>
</template>

<script lang="ts" setup>
import varCss from '@style/global/var.module.scss'

export interface MenuList {
  path: string
  meta: {
    title: string
    icon?: string
  }
  children?: MenuList[]
}

const { menuList } = withDefaults(defineProps<{
  mode?: 'vertical' | 'horizontal'
  menuList: MenuList[]
}>(), {
  mode: 'vertical',
  menuList: () => ([{
    path: 'default',
    meta: {
      title: '未获取到数据',
      icon: 'WarningFilled'
    }
  }])
})
const { mainColor, activeTextColor } = varCss

const currentPath = (menuList.length && menuList[0].path) || 'default'

</script>

<style scoped lang="scss">
</style>
