/**
 * 判断手机类型 ios/android
 */
export function mobileType() {
  const u = window.navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  return isiOS ? 'ios' : 'android'
}

/**
 * 深拷贝
 * @param {*} obj
 */
export function deepClone(obj) {
  let result = typeof obj.splice === 'function' ? [] : {}
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        result[key] = deepClone(obj[key])
      } else {
        result[key] = obj[key]
      }
    }
    return result
  }
  return obj
}

/**
 * 获取地址栏参数
 * @param {*} url 地址
 */
export function getRequest(url) {
  let theRequest = new Object()
  if (url.indexOf('?') != -1) {
    let str = url.split('?')[1]
    strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}
