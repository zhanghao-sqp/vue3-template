import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import directives from './directives'
import './common/script/windowPage'

const app = createApp(App)
app.config.globalProperties.$env = import.meta.env
app
	.use(router)
	.use(store)
	.use(directives)
	.mount('#app')
