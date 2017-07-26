import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) console.log('Missing process.env.DATABASE_URL')

export default class Activity extends Backbone.Model {
  url = `${dbUrl}/activities`

  schema = () => _.extend({

    user: () => ['belongsTo', require('./User')],
    profile: () => ['belongsTo', require('./Profile')],
    organisation: () => ['belongsTo', require('./Organisation')],
    game: () => ['belongsTo', require('./Game')],

  }, require('../../shared/models/schemas/activity'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

Activity.prototype.sync = smartSync(dbUrl, Activity)
