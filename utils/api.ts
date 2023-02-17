import Http from '@/utils/request'
import type { Article, PageInfo, Response } from '~/types/api'

export const getArticles = (pageNum = 1, pageSize = 15) => {
  return useAsyncData<Response<PageInfo<Article>>>(() => Http.get(`/article?pageNum=${pageNum}pageSize=${pageSize}`))
}

export const queryArticle = (id: string) => {
  return useAsyncData<Response<Article>>(() => Http.get(`/article/${id}`))
}
