import type { ObjectDirective } from 'vue'

// v-debounce="{fn, event, delay}"
export const debounce: ObjectDirective = {
  created(el, { value }) {
    // 至少需要回调函数以及监听事件类型
    if (typeof value.fn !== 'function' || !value.event) return
    el.timer = null
    el.handler = function () {
      if (el.timer) {
        clearTimeout(el.timer)
        el.timer = null
      }
      el.timer = setTimeout(() => {
        value.fn.apply(this, arguments)
        el.timer = null
      }, value.delay || 200)
    }
    el.addEventListener(value.event, el.handler)
  },
  beforeUnmount(el, { value }) {
    if (el.timer) {
      clearTimeout(el.timer)
      el.timer = null
    }
    el.removeEventListener(value.event, el.handler)
  }
}

// v-throttle="{fn, event, delay}"
export const throttle: ObjectDirective = {
  created(el, { value }) {
    // 至少需要回调函数以及监听事件类型
    if (typeof value.fn !== 'function' || !value.event) return
    el.timer = null
    el.handler = function () {
      if (el.timer) {
        clearTimeout(el.timer)
        el.timer = null
      }
      el.timer = setTimeout(() => {
        value.fn.apply(this, arguments)
        el.timer = null
      }, value.delay || 200)
    }
    el.addEventListener(value.event, el.handler)
  },
  beforeUnmount(el, { value }) {
    if (el.timer) {
      clearTimeout(el.timer)
      el.timer = null
    }
    el.removeEventListener(value.event, el.handler)
  }
}
