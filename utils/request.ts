const baseURL = 'http://127.0.0.1:4000'
const production = 'https://api.dvaren.xyz/blog'

interface Options {
  params?: any
  body?: any
  query?: any
  method?: 'get' | 'post' | 'delete' | 'put'
}

export const http = (url: string, options?: Options): Promise<any> => {
  let base = baseURL
  if (process.client)
    base = production
  return $fetch(url, {
    onRequest: ({ request, options }) => {
      options.baseURL = options.baseURL === '/' ? base : options.baseURL
    },
    onResponse: ({ request, response, options }) => {
      const { code, msg } = response._data
      if (code !== 200) {
        // eslint-disable-next-line no-console
        console.log(response._data)
        throw createError({ statusCode: code, statusMessage: msg })
      }
      return response._data
    },
    onRequestError: ({ request, options, error }) => {
      // eslint-disable-next-line no-console
      console.log('FetchError=>', error)
      throw createError(error)
    },
    ...options,
  })
}
