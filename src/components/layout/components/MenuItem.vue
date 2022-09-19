<template>
  <template v-for="menu in menuList" :key="menu.name">
    <!-- 有子项 -->
    <el-sub-menu
      v-if="menu.children && menu.children.length"
      :index="menu.name"
      :popper-offset="6"
      :show-timeout="0"
      :hide-timeout="100"
    >
      <template #title>
        <component class="icon" :is="menu.meta.icon" />
        <span class="menu-item-title">{{ menu.meta.title }}</span>
      </template>
      <LayoutComponentsMenuItem :menuList="menu.children"></LayoutComponentsMenuItem>
    </el-sub-menu>
    <!-- 无子项 -->
    <el-menu-item v-else :index="menu.name">
      <template #title>
        <component class="icon" :is="menu.meta.icon" />
        <span class="menu-item-title">{{ menu.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts" name="LayoutComponentsMenuItem">
import type { MenuList } from './Menu.vue'

defineProps<{ menuList: MenuList[] }>()
</script>

<style scoped lang="scss">
.icon {
  height: 1.2em;
  width: 1.2em;
  margin-right: 0.4em;
}
</style>