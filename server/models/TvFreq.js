import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) console.log('Missing process.env.DATABASE_URL')

export default class TvFreq extends Backbone.Model {
  url = `${dbUrl}/tv_freqs`

  schema = () => _.extend({

  }, require('../../shared/models/schemas/tvFreq'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

TvFreq.prototype.sync = smartSync(dbUrl, TvFreq)
