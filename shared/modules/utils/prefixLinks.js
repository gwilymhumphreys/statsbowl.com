import _ from 'lodash'

const toPrefix = {
  websiteUrl: '',
  linkedInUrl: 'linkedin.com/in',
  facebookUrl: 'facebook.com',
  twitterUrl: 'twitter.com',
  instagramUrl: 'instagram.com',
  googlePlusUrl: 'plus.google.com',
  githubUrl: 'github.com',
}
const httpRegex = /(^http|^\/\/)/

export default function prefixLinks(data) {
  const newData = _.extend({}, data)

  _.forEach(toPrefix, (prefix, fieldName) => {
    let value = data[fieldName]
    if (!value || !_.isString(value)) return

    if (!value.match(httpRegex)) {
      if (value[0] === '@' || value[0] === '/') {
        value = `${prefix}/${value.slice(1)}`
      }
      if (prefix && !value.includes(prefix)) {
        value = `${prefix}/${value}`
      }
      value = `http://${value}`
    }
    newData[fieldName] = value
  })

  return newData
}

export function prefixUrl(url) {
  if (!url || !_.isString(url)) return ''
  if (!url.match(httpRegex)) return `http://${url}`
  return url
}
