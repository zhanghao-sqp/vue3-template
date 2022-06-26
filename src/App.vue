<template>
  <el-config-provider :locale="zhCn">
    <HelloWorld />
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import HelloWorld from './components/HelloWorld.vue'
</script>

<style scoped lang="scss">

</style>
