<template>
	<span>home</span>
	<router-link to="/login">去登录页</router-link>
	<UseDarkSwitch></UseDarkSwitch>
	<UseExportExcel></UseExportExcel>
	<OlMap style="width: 90%; height: 800px; margin: 0 auto;"></OlMap>
</template>

<script setup lang="ts">
import UseExportExcel from '@/components/common/example/useExportExcel.vue';
console.log(123)
</script>

<style scoped lang="scss"></style>
