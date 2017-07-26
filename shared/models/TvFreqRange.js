import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class TvFreqRange extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/tvFreqRange'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

TvFreqRange.prototype.urlRoot = '/api/tv_freq_ranges'
TvFreqRange.prototype.sync = require('backbone-http').sync(TvFreqRange)
