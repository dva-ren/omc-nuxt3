let baseURL = 'http://localhost:4000'
const production = 'https://287j88r083.goho.co'

interface Options {
  params?: any
  body?: any
  query?: any
  method?: 'get' | 'post' | 'delete' | 'put'
}

export const http = (url: string, options?: Options): Promise<any> => {
  const { env } = useRuntimeConfig()
  if (process.client)
    baseURL = production
  if (env === 'prod')
    baseURL = production
  return $fetch(url, {
    onRequest: ({ request, options }) => {
      options.baseURL = options.baseURL === '/' ? baseURL : options.baseURL
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
