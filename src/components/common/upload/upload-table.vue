<template>
	<div class="upload-table-container">
		<file-upload
			ref="upload"
			:post-action="url"
			:multiple="multiple"
			:size="size"
			:accept="accept"
			v-model="files"
			@input-filter="inputFilter"
			@input-file="inputFile"
		/>
		<div class="upload-file-operation">
			<el-button type="primary" @click="addFile">
				<IEpCirclePlus />&nbsp;添加
			</el-button>
			<el-button
				v-if="files.length && filesStatus !== '正在上传' && filesStatus !== '上传完成'"
				type="primary"
				@click.prevent="upload!.active = true"
			>
			<IEpUploadFilled />&nbsp;上传
			</el-button>
			<el-button
				v-if="filesStatus === '正在上传'"
				type="warning"
				@click.prevent="upload!.active = false"
			>
				<IEpVideoPause />&nbsp;取消上传
			</el-button>
		</div>
		<CommonTableBaseTable :data="files" :column="tableColumn" emptyText="请添加上传文件">
			<template #name="{ row }">
				<div class="upload-file-name">
					<img
						v-if="getIconByFileType(row.type)"
						:src="(getIconByFileType(row.type) as string)"
					/>
					<el-image 
						v-else
						preview-teleported
						title="图片预览"
						:src="row.blob"
						:preview-src-list="[row.blob]"
					/>
					<el-link v-download:[row.name]="row.blob">{{ row.name }}</el-link>
				</div>
			</template>
			<template #progress="{ row }">
				<div class="upload-state">
					<el-tag size="small" type="info"
					>
						{{ getFileStatus(row) }}
					</el-tag>
					<el-progress
						v-show="getFileStatus(row) === '正在上传'"
						:percentage="isNaN(row.progress) ? 0 : parseInt(row.progress)"
						:format="(pct: number): string => ((pct === 100 && !row.success) ? 99 : pct) + '%'"
					/>
				</div>
			</template>
			<template #operation="{ row }">
				<div class="upload-operation">
					<span
						v-if="getFileStatus(row) === '未上传' || getFileStatus(row) === '已取消上传' || getFileStatus(row) === '上传失败'"
						title="删除文件"
						@click="upload!.remove(row)"
					>
						<IEpDelete color="red" />
					</span>
					<span
						v-if="getFileStatus(row) === '正在上传'"
						title="取消上传"
						@click="upload!.update(row, { active: false })"
					>
						<IEpVideoPause color="orange" />
					</span>
					<!-- <span
						v-if="getFileStatus(row) === '上传失败'"
						title="重新上传"
						@click="(upload as any).update(row, { active: true })"
					>
						<i-ep-UploadFilled color="orange" />
					</span> -->
					<span v-if="getFileStatus(row) === '上传成功'">-</span>
				</div>
			</template>
		</CommonTableBaseTable>
	</div>
</template>

<script lang="ts" setup>
import { ref, DefineComponent, computed, watch, onMounted } from 'vue'
import FileUpload from 'vue-upload-component'
import type { VueUploadItem } from 'vue-upload-component'
import { FilesStatus, FileStatus } from '@/enums/state'
import { FileMime } from '@/enums/fileMime'
import { useMessage } from '@/utils/useActions'

const { fileTypes, size, multiple } = withDefaults(defineProps<{
	fileTypes?: string[] | undefined
	multiple?: boolean
	size?: number
	url: string
}>(), {
	fileTypes: undefined,
	multiple: true,
	size: 1024 * 1024 * 1024
})
// const emits = defineEmits<{
// 	'success-files': (files: VueUploadItem[]) => void
// }>()
const emits = defineEmits(['success-files'])

const upload = ref<DefineComponent>()
const accept = computed(() => {
	if (!fileTypes) return undefined
	return fileTypes.map(type => {
		return FileMime[(type as keyof typeof FileMime)]
	}).join(',')
})
const files = ref<VueUploadItem[]>([])
const tableColumn = [
	{
		label: '文件名',
		prop: 'name',
		defineColumn: true
	},
	{
		label: '文件大小',
		prop: 'size',
		render: (val: null | number | undefined) => {
			if (!val) return '-'
			return val > 1024 * 1024 ? (val / 1024 / 1024).toFixed(2) + 'MB' : (val / 1024).toFixed(2) + 'KB'
		}
	},
	{
		label: '状态',
		prop: 'progress',
		defineColumn: true
	},
	{
		label: '操作',
		defineColumn: true
	}
]


const filesStatus = computed(() => {
	if (!files.value.length) return FilesStatus[0] // 未添加文件
	for (let file of files.value) {
		if (file.active) return FilesStatus[2] // 正在上传
		// if (file.error === 'abort') return FilesStatus[3] // 已取消上传
	}
	if (files.value.every(file => file.progress === '0.00')) return FilesStatus[1] // 未开始上传
	let lastFile = files.value[files.value.length - 1]
	if (lastFile.success || lastFile.error) {
		// 回调上传成功的response
		const succssFiles = files.value.filter(file => file.success)
		emits('success-files', succssFiles)
		return FilesStatus[4] // 上传完成
	}
})
const getFileStatus = (file: VueUploadItem) => {
	if (file.active) return FileStatus[1] // 正在上传
	if (file.error === 'abort') return FileStatus[2] // 已取消上传
	if (file.error) return FileStatus[4] // 上传失败
	if (file.progress === '0.00') return FileStatus[0] // 未上传
	if (file.success) return FileStatus[3] // 上传成功
}
const addFile = () => {
	upload.value?.$el.querySelector('input').click()
}
const inputFilter = (newFile: any, oldFile: any, prevent: any) => {
	// 添加文件前
	if (newFile && !oldFile) {
		// 限制大小		
		if (newFile.size > size) {
			const sizeStr = (size / 1024 / 1024).toFixed() + 'MB'
			useMessage('error', `文件大小不能超过${sizeStr}`)
			return prevent()
		}
		// 限制类型
		const mimeTypes = fileTypes ? fileTypes.map(type => FileMime[(type as keyof typeof FileMime)]) : undefined
		if (mimeTypes && !mimeTypes.includes(newFile.type)) {
			useMessage('error', `请上传${fileTypes}类型的文件`)
			return prevent()
		}
		// 创建 blob 字段 用于图片预览
		newFile.blob = ''
		let URL = window.URL || window.webkitURL
		if (URL && URL.createObjectURL) {
			newFile.blob = URL.createObjectURL(newFile.file)
		}
		// 文件格式设置


	}
}
const inputFile = (newFile: any, oldFile: any) => {
	if (newFile && !oldFile) {
		// add
		console.log('add', newFile)
	}
	if (newFile && oldFile) {
		// update
		console.log('update', newFile)
	}
	if (!newFile && oldFile) {
		// remove
		console.log('remove', oldFile)
	}
}

const getIconByFileType = (mimeType: string) => {
	if (mimeType.includes('image')) {
		// return new URL('./img/img.png', import.meta.url).href
		return false
	} else if (mimeType.includes('video')) {
		return new URL('./img/video.png', import.meta.url).href
	} else if (mimeType.includes('text/plain')) {
		return new URL('./img/txt.png', import.meta.url).href
	} else if (mimeType.includes('pdf')) {
		return new URL('./img/pdf.png', import.meta.url).href
	} else if (mimeType.includes('word')) {
		return new URL('./img/word.png', import.meta.url).href
	} else if (mimeType.includes('excel' || 'sheet')) {
		return new URL('./img/excel.png', import.meta.url).href
	} else if (mimeType.includes('powerpoint' || 'presentationml')) {
		return new URL('./img/ppt.png', import.meta.url).href
	} else if (mimeType.includes('zip' || 'rar' || '7z')) {
		return new URL('./img/zip.png', import.meta.url).href
	} else {
		return new URL('./img/file.png', import.meta.url).href
	}
}

onMounted(() => {
	console.log(upload.value)
})
</script>

<style lang="scss" scoped>
.upload-table-container {
  width: 100%;
  height: 100%;
	.upload-file-operation {
		width: 100%;
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-start;
		.el-button {
			margin-left: 0.5rem;
		}
		.el-button:first-child {
			margin-right: 1px;
		}
	}
	.upload-file-name {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		img, .el-image {
			width: 1.5em;
			height: 1.5em;
			margin-right: 10px;
		}
	}
  .upload-state {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    :deep(.el-progress--line) {
      width: 60%;
    }
  }
	.upload-operation {
		width: 100%;
		display: flex;
		justify-content: center;
		span {
			padding: 0 0.25rem;
			cursor: pointer;
		}
	}
}


</style>
