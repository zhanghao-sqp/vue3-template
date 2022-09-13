<template>
  <el-icon
    :size="size!"
    @click="toggleDark(); val=!val"
  >
    <IEpMoon v-if="val"></IEpMoon>
    <IEpSunny v-else></IEpSunny>
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
