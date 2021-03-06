import _ from 'lodash' // eslint-disable-line
import RestController from 'fl-backbone-rest'
import {createAuthMiddleware} from 'fl-auth-server'

function canAccess(options, callback) {
  const {user, req} = options
  if (req.method === 'GET') return callback(null, true)
  if (!user) return callback(null, false)
  if (user.admin) return callback(null, true)
  callback(null, false)
}

export default class ActivitiesController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: require('../../models/Activity'),
      route: '/api/activities',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      templates: {
        base: require('../templates/activities/base'),
      },
      default_template: 'base',
    }, options))
  }
}
