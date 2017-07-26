import _ from 'lodash' // eslint-disable-line
import Activity from '../models/Activity'
import ACTIVITY_TYPES from '../../shared/consts/activity_types'

function logError(err) {
  if (!err) return
  console.trace('Error tracking activity:', err, data)
}

export function trackNewUser(userInfo, _callback) {
  const {profile, user} = userInfo
  const data = {type: ACTIVITY_TYPES.USER_SIGNUP, profile_id: profile.id, user_id: user.id}
  const activity = new Activity(data)
  const callback = _callback || (err => err && logError(err, data))
  activity.save(err => {
    if (err) return callback(err)
    const activitiesController = require('../api').controllers.Activities
    if (!activitiesController) return callback()
    activitiesController.clearCache(callback)
  })
}
