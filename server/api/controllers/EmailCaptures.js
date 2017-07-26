import _ from 'lodash' // eslint-disable-line
import RestController from 'fl-backbone-rest'
import {createAuthMiddleware} from 'fl-auth-server'

function canAccess(options, callback) {
  const {user, req} = options
  if (req.method === 'POST') return callback(null, true)
  if (!user) return callback(null, false)
  if (user.admin) return callback(null, true)
  callback(null, false)
}

export default class EmailCapturesController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: require('../../models/EmailCapture'),
      route: '/api/email_captures',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      whitelist: {

      },
    }, options))
  }
}
