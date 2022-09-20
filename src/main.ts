import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directives from './directives'
import print from 'vue3-print-nb'
import Icon from './plugins/Icon'
import './common/script/windowPage'

createApp(App)
	.use(router)
	.use(store)
	.use(directives)
	.use(print)
	.use(Icon)
	.mount('#app')
