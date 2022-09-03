import dayjs from 'dayjs'

/**
 * @description 处理首字母大写 abc => Abc
 * @param str
 */
export const upperCase = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * @description 随机生成颜色
 * @param {string} type
 * @return {string}
 */
export const randomColor = (type: 'rgb' | 'hex' | 'hsl'): string => {
	switch (type) {
		case 'rgb':
			return window.crypto.getRandomValues(new Uint8Array(3)).toString()
		case 'hex':
			return `#${Math.floor(Math.random() * 0xffffff)
				.toString(16)
				.padStart(6, `${Math.random() * 10}`)}`
		case 'hsl':
			// 在25-95%范围内具有饱和度，在85-95%范围内具有亮度
			return [
				360 * Math.random(),
				`${100 * Math.random()}%`,
				`${100 * Math.random()}%`
			].toString()
	}
}

/**
 * 复制文本
 * @param text
 */
export const copyText = (text: string) => {
	return new Promise(resolve => {
		const copyInput = document.createElement('input') //创建一个input框获取需要复制的文本内容
		copyInput.value = text
		document.body.appendChild(copyInput)
		copyInput.select()
		document.execCommand('copy')
		copyInput.remove()
		resolve(true)
	})
}

/**
 * @description 判断字符串是否是base64
 * @param {string} str
 */
export const isBase64 = (str: string): boolean => {
	if (str === '' || str.trim() === '') {
		return false
	}
	try {
		return btoa(atob(str)) == str
	} catch (err) {
		return false
	}
}
// 对象转JSON
export const toJSON = (obj: object) => {
	return JSON.stringify(obj, (_, value) => {
		switch (true) {
			case typeof value === 'undefined':
				return 'undefined'
			case typeof value === 'symbol':
				return value.toString()
			case typeof value === 'function':
				return value.toString()
			default:
				break
		}
		return value
	})
}

/***
 * @description 格式化日期
 * @param time
 */
export const formatDate = (time: any, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(time).format(format)
