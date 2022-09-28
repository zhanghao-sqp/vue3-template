/**
 * @name  AutoRegistryComponents
 * @description 自动注册组件
 */
import Components from 'unplugin-vue-components/vite'
import {
	ElementPlusResolver,
	VueUseComponentsResolver
} from 'unplugin-vue-components/resolvers'

export const AutoRegistryComponents = () => {
	return Components({
		dirs: ['src/components', 'src/view'],
		extensions: ['vue'],
		deep: true,
		dts: 'types/components.d.ts',
		directoryAsNamespace: true,
		globalNamespaces: ['global'],
		directives: true,
		importPathTransform: (v: string) => v,
		allowOverrides: false,
		include: [/\.vue$/, /\.vue\?vue/],
		exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
		resolvers: [
			ElementPlusResolver({
				importStyle: 'sass'
			}),
			VueUseComponentsResolver()
		]
	})
}
