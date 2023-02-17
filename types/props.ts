export interface NavItem {
  name: string
  url: string
  icon: string
  children?: Array<{
    name: string
    url: string
    icon?: string
  }>
}

export interface HeaderInfo {
  id: string
  title: string
  type: string
  like?: number
}
