import dayjs from 'dayjs'

export const dateFormat = (date: string, format: string = 'MMM DD') => {
  return dayjs(date).format(format) + 'th'
}
