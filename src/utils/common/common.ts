interface O {
	[k: string]: number
}

// YYYY-MM-DD HH:mm:ss
export const formatDate = (date: Date, fmt: string = 'yyyy-MM-dd hh:mm:ss') => {
	const o: O = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		S: date.getMilliseconds() // 毫秒
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + '').substr(4 - RegExp.$1.length)
		)
	}
	for (const k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? o[k] + '' : ('00' + o[k]).substr(('' + o[k]).length)
			)
		}
	}
	return fmt
}

// 日期字符串转为Date
export const parseDate = (date: string, fmt: string = 'yyyy-MM-dd hh:mm:ss') => {
	const o: O = {
		'M+': 1, // 月份
		'd+': 1, // 日
		'h+': 1, // 小时
		'm+': 1, // 分
		's+': 1, // 秒
		'q+': 1, // 季度
		S: 1 // 毫秒
	}
	const k = fmt.match(/([^yMdhmsqS]+)/g)
	if (k) {
		const len = k.length
		for (let i = 0; i < len; i++) {
			if (new RegExp('(' + k[i] + ')').test(date)) {
				fmt = fmt.replace(
					RegExp.$1,
					RegExp.$1.length === 1
						? o[k[i]] + ''
						: ('00' + o[k[i]]).substr(('' + o[k[i]]).length)
				)
			}
		}
	}
	return new Date(Date.parse(fmt))
}
