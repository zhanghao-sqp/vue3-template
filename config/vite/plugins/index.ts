/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { ConfigSvgIconsPlugin } from './svgIcons'
import { AutoRegistryComponents } from './components'
import { AutoImportDeps } from './autoImport'
import { ConfigElementPlusPlugin } from './elementPlus'
import { ConfigCompressPlugin } from './compress'
// import { ConfigPagesPlugin } from './pages'
import { ConfigRestartPlugin } from './restart'
// import { ConfigImageminPlugin } from './imagemin'

export const createVitePlugins = (isBuild: boolean) => {
	const vitePlugins: (PluginOption | PluginOption[])[] = [
		// vue支持
		vue(),
		// setup语法糖组件名支持
		vueSetupExtend(),
    // 自动按需引入组件
	  AutoRegistryComponents(),
    // 自动按需引入依赖
    AutoImportDeps(),
    // 按需引入Element Plus
    ConfigElementPlusPlugin(),
    // 图片压缩
    // ConfigImageminPlugin(),
    // svg图标
    ConfigSvgIconsPlugin(isBuild),
    // 监听配置文件修改自动重启Vite
    ConfigRestartPlugin(),
    // 动态生成路由
    // ConfigPagesPlugin(),
    // gzip压缩
    ConfigCompressPlugin()
	]
	return vitePlugins
}
