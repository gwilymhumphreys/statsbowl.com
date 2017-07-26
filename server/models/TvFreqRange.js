import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) console.log('Missing process.env.DATABASE_URL')

export default class TvFreqRange extends Backbone.Model {
  url = `${dbUrl}/tv_freq_ranges`

  schema = () => _.extend({

  }, require('../../shared/models/schemas/tvFreqRange'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

TvFreqRange.prototype.sync = smartSync(dbUrl, TvFreqRange)
