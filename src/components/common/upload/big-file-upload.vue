<template>
	<input
		class="file-upload-input"
		type="file"
		ref="fileUploadInputRef"
		@change="change"
	/>
	<el-button type="primary" :size="size" @click="uploadFile">上传</el-button>
	<transition name="el-fade-in-linear">
		<el-progress v-show="showProgress" :percentage="percent" />
	</transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export type Size = '' | 'small' | 'default' | 'large' | undefined
withDefaults(
	defineProps<{
		uploadUrl?: string
		size?: Size
	}>(),
	{
		uploadUrl: '',
		size: 'default'
	}
)
const fileUploadInputRef = ref<HTMLInputElement>()
const showProgress = ref(false)
const percent = ref(0)

const uploadFile = () => {
	fileUploadInputRef.value?.click()
}
const change = async (e: Event) => {
	let chunkSize = 1024 * 1024 * 2 // 切片大小2M
	const target = e.target as HTMLInputElement
	if (target.files?.length) {
		showProgress.value = true
		const file = target.files[0]
		const { name, size, type } = file
		let start = 0,
			index = 0
		while (start < size) {
			let blob = null
			if (size - start > chunkSize) {
				blob = file.slice(start, start + chunkSize)
			} else {
				blob = file.slice(start, size)
			}
			start += chunkSize
			// let blobFile = new File([blob], `${index}.${type}`, { type })
			let blobFile = new File([blob], name)
			let formData = new FormData()
			formData.append('file', blobFile)
			formData.append('index', index.toString())
			formData.append('name', name)
			formData.append('size', size.toString())
			formData.append('type', type)
			index++
			// 发送请求
			// await axios.post('/upload', formData)
			percent.value = Number(((start / size) * 100).toFixed(2))
			if (percent.value >= 100) {
				percent.value = 100
				setTimeout(() => {
					showProgress.value = false
				}, 1000)
			}
		}
	}
}
</script>

<style scoped lang="scss">
.file-upload-input {
	width: 0;
	height: 0;
	visibility: hidden;
}
</style>
