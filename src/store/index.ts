import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia().use(piniaPluginPersistedstate)
export default pinia
export * from './modules/count'
export * from './modules/route'
export * from './modules/user'

// import.meta.glob 为动态导入，构建时，会分离为独立的 chunk
// import.meta.globEager 为直接引入

// const modulesFiles = Promise.resolve(import.meta.glob('./modules/*.ts'))
// const moduleList: any[] = []
// modulesFiles.then(modules => {
//   Object.values(modules).forEach(module => {
//     module().then(({ default: module }) => {
//       moduleList.push(module)
//     })
//   })
// })

// const modulesFiles = import.meta.globEager('./modules/*.ts')

// export default Object.keys(modulesFiles).reduce((modules, modulePath) => {
//   // 以文件名导出
//   const name = modulePath.replace(/(\.\/modules\/|\.ts)/g, '')
//   modules[name] = modulesFiles[(modulePath as string)]['default']
//   return modules
// }, {} as Record<string, any>)
