import type { HeaderInfo, Master } from '~/types'

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
export const useCatelog = () => {
  return {
    data: useState('catelog', () => []),
    show: ref(false),
  }
}

export const useHeaderInfo = () => useState<HeaderInfo>('headerInfo', () => {
  return {
    like: 0,
    title: '',
    id: '',
    type: '',
  }
})
