import { useRouteStoreWithOut } from '@/store'
let beforeTime = 0, leaveTime = 0

window.onunload = () => {
  leaveTime = new Date().getTime() - beforeTime
	// levelTime受到pinia-plugin-persistedstate的影响，可能会有几ms的误差
  if (leaveTime <= 10) {
    // 页面关闭
    console.log('====关闭=====')
  } else {
    // 页面刷新
    console.log('====刷新=====')
    // useRouteStoreWithOut().add('refresh'+ new Date().getTime())
	}
}

window.onbeforeunload = () => {
	beforeTime = new Date().getTime()
}
