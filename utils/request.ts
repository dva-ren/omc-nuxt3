interface Options {
  params?: any
  body?: any
  query?: any
  method?: 'get' | 'post' | 'delete' | 'put'
}

export const http = (url: string, options?: Options): Promise<any> => {
  const env = useRuntimeConfig()
  const baseUrl = env.public.VITE_REQUEST_BASE_URL
  return $fetch(url, {
    onRequest: ({ request, options }) => {
      options.baseURL = options.baseURL === '/' ? baseUrl : options.baseURL
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
