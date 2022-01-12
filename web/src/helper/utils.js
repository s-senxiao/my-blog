import dayjs from 'dayjs'

export function formatDate (time) {
  return dayjs(time).format('YYYY-MM-DD')
}