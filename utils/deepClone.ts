/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 * @param {Map} map 用于存储循环引用对象的地址
 */
 export function deepClone<T>(obj = {} as Object, map = new Map()):T {
  if (typeof obj !== 'object')
    return obj

  if (map.get(obj))
    return map.get(obj)

  let result:Record<string,any> = {}
  // 初始化返回结果
  if (
    Array.isArray(obj)
    // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
    || Object.prototype.toString.call(obj) === '[object Array]'
  )
    result = []

  // 防止循环引用
  map.set(obj, result)
  for (const key in obj) {
    // 保证 key 不是原型属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key], map)
    }
  }

  // 返回结果
  return result
}
