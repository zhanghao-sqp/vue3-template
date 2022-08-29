<template>
	<div class="upload-table-container">
		<file-upload
			ref="upload"
			post-action="/upload/post"
			:multiple="true"
			:size="1024 * 1024 * 10"
			v-model="files"
			@input-filter="inputFilter"
			@input-file="inputFile"
		>
			<el-button type="primary">上传</el-button>
		</file-upload>
		<button
			type="button"
			class="btn btn-success"
			v-if="!upload || !(upload as any).active"
			@click.prevent="(upload as any).active = true"
		>
			Start Upload
		</button>
		<button
			type="button"
			class="btn btn-danger"
			v-else
			@click.prevent="(upload as any).active = false"
		>
			<i class="fa fa-stop" aria-hidden="true"></i>
			Stop Upload
		</button>
		<BaseTable :data="files" :column="tableColumn">
			<template #progress="{ row }">
				<div class="upload-state">
					<el-tag
						v-show="!row.active && row.progress === '0.00' && !row.success"
						size="small"
						type="info"
					>
						未上传
					</el-tag>
					<el-tag
						v-show="!row.active && row.progress === '100.00' && !row.success"
						size="small"
						type="danger"
					>
						上传失败
					</el-tag>
					<el-tag
						v-show="!row.active && row.progress === '100.00' && row.success"
						size="small"
						type="success"
					>
						上传成功
					</el-tag>
					<el-tag
            v-show="row.active && row.progress !== '100.00'"
            size="small"
          >
						正在上传
					</el-tag>
					<el-tag
						v-show="
							!row.active &&
							row.progress !== '0.00' &&
							row.progress !== '100.00'
						"
						size="small"
						type="warning"
					>
						暂停上传
					</el-tag>
					<el-progress
						v-show="row.active && row.progress !== '100.00'"
						:percentage="isNaN(row.progress) ? 0 : parseInt(row.progress)"
						:format="(pct: number): string => pct + '%'"
					/>
				</div>
			</template>
		</BaseTable>
	</div>
</template>

<script lang="ts" setup>
import { ref, ComponentInternalInstance } from 'vue'
import FileUpload from 'vue-upload-component'
import type { VueUploadItem } from 'vue-upload-component'
const upload = ref<ComponentInternalInstance>()

const files = ref<VueUploadItem[]>([])
const tableColumn = [
	{
		label: '文件名',
		prop: 'name'
	},
	{
		label: '类型',
		prop: 'type',
		render: (val: string) => val.split('/')[1]
	},
	{
		label: '文件大小',
		prop: 'size',
		render: (val: null | number) =>
			val ? (val / 1024 / 1024).toFixed(2) + 'MB' : '-'
	},
	{
		label: '状态',
		prop: 'progress',
		defineColumn: true
	}
]
const inputFilter = (newFile: any, oldFile: any, prevent: any) => {
	if (newFile && !oldFile) {
		// Before adding a file
		// 添加文件前
		// Filter system files or hide files
		// 过滤系统文件 和隐藏文件
		if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
			return prevent()
		}

		// Filter php html js file
		// 过滤 php html js 文件
		if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
			return prevent()
		}
		// 创建 blob 字段 用于图片预览
		newFile.blob = ''
		let URL = window.URL || window.webkitURL
		if (URL && URL.createObjectURL) {
			newFile.blob = URL.createObjectURL(newFile.file)
		}
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
		return 'fa fa-file-image-o'
	} else if (mimeType.includes('video')) {
		return 'fa fa-file-video-o'
	} else if (mimeType.includes('audio')) {
		return 'fa fa-file-audio-o'
	} else if (mimeType.includes('text')) {
		return 'fa fa-file-text-o'
	} else if (mimeType.includes('pdf')) {
		return 'fa fa-file-pdf-o'
	} else if (mimeType.includes('word')) {
		return 'fa fa-file-word-o'
	} else if (mimeType.includes('excel')) {
		return 'fa fa-file-excel-o'
	} else if (mimeType.includes('powerpoint')) {
		return 'fa fa-file-powerpoint-o'
	} else if (mimeType.includes('zip')) {
		return 'fa fa-file-zip-o'
	} else if (mimeType.includes('rar')) {
		return 'fa fa-file-zip-o'
	} else {
		return 'fa fa-file-o'
	}
}
</script>

<style lang="scss" scoped>
.upload-table-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
}


</style>
