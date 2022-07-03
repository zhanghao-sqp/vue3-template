import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { formatDate } from './src/utils/common/common'

// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import ComponentsPlugin from 'unplugin-vue-components/vite'
// element-plus相关
import ElementPlusPlugin from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// icon相关
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// 打包相关
import ViteCompression from 'vite-plugin-compression'

export default ({ mode }: ConfigEnv) => {
	const time = formatDate(new Date(), 'yyyy-MM-dd')
	const env = loadEnv(mode, process.cwd())
  console.log('🚀 ~ env', env)
	console.log('🚀 ~ formatDate', time)
	const resolvePath = (dir: string) => resolve(__dirname, dir)
	return defineConfig({
		base: './',
		envDir: './env',
		server: {
			host: '0.0.0.0',
			port: 8080,
			open: false,
			cors: true,
			proxy: {
				'/api': {
					target: env.VITE_BASE_URL,
					changeOrigin: true,
					rewrite: path => path.replace(/\/api/, '')
				}
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					// 修改element-plus默认样式
					additionalData: `@use '@common/style/global/element-plus.scss' as *;`
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
			}),
			// 压缩
			ViteCompression({
				verbose: true, // 输出压缩成功
				disable: false, // 是否禁用
				threshold: 1, // 体积大于阈值会被压缩，单位是b
				algorithm: 'gzip', // 压缩算法
				ext: '.gz' // 生成的压缩包后缀
			})
		],
		resolve: {
			alias: {
				'@': resolvePath('src'),
				'@view': resolvePath('src/view'),
				'@components': resolvePath('src/components'),
				'@assets': resolvePath('src/assets'),
				'@common': resolvePath('src/common'),
				'@style': resolvePath('src/common/style'),
				'@var': resolvePath('src/common/style/global/variable.scss'),
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
			},
			rollupOptions: {
				output: {
					chunkFileNames: `js/[name]-[hash]-${time}.js`,
					entryFileNames: `js/[name]-[hash]-${time}.js`,
					assetFileNames: `[ext]/[name]-[hash]-${time}.[ext]`
				}
			}
		}
	})
}
