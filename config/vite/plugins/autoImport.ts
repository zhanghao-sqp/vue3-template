/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入
 */
 import AutoImport from 'unplugin-auto-import/vite'
 import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

 export const AutoImportDeps = () => {
   return AutoImport({
    // imports: ['vue', .vue-router', 'pinia'], // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    dts: 'types/auto-imports.d.ts', // 自动导入的类型声明文件,
    resolvers: [
      // 导入element-plus组件
      ElementPlusResolver({
        importStyle: 'sass'
      }),
      // 导入图标组件
      // IconsResolver({
      //   prefix: 'Icon'
      // })
    ]
  })
 }