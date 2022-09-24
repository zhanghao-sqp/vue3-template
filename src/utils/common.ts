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

/**
 * @description 比较两个变量值是否相等
 * @param {any} obj1
 * @param {any} obj2
 * @return {boolean}
 * @example
 * const obj1 = { a: 1, b: 2, c: 3 }
 * const obj2 = { a: 1, b: 2, c: 3 }
 * const obj3 = { a: 1, b: 2, c: 3, d: 4 }
 * isEqual(obj1, obj2) // true
 * isEqual(obj1, obj3) // false
 */
export const isEqual = (obj1: any, obj2: any): boolean => {
	if (obj1 === obj2) {
		return true
	} else {
		const obj1Type = Object.prototype.toString.call(obj1)
		const obj2Type = Object.prototype.toString.call(obj2)
		if (obj1Type !== obj2Type) {
			return false
		} else {
			switch (obj1Type) {
				case '[object Object]':
					if (Object.keys(obj1).length !== Object.keys(obj2).length) {
						return false
					} else {
						for (const key in obj1) {
							if (obj1.hasOwnProperty(key)) {
								if (!isEqual(obj1[key], obj2[key])) {
									return false
								}
							}
						}
						return true
					}
				case '[object Array]':
					if (obj1.length !== obj2.length) {
						return false
					} else {
						for (let i = 0; i < obj1.length; i++) {
							if (!isEqual(obj1[i], obj2[i])) {
								return false
							}
						}
						return true
					}
				default:
					return false
			}
		}
	}
}

/***
 * @description 比较两个同类型对象，返回不同的地方
 * @param {object} tagetObj 目标对象
 * @param {object} compareObj 比较对象
 */
export const objDiff = (tagetObj: Record<string, any>, compareObj: Record<string, any>) => {
	const result = {} as Record<string, any>
	const tagetObjKeys: Array<keyof typeof tagetObj> = Object.keys(tagetObj)
	const compareObjKeys: Array<keyof typeof compareObj> = Object.keys(compareObj)
	compareObjKeys.forEach(key => {
		if (tagetObjKeys.includes(key)) {
			if (typeof tagetObj[key] === 'object') {
				if (JSON.stringify(tagetObj[key]) !== JSON.stringify(compareObj[key])) {
					result[key] = compareObj[key]
				}
			} else {
				if (tagetObj[key] !== compareObj[key]) {
					result[key] = compareObj[key]
				}
			}
		} else {
			result[key] = compareObj[key]
		}
	})
	return result
}
/***
 * @description 格式化日期
 * @param time
 */
export const formatDate = (time: any, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(time).format(format)
