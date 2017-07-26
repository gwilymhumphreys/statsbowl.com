import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) console.log('Missing process.env.DATABASE_URL')

export default class Organisation extends Backbone.Model {
  url = `${dbUrl}/organisations`

  schema = () => _.extend({
    games: () => ['hasMany', require('./Game')],
  }, require('../../shared/models/schemas/organisation'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

Organisation.prototype.sync = smartSync(dbUrl, Organisation)
