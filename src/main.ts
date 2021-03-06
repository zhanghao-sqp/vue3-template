import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import '@style/global/element-dark.scss'
// import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.config.globalProperties.$env = import.meta.env
app.use(router).use(createPinia().use(piniaPluginPersistedstate)).mount('#app')
