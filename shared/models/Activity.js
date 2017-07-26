import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class Activity extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/activity'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

Activity.prototype.urlRoot = '/api/activities'
Activity.prototype.sync = require('backbone-http').sync(Activity)
