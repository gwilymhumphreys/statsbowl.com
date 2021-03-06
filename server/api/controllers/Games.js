import _ from 'lodash' // eslint-disable-line
import RestController from 'fl-backbone-rest'
import {JSONUtils} from 'backbone-orm'
import {createAuthMiddleware} from 'fl-auth-server'
import schema from '../../../shared/models/schemas/game'

const whitelist = [
  'id',
  'organisation_id',
  'creator_id',
  'updater_id',
  ..._.keys(schema),
]

export function canAccess(options, callback) {
  const {user, req} = options
  if (!user) return callback(null, false)
  if (user.admin) return callback(null, true)
  if (req.method === 'GET') return callback(null, true)
  callback(null, false)
}

export default class GamesController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: require('../../models/Game'),
      route: '/api/games',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      templates: {
        base: require('../templates/games/base'),
        detail: require('../templates/games/detail'),
      },
      default_template: 'detail',
      whitelist: {
        create: whitelist,
        update: whitelist,
      },
    }, options))
  }
}
