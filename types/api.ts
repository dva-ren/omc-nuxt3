export interface Response<T> {
  code: number
  msg: string
  token?: string
  data: T
}
export type AsyncResponse<T> = Promise<Response<T>>

export interface PageParams {
  pageSize: number
  pageNum: string
}

export interface PageInfo<T> {
  total: number
  list: T[]
  pageNum: number
  pageSize: number
  size: number
  startRow: number
  endRow: number
  pages: number
  prePage: number
  nextPage: number
  isFirstPage: boolean
  isLastPage: boolean
  hasPreviousPage: boolean
  hasNextPage: boolean
  navigatePages: number
  navigatepageNums: number[]
  navigateFirstPage: number
  navigateLastPage: number
}

export interface Article {
  id: string
  summary: string
  title: string
  content: string
  categoryId: string
  categoryName: string
  label: string
  cover: string
  isTop: number
  status: number
  commentCount: number
  viewCount: number
  allowComment: number
  createBy: string
  createTime: string
  updateTime: string
  isDelete: number
}

export interface Note {
  id: string
  title: string
  summary: string
  categoryId: string
  content: string
  mood: string
  weather: string
  position: string
  cover: string
  musicId: string
  isTop: number
  status: number
  commentCount: number
  viewCount: number
  allowComment: number
  createTime: string
  updateTime: string
  isDelete: number
  publishTime: string
}

export interface Category {
  id: string
  name: string
  description: string
  pid: string
  status: number
  createTime: string
  updateTime: string
  isDelete: number
}

export interface Say {
  id: string
  content: string
  author: string
  origin: string
  isTop: number
  status: number
  createTime: string
  updateTime: string
  isDelete: number
}
/**
 * 用户信息
 */
export interface Master {
  id: string
  introduce: string
  mail: string
  url: string
  username: string
  nickname: string
  avatar: string
  socialIds: Array<{ key: string; value: string }>
  lastLoginIp: string
  lastLoginTime: string
  createTime: string
  updateTime: string
}

/**
 * 评论
 */
export interface CommentForm {
  ref: string
  refType: string
  author: string
  mail: string
  url: string
  content: string
  parent: string
  commentsIndex: number
  key: string
  location: string
  isWhispers: number
  avatar: string
}
export interface Comment extends CommentForm {
  id: string
  children: Comment[]
  status: number
  createTime: string
  updateTime: string
}
export interface SongInfo {
  id: string
  artist: string
  name: string
  pic: string
  url: string
  lrc: string
  time: string
}
export interface Playlist {
  coverImgUrl: string
  data: SongInfo[]
  id: number
  name: string
  playCount: number
}
export interface Netease {
  playlist: Playlist
  weekdata: Playlist
  alldata: Playlist
}

/**
 * 图片
 */
export interface Picture {
  id: string
  url: string
  nickname?: string
  position?: string
  labels?: string
  description?: string
  createTime: string
  updateTime: string
  isDelete: number
}

export interface PictureParams {
  pageNum?: number
  pageSize?: number
  labels?: string
}

export interface SearchResult {
  post: Array<Article>
  note: Array<Note>
}

export interface FriendForm {
  name: string
  avatar: string
  url: string
  description: string
}

export interface Friend extends FriendForm {
  id: string
  type: string
  isDelete: string
  createTime: string
}
