import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
// import baseUrl from './baseUrl'

const baseUrl = 'http://localhost:4000'
// 指定后端返回的基本数据类型
export interface ResponseConfig {
  code: number
  status: number
  data: any
  msg: string
}
export interface ValueConfig {
  value: any
}

const fetch = (url: string, options?: any): Promise<any> => {
  const reqUrl = baseUrl + url
  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options }).then(({ data, error }: _AsyncData<any, any>) => {
      if (error.value) {
        reject(error.value)
        return
      }
      const value = data.value
      if (!value) {
        // 这里处理错误回调
        // reject(value)
        // $router.replace('/reject/' + value.status)
      }
      else if (value.code !== 200) {
        console.log({
          message: value.msg,
          type: 'error',
        })
      }
      else {
        resolve(ref(value))
      }
    }).catch((err: any) => {
      reject(err)
    })
  })
}

export default new class Http {
  get(url: string, params?: any): Promise<any> {
    return fetch(url, { method: 'get', params })
  }

  post(url: string, params?: any): Promise<any> {
    return fetch(url, { method: 'post', params })
  }

  put(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'put', body })
  }

  delete(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'delete', body })
  }
}()
