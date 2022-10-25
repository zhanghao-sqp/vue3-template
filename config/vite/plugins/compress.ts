/**
 * @name ConfigCompressPlugin
 * @description 开启.gz压缩
 */
import viteCompression from 'vite-plugin-compression'
import { IS_COMPRESS } from '../../../config/constant/system'

export const ConfigCompressPlugin = () => {
	if (IS_COMPRESS) {
		return viteCompression({
			verbose: true, // 默认即可
			disable: false, //开启压缩(不禁用)，默认即可
			deleteOriginFile: false, //是否删除源文件
			threshold: 1, //压缩前最小文件大小 (单位：b)
			algorithm: 'gzip', //压缩算法
			ext: '.gz' //文件类型
		})
	}
	return []
}
