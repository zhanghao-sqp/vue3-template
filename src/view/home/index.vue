<template>
	<span>count: {{ count }}</span>
	<el-button type="primary" @click="resetCount">重置count</el-button>
	<span style="padding: 0 20px">
		{{ hour }}:{{ minute }}:{{ second }},周{{ week }}
	</span>
	<router-link to="/login">去登录页</router-link>
	<br />
	<el-button type="primary" @click="loadingTest">加载中状态</el-button>
	<el-button type="primary" @click="loadingTest2">加载中状态百分比</el-button>
	<el-button type="success" @click="confirmTest">提示框</el-button>
	<el-button type="primary" v-print="'#parallax'">打印</el-button>
	<CommonDownloadExportExcel size="default" :option="option"></CommonDownloadExportExcel>
	<el-input v-model="elInputValue" width="100" v-debounce="{fn: inputFn, event: 'input', delay: 500}" />
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
	<el-select v-model="elSelectValue" disabled>
		<el-option label="选项1" value="1"></el-option>
		<el-option label="选项2" value="2"></el-option>
		<el-option label="选项3" value="3"></el-option>
	</el-select>
	<el-cascader :options="options">
    <template #default="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
    </template>
  </el-cascader>
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
	/>
	<el-date-picker
		v-model="elDataPickerValue2"
		type="daterange"
		range-separator="-"
		start-placeholder="Start date"
		end-placeholder="End date"
	/><br />
	<el-table id="print-data" :data="tableData" border>
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
		:background="!background"
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
      @vnode-mounted="vnodeMounted"
		/>
		<div
			v-waves
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
import { useCountStore, useRouteStore } from '@/store'
import { ref, reactive } from 'vue'

import { useTime } from '@/hooks'
import { useLoading, useConfirm } from '@/utils/useActions'
import { svgLoading } from '@/utils/svgString'
const { month, day, hour, minute, second, week } = useTime()

const vnodeMounted = (vnode: any) => {
  console.log(vnode, 123)
}
const loadingTest = () => {
	const loading = useLoading('加载中...')
	setTimeout(() => {
		loading.setText('加载完成')
		loading.close()
	}, 3000)
}
const loadingTest2 = () => {
	let percent = 0
	const loading = useLoading(`正在加载 ${percent}%`)
	// let timer = setInterval(() => {
	// 	percent += 1
	// 	loading.setText(`正在加载 ${percent}%`)
	// 	if (percent === 100) {
	// 		loading.close()
	// 		clearInterval(timer)
	// 	}
	// }, 50)
	const load = () => {
		percent += .1
		loading.setText(`正在加载 ${percent.toFixed(2)}%`)
		if (percent >= 100) {
			loading.close()
		}
		let raf = requestAnimationFrame(load)
	}
	load()
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
const routeStore = useRouteStore()
routeStore.getRouteList()

const countStore = useCountStore()
const { count } = storeToRefs(countStore) // 直接解构会失去响应式，配合storeToRefs使用
countStore.increment()
const resetCount = () => {
	countStore.$reset()
}

const flag = ref(true)
setTimeout(() => {
	countStore.increment()
	flag.value = false
}, 3000)
const inputFn = () => {
	console.log(elInputValue.value)
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
const elDataPickerValue2 = ref('')
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

const option = reactive({
	jsonData: [
		{
			auditState: 0,
			channel: '',
			checksumData: '',
			createdAt: '2022-03-23 13:36:44',
			customer: '',
			group: '默认分组',
			groupName: '默认分组',
			height: 0,
			id: '10845',
			installAddress: '',
			installType: 0,
			location: '',
			mac: 'CC0000BB2211',
			macText: 'CC0000BB2211',
			name: 'CC0000BB2211',
			no: '',
			online: 0,
			onoffs: '',
			onoffsVo: [],
			region: '',
			resolution: '0*0',
			ringRoad: '',
			screenDirection: 0,
			sim: '89861120235007360004',
			terminalId: '10845',
			tvNo: '',
			week: '',
			width: 0
		}
	],
	excelFields: {
		主机编码: {
			field: 'mac',
			callback: (val: any) => {
				return `${val}&nbsp`
			}
		},
		电视编码: {
			field: 'tvNo',
			callback: (val: any) => {
				return `${val}&nbsp`
			}
		},
		客户名称: {
			field: 'customer',
			callback: (val: any) => {
				return `${val}&nbsp`
			}
		},
		分组: 'group',
		安装地址: 'installAddress',
		安装位置: 'location',
		安装方式: 'installType',
		屏幕方向: 'screenDirection',
		尺寸: {
			field: 'screenSize',
			callback: (val: any) => {
				return `${val}&nbsp  `
			}
		},
		渠道: 'channelName',
		行政区: 'regionName',
		环路: 'ringRoadName',
		sim: 'sim',
		备注: 'comment',
		开机时间: 'startupTime',
		关机时间: 'shutdownTime',
		预警规则: 'warnName'
	}
})
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]
</script>

<style scoped lang="scss">
.custom-loading {
	width: 100%;
	height: 300px;
	background-color: $main-color;
}
</style>
