interface TitleOptions {
  title: string
  icon?: string

}
const master = useMaster()
export const usePageTitle = (options: TitleOptions) => {
  useHead({
    title: `${options.title} - 灰色と青，不虚光阴`,
  })
}
