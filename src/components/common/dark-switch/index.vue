<template>
  <el-switch
    :size="size"
    inline-prompt
    active-text="深色"
    inactive-text="浅色"
    v-model="val"
    @change="toggleDark()"
  >
  </el-switch>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue';

withDefaults(
  defineProps<{
    size?: 'large' | 'default' | 'small'
  }>(),
  { size: 'default' }
)
const colorScheme = localStorage.getItem('vueuse-color-scheme')
const val = ref(colorScheme === 'auto')
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
