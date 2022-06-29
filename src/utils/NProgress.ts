import NProgress from 'nprogress'

//全局进度条的配置
NProgress.configure({
	easing: 'ease', // 动画方式
	speed: 1000, // 递增进度条的速度
	showSpinner: false, // 是否显示加载loading
	trickleSpeed: 200, // 自动递增间隔
	minimum: 0.3, // 初始化时的最小百分比
	parent: 'body' //指定进度条的父容器
	// template: string;
	// speed: number;
	// positionUsing: string;
	// barSelector: string;
	// spinnerSelector: string;
})

export const npStart = () => {
	NProgress.start()
}

export const npDone = () => {
	NProgress.done()
}
