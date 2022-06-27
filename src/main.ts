import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@style/global/rewriteElement.scss'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
