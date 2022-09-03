import { onUnmounted } from 'vue'
import mitt from 'mitt'

const emitter = mitt()

// 自定义触发器
const customEmit = (eventName: string, event: unknown) => {
	emitter.emit(eventName, event)
}

// 自定义接收器
const customOn = (eventName: any, callback: Function) => {
	emitter.on(eventName, (callback as any))
}

// 通知刷新表格数据
const toRefreshTable = () => {
	emitter.emit('reload')
}

// 刷新表格数据
const reload = (callback: Function)=> {
	emitter.on('reload', () => callback())
}

// 通知刷新树结构数据
const toRefreshTree = () => {
	emitter.emit('refreshTree')
}

// 刷新树数据
const refreshTree = (callback: Function)=> {
	emitter.on('refreshTree', () => callback())
}

export const useEventbus = () => {
	onUnmounted(() => {
		emitter.all.clear()
	})
	return {
		customEmit,
		customOn,
		toRefreshTable,
		reload,
		toRefreshTree,
		refreshTree
	}
}
