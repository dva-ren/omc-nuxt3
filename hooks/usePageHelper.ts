interface PageInfo {
  pageSize: number
  pageNum: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
const defaultValue: PageInfo = {
  pageNum: 1,
  pageSize: 10,
  hasPreviousPage: false,
  hasNextPage: false,
}
export function usePageHelper(initValue: PageInfo = defaultValue) {
  return {
    pageNum: ref(initValue.pageNum),
    pageSize: ref(initValue.pageSize),
    hasPreviousPage: ref(initValue.hasPreviousPage),
    hasNextPage: ref(initValue.hasNextPage),
  }
}
