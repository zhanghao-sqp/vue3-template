import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import type { LoadingOptionsResolved } from 'element-plus/es/components/loading/src/types'
import { svgFullScreenLoading } from './svgString'

export type Type = 'info' | 'success' | 'warning' | 'error'

// 消息提示
export const useMessage = (type: Type, tip: string) => {
	ElMessage({
		message: tip,
		type,
		grouping: true,
		duration: 3000
	})
}

// 确认提示
export const useConfirm = async (tip: string) => {
	let result
	try {
		result = await ElMessageBox.confirm(tip, '提示', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
			closeOnClickModal: false,
		})
	} catch (error) {
		useMessage('info', '已取消')
		result = false
	} finally {
		return result
	}
}

// 加载全屏动画 this.close()关闭
export const useLoading = (text: string, options?: Partial<Omit<LoadingOptionsResolved, 'target' | 'parent'>>) => {
	const loadingOptions = Object.assign({
		text,
		lock: true,
		customClass: 'custom-loading',
		svg: svgFullScreenLoading,
		background: 'rgba(0,0,0,0.7)'
	}, options)
	return ElLoading.service(loadingOptions)
}
