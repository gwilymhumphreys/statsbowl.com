import _ from 'lodash' // eslint-disable-line
import RestController from 'fl-backbone-rest'
import {JSONUtils} from 'backbone-orm'
import {createAuthMiddleware} from 'fl-auth-server'
import schema from '../../../shared/models/schemas/tvFreq'
import TvFreq from '../../models/TvFreq'

const whitelist = [
  'id',
  ..._.keys(schema),
]

export function canAccess(options, callback) {
  const {user, req} = options
  if (user && user.admin) return callback(null, true)

  // Don't allow inclusion of related models by default
  const query = JSONUtils.parseQuery(req.query)
  if (query.$include) return callback(null, false, 'No $include')

  if (req.method === 'GET') return callback(null, true)

  // Check if the current user is authorised to edit this model here

  callback(null, false)
}

export default class TvFreqsController extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: TvFreq,
      route: '/api/tv_freqs',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      templates: {
        base: require('../templates/tvFreqs/base'),
      },
      default_template: 'base',
      whitelist: {
        create: whitelist,
        update: whitelist,
      },
    }, options))
  }
}
