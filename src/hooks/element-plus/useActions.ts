import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'

type Type = 'info' | 'success' | 'warning' | 'error'

// 消息提示
export const useMessage = (type: Type, tip: string) => {
	ElMessage({
		message: tip,
		type,
		grouping: true,
		duration: 2000
	})
}

// 确认提示
export const useConfirm = async (tip: string) => {
	let result
	try {
		result = await ElMessageBox.confirm(tip, '提示', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning'
		})
	} catch (error) {
		useMessage('info', '已取消')
		result = false
	} finally {
		return result
	}
}

// 加载全屏动画 this.close()关闭
export const useLoading = (text: string) => {
	return ElLoading.service({
		text,
		lock: true,
		background: 'raba(0,0,0,0.8)'
	})
}
