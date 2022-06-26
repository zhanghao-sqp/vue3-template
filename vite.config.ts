import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import ComponentsPlugin from 'unplugin-vue-components/vite'
// element-plus相关
import ElementPlusPlugin from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// icon相关
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default ({ mode }: ConfigEnv) => {

	const env = loadEnv(mode, process.cwd())
	const resolvePath = (dir: string) => resolve(__dirname, dir)

	return defineConfig({
		base: './',
		server: {
			host: '0.0.0.0',
			port: 8080,
			open: true,
			proxy: {
				'/api': {
					target: env.VITE_BASE_URL,
					changeOrigin: true
					// rewrite: path => path.replace(/\/api/, '')
				}
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					// 修改element-plus默认样式
					additionalData: `@use '@common/css/global/elementPlus.scss' as *;`
				}
			}
		},
		plugins: [
			vue(),
			ElementPlusPlugin({ useSource: true }),
			// 自动导入组件及样式
			AutoImport({
				// imports: ["vue"], // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
				resolvers: [
					// 导入element-plus组件
					ElementPlusResolver({
						importStyle: 'sass'
					}),
					// 导入图标组件
					IconsResolver({
						prefix: 'Icon'
					})
				]
			}),
			// 注册组件
			ComponentsPlugin({
				resolvers: [
					ElementPlusResolver({
						importStyle: 'sass'
					}),
					IconsResolver({
						enabledCollections: ['ep'] // <View /> => <i-ep-View />
					})
				]
			}),
			// 图标
			Icons({
				autoInstall: true
			})
		],
		resolve: {
			alias: {
				'@': resolvePath('src'),
				'@view': resolvePath('src/view'),
				'@components': resolvePath('src/components'),
				'@assets': resolvePath('src/assets'),
				'@common': resolvePath('src/common'),
				'@style': resolvePath('src/common/css'),
				'@var': resolvePath('src/common/css/global/variable.scss'),
				'@hooks': resolvePath('src/hooks'),
				'@api': resolvePath('src/api'),
				'@router': resolvePath('src/router'),
				'@store': resolvePath('src/store'),
				'@utils': resolvePath('src/utils')
			},
			extensions: ['.ts', '.js', '.css', '.sass', '.less']
		},
		build: {
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true
				}
			}
		}
	})
}
