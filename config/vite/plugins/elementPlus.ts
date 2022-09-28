/**
 * @name ConfigElementPlusPlugin
 * @description 按需加载Element Plus
 */

import ElementPlusPlugin from 'unplugin-element-plus/vite'

export const ConfigElementPlusPlugin = () => {
  return ElementPlusPlugin({
    useSource: true
  })
}
