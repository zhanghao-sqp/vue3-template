import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import directive from './common/directive'
import './common/script/windowPage'

const app = createApp(App)
app.config.globalProperties.$env = import.meta.env
app
	.use(router)
	.use(createPinia().use(piniaPluginPersistedstate))
	.use(directive)
	.mount('#app')
