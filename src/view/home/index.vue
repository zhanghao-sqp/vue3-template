<template>
	<span>count：{{ count }}</span>
	<el-button type="primary" @click="resetCount">重置count</el-button>
	<span style="padding: 0 20px">
		{{ hour }}:{{ minute }}:{{ second }},周{{ week }}
	</span>
	<router-link to="/login">去登录页</router-link>
	<br />
	<el-button type="primary" @click="loadingTest">加载中状态</el-button>
	<el-button type="primary" @click="loadingTest2">加载中状态百分比</el-button>
	<el-button type="success" @click="confirmTest">提示框</el-button>
	<el-input v-model="elInputValue" width="100" />
	<div class="mt-4">
    <el-input
      v-model="input3"
      placeholder="Please input"
      class="input-with-select"
    >
      <template #prepend>
        <el-select v-model="select" placeholder="Select" style="width: 115px">
          <el-option label="Restaurant" value="1" />
          <el-option label="Order No." value="2" />
          <el-option label="Tel" value="3" />
        </el-select>
      </template>
      <template #append>
        <el-button :icon="'Search'" />
      </template>
    </el-input>
  </div>
	<el-select v-model="elSelectValue" disabled>
		<el-option label="选项1" value="1"></el-option>
		<el-option label="选项2" value="2"></el-option>
		<el-option label="选项3" value="3"></el-option>
	</el-select>
	<el-tree-select
		v-model="elTreeSelectValue"
		:data="elTreeSelectData"
		check-strictly
		:render-after-expand="false"
	/>
	<el-date-picker
		v-model="elDataPickerValue"
		type="datetime"
		placeholder="Select date and time"
		:shortcuts="shortcuts"
	/> <br />
	<el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
	<el-pagination
		v-model:currentPage="currentPage4"
		v-model:page-size="pageSize4"
		:page-sizes="[100, 200, 300, 400]"
		:small="small"
		:disabled="disabled"
		:background="background"
		layout="total, sizes, prev, pager, next, jumper"
		:total="400"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
	/>
	<!-- <UseDarkSwitch></UseDarkSwitch>
	<UseExportExcel></UseExportExcel> -->
	<div id="parallax">
		<!-- <div style="position: absolute; left: 0; top: 18px;">
			<img src="../../../public/picture.jpg" alt="" />
		</div>
		<div style="position: absolute; left: 500px; top: 50px;">
			<img src="../../../public/rain.png" alt="" />
		</div> -->
		<CommonUploadUploadTable
			:fileTypes="['zip', 'docx', 'png', 'doc']"
			url="/api/upload"
			@success-files="successFiles"
		/>
		<div
			v-waves
			style="width: 100%; height: 350px; background-color: cornflowerblue"
			class="custom-loading"
			v-loading="true"
			element-loading-text="加载中···"
			:element-loading-svg="svgLoading"
		></div>
		<!-- <div
			v-focus
			v-droppable
			v-throttle="{fn: (e: Event)=>appearFn(1, e), event: 'mousemove' }"
			style="
				width: 300px;
				height: 200px;
				right: 0;
				top: 300px;
				position: absolute;
			"
		>
			<input type="text" />
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountStore } from '@/store'
// import WS from '@/http/WS'
import { ref } from 'vue'

import { useTime, useFoucsPoint } from '@/hooks'
import { useLoading, useConfirm } from '@/utils/useActions'
import { svgLoading } from '@/utils/svgString'
import varCSS from '@/style/global/var.module.scss'
useFoucsPoint({ color: varCSS.mainColor })
const { month, day, hour, minute, second, week } = useTime()

const loadingTest = () => {
	const loading = useLoading('加载中...')
	console.log(loading)
	setTimeout(() => {
		loading.setText('加载完成')
		loading.close()
	}, 3000)
}

const loadingTest2 = () => {
	let percent = 0
	const loading = useLoading(`正在加载 ${percent}%`)
	let timer = setInterval(() => {
		percent += 1
		loading.setText(`正在加载 ${percent}%`)
		if (percent === 100) {
			loading.close()
			clearInterval(timer)
		}
	}, 50)
}
const confirmTest = () => {
	const confirm = useConfirm('确定删除吗？')
	confirm
		.then(() => {
			console.log('确定')
		})
		.catch(() => {
			console.log('取消')
		})
}
const successFiles = (files: object[]) => {
	console.log(files)
}
// const ws = new WS('ws://121.40.165.18:8800', {
// 	onmessage: (e: any) => {
// 		console.log('ws message', e)
// 	},
// })
const countStore = useCountStore()
const { count } = storeToRefs(countStore) // 直接解构会失去响应式，配合storeToRefs使用
countStore.increment()
const resetCount = () => {
	countStore.$reset()
}

const flag = ref(true)
setTimeout(() => {
	countStore.increment()
	count.value++
	flag.value = false
}, 3000)
const appearFn = (num: number, e: Event) => {
	count.value += num
}
const elInputValue = ref('')
const elSelectValue = ref()
const input3 = ref('')
const select = ref('')
const elTreeSelectValue = ref()
const elTreeSelectData = [
	{
		value: '1',
		label: 'Level one 1',
		children: [
			{
				value: '1-1',
				label: 'Level two 1-1',
				children: [
					{
						value: '1-1-1',
						label: 'Level three 1-1-1'
					}
				]
			}
		]
	},
	{
		value: '2',
		label: 'Level one 2',
		children: [
			{
				value: '2-1',
				label: 'Level two 2-1',
				children: [
					{
						value: '2-1-1',
						label: 'Level three 2-1-1'
					}
				]
			},
			{
				value: '2-2',
				label: 'Level two 2-2',
				children: [
					{
						value: '2-2-1',
						label: 'Level three 2-2-1'
					}
				]
			}
		]
	},
	{
		value: '3',
		label: 'Level one 3',
		children: [
			{
				value: '3-1',
				label: 'Level two 3-1',
				children: [
					{
						value: '3-1-1',
						label: 'Level three 3-1-1'
					}
				]
			},
			{
				value: '3-2',
				label: 'Level two 3-2',
				children: [
					{
						value: '3-2-1',
						label: 'Level three 3-2-1'
					}
				]
			}
		]
	}
]
const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]
const elDataPickerValue = ref('')
const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped lang="scss"></style>
