import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directives from './directives'
import Icon from './plugins/Icon'
import './common/script/windowPage'

createApp(App).use(router).use(store).use(directives).use(Icon).mount('#app')
