import { http } from '~/utils/request'
import type { Article, AsyncResponse, Category, Comment, CommentForm, Master, Note, PageInfo, Say } from '~/types/api'

export const getMaster = (): AsyncResponse<Master> => {
  return http('/master')
}

export const getArticles = (pageNum = 1, pageSize = 15): AsyncResponse<PageInfo<Article>> => {
  return http('/article', {
    query: {
      pageNum,
      pageSize,
    },
  })
}

export const queryArticle = (id: string): AsyncResponse<Article> => {
  return http(`/article/${id}`)
}

export const getNotes = (pageNum = 1, pageSize = 15): AsyncResponse<PageInfo<Note>> => {
  return http('/note', {
    query: {
      pageNum,
      pageSize,
    },
  })
}

export const queryNote = (id: string): AsyncResponse<Note> => {
  return http(`/note/${id}`)
}

export const queryComment = (id: string, pageNum = 1, pageSize = 15): AsyncResponse<PageInfo<Comment>> => {
  return http(`/comment/${id}`, {
    query: {
      pageNum,
      pageSize,
    },
  })
}
export const addComment = (data: CommentForm) => {
  return http('/comment', {
    method: 'post',
    body: data,
  })
}
export const queryCategoryList = (): AsyncResponse<Category> => {
  return http('/category')
}

export const querySongInfo = (id: string | number): AsyncResponse<Category> => {
  return http(`/music?id=${id}`)
}

export const querySayList = (): AsyncResponse<PageInfo<Say>> => {
  return http('/say')
}
