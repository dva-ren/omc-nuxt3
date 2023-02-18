import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import dayOfYear from 'dayjs/plugin/dayOfYear'

dayjs.extend(isLeapYear) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(dayOfYear)

export const dateFns = dayjs

export function formateDate(date: Date | string) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export function formateToLocal(date: Date | string) {
  return dayjs(date).format('YYYY 年 M 月 D 日 星期dd')
}

export function getOutOfDate(date: Date | string) {
  const duration = dayjs.duration(dayjs(date).diff(dayjs().startOf('day')))
  return duration.asMilliseconds() / 864000
}
export function getOutOfMouth(date: Date | string) {
  return (dayjs(date).date() / dayjs(date).daysInMonth() * 100).toFixed(6)
}
export function getOutOfYear(date: Date | string) {
  const d = dayjs(date)
  return (d.dayOfYear() / (d.isLeapYear() ? 366 : 365) * 100).toFixed(6)
}
export function formateToLocaleHasWeek(date: Date | string) {
  return dayjs(date).format('YYYY 年 M 月 d 日 dddd')
}
