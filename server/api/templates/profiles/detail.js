import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'

const template = (_profiles, options, callback) => {
  let single = false
  let profiles = _profiles
  if (!_.isArray(profiles)) {
    single = true
    profiles = [profiles]
  }
  const queue = new Queue()

  queue.await(err => {
    if (err) return callback(err)
    _.forEach(profiles, profile => {

      if (!profile.nickname) profile.nickname = `${profile.firstName} ${profile.lastName}`

    })
    callback(null, single ? profiles[0] : profiles)
  })
}

template.$raw = true
export default template
