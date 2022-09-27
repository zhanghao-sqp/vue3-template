// 编码
export function encodeBase64(data: string): string {
  return window.btoa(data);
}

// 解码
export function decodeBase64(data: string): string {
  return window.atob(data);
}

// 图片转base64
export function getBase64Image(img: HTMLImageElement) {
  // 通过canvas的toDataURL方法，将图片转换为base64格式
	const canvas = document.createElement('canvas')
	canvas.width = img.width
	canvas.height = img.height
	const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
	ctx.drawImage(img, 0, 0, img.width, img.height)
	return canvas.toDataURL('image/png')
}

// 根据图片地址获取base64
export async function getBase64ImageByURL(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url
    img.onload = () => {
      resolve(getBase64Image(img))
    }
    img.onerror = (err) => {
      reject(err)
    }
  })
}

// 文件转base64
export async function getBase64File(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = (err) => {
      reject(err)
    }
  })
}

// 根据文件地址获取base64
// export async function getBase64FileByURL(url: string) {
//   const res = await fetch(url)
//   const blob = await res.blob()
//   return getBase64File(blob)
// }
