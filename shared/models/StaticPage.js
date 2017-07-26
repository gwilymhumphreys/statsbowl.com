import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import Inflection from 'inflection'

export default class StaticPage extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/staticPage'))

  static slugify(string) { return Inflection.dasherize((string || '').toLowerCase()) }
  defaults() { return {createdDate: moment.utc().toDate()} }
}

StaticPage.prototype.urlRoot = '/api/static_pages'
StaticPage.prototype.sync = require('backbone-http').sync(StaticPage)
