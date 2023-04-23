import { http } from '~/utils/request'
import type { Article, AsyncResponse, Category, Comment, CommentForm, Friend, FriendForm, Master, Note, PageInfo, Picture, PictureParams, Say, SearchResult, SongInfo } from '~/types/api'

interface ArticleQuery {
  category?: string
  pageNum?: number
  pageSize?: number
}

export const getMaster = (): AsyncResponse<Master> => {
  return http('/master')
}

export const getArticles = (query?: ArticleQuery): AsyncResponse<PageInfo<Article>> => {
  return http('/article', {
    query,
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
export const queryCategoryList = (): AsyncResponse<Category[]> => {
  return http('/category')
}

export const querySayList = (): AsyncResponse<PageInfo<Say>> => {
  return http('/say')
}

export const queryTop = (size?: number): AsyncResponse<{
  posts: Array<Article>
  notes: Array<Note>
}> => {
  return http('/top', {
    params: {
      size,
    },
  })
}

export const queryPictures = (params?: PictureParams): AsyncResponse<PageInfo<Picture>> => {
  return http('/picture', {
    params,
  })
}

export const search = (params: { title?: string; label?: string }): AsyncResponse<SearchResult> => {
  return http('/search', {
    params,
  })
}

export const queryFriends = (): AsyncResponse<Array<Friend>> => {
  return http('/friends')
}

export const applicationFriendLink = (data: FriendForm): AsyncResponse<Array<Friend>> => {
  return http('/friends', {
    method: 'post',
    body: data,
  })
}

interface Song {
  name: string
  artist: string
  url: string
  pic: string
  lrc: string
}

export const queryPlaylist = (id: number): Promise<SongInfo[]> => {
  return $fetch(`/meting/?type=playlist&id=${id}`, {
    baseURL: 'https://api.injahow.cn',
  })
}

export const querySongInfo = (id: string | number): Promise<any> => {
  return $fetch(`/song/detail?ids=${id}`, {
    baseURL: 'https://music.dvaren.xyz',
  })
}
export const querySongurl = (id: string | number): Promise<any> => {
  return $fetch(`/song/url/v1?id=${id}&level=exhigh`, {
    baseURL: 'https://music.dvaren.xyz',
  })
}
export const queryLyric = (id: string | number): Promise<any> => {
  return $fetch(`/lyric?id=${id}`, {
    baseURL: 'https://music.dvaren.xyz',
  })
}
