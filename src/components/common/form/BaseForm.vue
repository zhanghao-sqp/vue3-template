<template>
  <div class="base-form">
    <!-- <el-form :model="formData" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item v-for="item in formItems" :key="item.prop" :label="item.label" :prop="item.prop">
        <el-input v-if="item.type === 'input'" v-model="form[item.prop]" :placeholder="item.placeholder"></el-input>
        <el-select v-if="item.type === 'select'" v-model="form[item.prop]" :placeholder="item.placeholder">
          <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const formData = reactive({
  username: '',
  password: ''
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
  ]
}
const formItems = [
  {
    prop: 'username',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名'
  },
  {
    prop: 'password',
    label: '密码',
    type: 'input',
    placeholder: '请输入密码'
  }
]
const submit = () => {
  console.log(formData)
}

</script>

<style scoped lang="scss">

</style>