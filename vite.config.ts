import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import { resolve } from 'path'
// 代理配置
import { getProxyTarget } from './config/vite/proxy'
// 插件
import { createVitePlugins } from './config/vite/plugins'

export default ({ mode }: ConfigEnv) => {
	const env = loadEnv(mode, process.cwd() + '/config/env')
	const isBuild = mode === 'production'
	const resolvePath = (dir: string) => resolve(__dirname, dir)
	return defineConfig({
		base: './',
		envDir: './env',
		server: {
			host: '0.0.0.0',
			port: 8888,
			open: false,
			hmr: true,
			cors: true,
			proxy: getProxyTarget(env)
		},
		css: {
			preprocessorOptions: {
				scss: {
					// 修改element-plus默认样式 导入全局变量和mixin
					additionalData: `
						@use '@style/global/variable.scss' as *;
						@use '@style/global/element-plus.scss' as *;
					`
				}	
			}
		},
		plugins: createVitePlugins(isBuild),
		resolve: {
			alias: {
				'@': resolvePath('src'),
				'#': resolvePath('types'),
				'@view': resolvePath('src/view'),
				'@components': resolvePath('src/components'),
				'@assets': resolvePath('src/assets'),
				'@common': resolvePath('src/common'),
				'@style': resolvePath('src/style'),
				'@hooks': resolvePath('src/hooks'),
				'@api': resolvePath('src/http/api'),
				'@router': resolvePath('src/router'),
				'@store': resolvePath('src/store'),
				'@utils': resolvePath('src/utils')
			},
			extensions: ['.ts', '.js', '.css', '.sass', '.less']
		},
		build: {
			target: 'es2017',
      cssTarget: 'chrome79',
      chunkSizeWarningLimit: 2000,
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true
				}
			},
			rollupOptions: {
				output: {
					chunkFileNames: `js/[name]-[hash].js`,
					entryFileNames: `js/[name]-[hash]-.js`,
					assetFileNames: `[ext]/[name]-[hash].[ext]`
				}
			}
		}
	})
}
