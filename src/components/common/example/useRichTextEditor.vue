<template>
	<Editor @get-content="getContent" :content="content ? content : ''"></Editor>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Editor from '@components/common/rich-text-editor/index.vue'

const content = ref(`<h1>我是标题</h1>`)
const getContent = (text: string) => {
	// console.log(text)
	content.value = text
}
</script>
