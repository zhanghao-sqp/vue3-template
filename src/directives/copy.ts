import type { ObjectDirective } from 'vue'

export const copy: ObjectDirective = {
  mounted(el, { value }) {
    el.__copy__ = (e: MouseEvent) => {
      const input = document.createElement('input')
      input.setAttribute('readonly', 'readonly')
      input.setAttribute('value', value)
      document.body.appendChild(input)
      input.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        document.body.removeChild(input)
      }
    }
    el.addEventListener('click', el.__copy__)
  },
  beforeUnmount(el) {
    el.removeEventListener('click', el.__copy__)
  }
}