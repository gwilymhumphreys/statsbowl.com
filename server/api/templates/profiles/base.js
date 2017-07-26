import _ from 'lodash' // eslint-disable-line
import Inflection from 'inflection'
import schema from '../../../../shared/models/schemas/profile'

export default {
  $select: ['id', 'user_id', ..._.keys(schema)],
  displayName: (profile, options, callback) => {
    if (!profile.get('nickname') && !profile.get('firstName') && !profile.get('lastName')) return callback(null, 'A very mysterious person')
    callback(null, profile.get('nickname') || `${profile.get('firstName')} ${profile.get('lastName')}`)
  },
}
