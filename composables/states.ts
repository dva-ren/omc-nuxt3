import type { HeaderInfo, Master } from '~/types'
import type { Catelog } from '~/hooks/useCatalog'

export const useMaster = () => useState<Master>('master', () => {
  return {
    id: '',
    avatar: '',
    introduce: '',
    mail: '',
    username: '',
    nickname: '',
    socialIds: [],
    url: '',
    lastLoginIp: '',
    lastLoginTime: '',
    createTime: '',
    updateTime: '',
  }
})
export const useCatelogState = () => useState<{ data: Catelog[]; show: boolean }>('catelog', () => ({
  data: [],
  show: false,
}))

export const useHeaderInfo = () => useState<HeaderInfo>('headerInfo', () => {
  return {
    like: 0,
    title: '',
    id: '',
    type: '',
  }
})
