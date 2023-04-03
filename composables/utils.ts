export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

// export function resizeImgUrl(url: string, w?: number, h?: number) {
//   return url + (url.includes('?') ? '&' : '?' + `x-oss-process=image/resize${w ? (`,w_${w}`) : ''}${h ? (`,h_${w}`) : ''}`)
// }

export function resizeImgUrl(url: string, w?: number, h?: number) {
  if (!url)
    return url
  try {
    const u = new URL(url)
    u.searchParams.set('x-oss-process', `image/resize${w ? (`,w_${w}`) : ''}${h ? (`,h_${w}`) : ''}`)
    return u.toString()
  }
  catch {
    return ''
  }
}
const reg = /w_(.*?)x(.*?)_/
export function getImageSizeFromUrl(url: string) {
  try {
    const m = reg.exec(url)
    if (m && m[1] && m[2]) {
      return {
        width: Number(m[1]),
        height: Number(m[2]),
      }
    }
    else { return null }
  }
  catch {
    return null
  }
}
interface options {
  /**
   * 动画名称
   */
  name?: string
  /**
   * 持续时间 ms
   */
  time?: number
  /**
   * 延迟 ms
   */
  delay?: number
}
export function generateSpringText(options?: options) {
  const { name = 'bottom-up-spring', time = 1000, delay = 0 } = options || {}
  return ` animation: ${name} ${time}ms ${delay ? `${delay}ms` : ''} linear both;opacity: 1`
}
