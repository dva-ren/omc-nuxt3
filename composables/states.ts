import type { Master } from '~/types'

export const useMaster = () => useState<Master>('master', () => {
  return {
    id: '',
    avatar: '',
    introduce: '',
    mail: '',
    username: '',
    nickname: '',
  }
})
export const useCatelog = () => useState('catelog')

export const useHeaderInfo = () => useState('headerInfo', () => {
  return {
    like: undefined,
    title: '',
    id: '',
    type: '',
  }
})
