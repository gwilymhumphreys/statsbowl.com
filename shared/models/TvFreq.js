import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class TvFreq extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/tvFreq'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

TvFreq.prototype.urlRoot = '/api/tv_freqs'
TvFreq.prototype.sync = require('backbone-http').sync(TvFreq)
