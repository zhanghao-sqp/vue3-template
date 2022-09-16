import { App } from 'vue'
import * as Icons from '@element-plus/icons-vue'
/*
*	由于后期在编辑图标名称时，为了保证图标的正确显示，我们需要在这里手动引入所有的图标
* 导入全部icon图标 icon图标名称参考：https://element-plus.gitee.io/#/zh-CN/component/icon
*/
export default {
	install: (app: App) => {
		Object.keys(Icons).forEach((key: string) => {
			app.component(key, Icons[key as keyof typeof Icons])
		})
	}
}
