<template>
  <ul>
    <li v-for="file in files">
      <div v-for="(key, i) in file" style="padding: 10px;">{{i}}:{{key}}</div>
    </li>
  </ul>
  <VueUploadComponent
    ref="upload"
    v-model="files"
    post-action="/post.method"
    put-action="/put.method"
    @input-file="inputFile"
    @input-filter="inputFilter"
  >
    <!-- <el-button type="primary">上传文件</el-button> -->
    上传文件
  </VueUploadComponent>
  <!-- <button v-show="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true" type="button">开始上传</button>
  <button v-show="$refs.upload && $refs.upload.active" @click.prevent="$refs.upload.active = false" type="button">停止上传</button> -->
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import VueUploadComponent from 'vue-upload-component'

const files = reactive([])
// watchEffect(() => {
//   console.log(files)
// })

/**
     * Has changed
     * @param  Object|undefined   newFile   只读
     * @param  Object|undefined   oldFile   只读
     * @return undefined
     */
    const inputFile = (newFile: any, oldFile: any) => {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // 获得相应数据
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  获得响应状态码
          console.log('status', newFile.xhr.status)
        }
      }
    }
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   读写
     * @param  Object|undefined   oldFile   只读
     * @param  Function           prevent   阻止回调
     * @return undefined
     */
    const inputFilter = (newFile: any, oldFile: any, prevent: Function) => {
      if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }
      }

      // 创建 blob 字段 用于图片预览
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    }

</script>

<style scoped lang="scss">

</style>