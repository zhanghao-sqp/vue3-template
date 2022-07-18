<template>
	<span>home</span>
	<router-link to="/login">去登录页</router-link>
	<!-- <UseDarkSwitch></UseDarkSwitch>
	<UseExportExcel></UseExportExcel>
	<OlMap style="width: 90%; height: 800px; margin: 0 auto;"></OlMap> -->
</template>

<script setup lang="ts">
import { parseDate } from '@/utils/common/common'
console.dir(parseDate('2020-01-01 08:00:00', 'yyyy-MM-dd'))
</script>

<style scoped lang="scss"></style>
