import type { Article, PageInfo, Response } from '~~/types'

export const getArticles = (id: string, pageNum = 1, pageSize = 15) => {
  return useAsyncData<Response<PageInfo<Article>>>(() => {

  })
}
