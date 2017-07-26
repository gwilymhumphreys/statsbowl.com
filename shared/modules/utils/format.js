import moment from 'moment'

export function formatDate(date) {
  if (!date) return ''
  return moment(date).format('LL')
}

export function formatDatetime(datetime) {
  if (!datetime) return ''
  return moment(datetime).format('Do MMMM, h:mm a')
}

export function formatDateDuration(date) {
  if (!date) return ''
  return moment.duration(moment().diff(date)).humanize()
}

export function formatDateFrom(date) {
  if (!date) return ''
  return moment(date).from(moment())
}

export function formatLocation(loc) {
  let locationStr = ''
  if (loc.city) locationStr = `${loc.city}, `
  if (loc.country) locationStr = `${locationStr}${loc.country}`
  if (!locationStr) locationStr = 'Earth'
  return locationStr
}
