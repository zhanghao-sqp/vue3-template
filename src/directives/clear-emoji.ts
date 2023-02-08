import type { ObjectDirective } from 'vue'
import emojiRegex from 'emoji-regex'

let node: any = null

export const clearEmoji: ObjectDirective = {
	created(el) {
		const regex = emojiRegex()
		node = el.querySelectorAll('.el-input__inner,.el-textarea__inner')[0]
    if (!node) return
		const zclearNoNum = function (e: any) {
			if (e.target.composing) return
			const match = regex.exec(node.value) // 也可以直接用正则表达式判断
			if (match) {
				/* for (let i=0;i<match.length;i++) {
              node.value = node.value.replace(match[i],"");
            } */
				node.value = node.value.replace(
					/(\ud83c[\udc00-\udfff])|(\ud83d[\udc00-\udfff])|(\ud83e[\udc00-\udfff])|[\u2100-\u32ff]|[\u0030-\u007f][\u20d0-\u20ff]|[\u0080-\u00ff]/g,
					''
				)
				zclearNoNum(e)
			}
			// 触发v-model的更新
			node.dispatchEvent(new Event('input'))
		}
		const zblur = function (e: any) {
			zclearNoNum(e)
			setTimeout(() => {
				const match = regex.exec(node.value)
				if (match) {
					node.value = node.value.replace(
						/(\ud83c[\udc00-\udfff])|(\ud83d[\udc00-\udfff])|(\ud83e[\udc00-\udfff])|[\u2100-\u32ff]|[\u0030-\u007f][\u20d0-\u20ff]|[\u0080-\u00ff]/g,
						''
					)
					zclearNoNum(e)
				}
				// 触发v-model的更新
				node.dispatchEvent(new Event('change'))
			}, 50)
		}
		node.onkeyup = zclearNoNum
		node.onblur = zblur

		function onCompositionStart(e: any) {
			e.target.composing = true
		}

		function onCompositionEnd(e: any) {
			e.target.composing = false
			node.dispatchEvent(new Event('input'))
		}
		node.addEventListener('compositionstart', onCompositionStart)
		node.addEventListener('compositionend', onCompositionEnd)
	}
}
