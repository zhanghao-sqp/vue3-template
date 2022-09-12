<template>
  <el-icon
    :size="size!"
    @click="toggleDark(); val=!val"
  >
    <i-ep-Moon v-if="val"></i-ep-Moon>
    <i-ep-Sunny v-else></i-ep-Sunny>
  </el-icon>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue';

withDefaults(
  defineProps<{
    size?: number | string | null
  }>(),
  { size: null }
)
const colorScheme = localStorage.getItem('vueuse-color-scheme')
const val = ref(colorScheme === 'auto')
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style lang="scss" scoped>
.el-icon {
  cursor: pointer;
}
</style>
