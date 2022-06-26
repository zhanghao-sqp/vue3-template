<template>
  <span>home</span>
  <ExportExcel size="large" :option="option" dialog></ExportExcel>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import ExportExcel from '@components/common/download/ExportExcel.vue'

const selectData = ref([
    {
        auditState: 0,
        channel: "",
        checksumData: "",
        createdAt: "2022-03-23 13:36:44",
        customer: "",
        group: "默认分组",
        groupName: "默认分组",
        height: 0,
        id: "10845",
        installAddress: "",
        installType: 0,
        location: "",
        mac: "CC0000BB2211",
        macText: "CC0000BB2211",
        name: "CC0000BB2211",
        no: "",
        online: 0,
        onoffs: "",
        onoffsVo: [],
        region: "",
        resolution: "0*0",
        ringRoad: "",
        screenDirection: 0,
        sim: "89861120235007360004",
        terminalId: "10845",
        'tvNo': "",
        'week': "",
        'width': 0,
    }
])

const excelDataFields = reactive({
    "主机编码": {
        field: 'mac',
        callback: (val: any) => {
            return `${val}&nbsp`
        }
    },
    "电视编码": {
        field: 'tvNo',
        callback: (val: any) => {
            return `${val}&nbsp`
        }
    },
    "客户名称": {
        field: 'customer',
        callback: (val: any) => {
            return `${val}&nbsp`
        }
    },
    "分组": 'group',
    "安装地址": 'installAddress',
    "安装位置": 'location',
    "安装方式": 'installType',
    "屏幕方向": 'screenDirection',
    "尺寸": {
        field: 'screenSize',
        callback: (val: any) => {
            return `${val}&nbsp  `
        }
    },
    "渠道": 'channelName',
    "行政区": 'regionName',
    "环路": 'ringRoadName',
    "sim": 'sim',
    "备注": 'comment',
    "开机时间": 'startupTime',
    "关机时间": 'shutdownTime',
    "预警规则": 'warnName',

})
const option = reactive({
  jsonData: selectData.value,
  excelFields: excelDataFields,
  header: '我是人',
  name: '测试json转excel.xsl'
})
</script>

<style scoped lang="scss">

</style>