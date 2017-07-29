import _ from 'lodash'
import warning from 'warning'

export default function parseFilterQuery(filters, defaults) {
  let filterQuery = {}
  if (filters) {
    try {
      filterQuery = JSON.parse(filters)
    }
    catch (err) {
      warning(false, err)
    }
  }
  return _.defaults(filterQuery, defaults)
}
