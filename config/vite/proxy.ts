/**
 * @name ConfigProxyPlugin
 * @description 代理配置
 */

import { ProxyOptions } from 'vite'
type ProxyTarget = Record<string, ProxyOptions | string>

export const getProxyTarget = (env: Record<string, string>): ProxyTarget => {
  return {
    '/api': {
      target: env.VITE_BASE_URL,
      changeOrigin: true,
      rewrite: path => path.replace(/\/api/, '')
    },
    '/proxy': {
      target: env.VITE_BASE_URL,
      changeOrigin: true,
      rewrite: path => path.replace(/\/proxy/, '')
    }
  }
}