import type { ObjectDirective } from 'vue'

export const clickOutside: ObjectDirective = {
	mounted(el, { value }) {
    el.__clickOutside__ = (e: MouseEvent) => {
      if (el.contains(e.target as Node)) return
      value(e)
    }
    document.addEventListener('click', el.__clickOutside__)
  },
  beforeUnmount(el) {
    document.removeEventListener('click', el.__clickOutside__)
  }
}
