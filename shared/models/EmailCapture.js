import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class EmailCapture extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/emailCapture'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

EmailCapture.prototype.urlRoot = '/api/email_captures'
EmailCapture.prototype.sync = require('backbone-http').sync(EmailCapture)
