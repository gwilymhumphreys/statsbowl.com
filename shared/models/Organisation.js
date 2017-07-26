import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class Organisation extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/organisation'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

Organisation.prototype.urlRoot = '/api/organisations'
Organisation.prototype.sync = require('backbone-http').sync(Organisation)
