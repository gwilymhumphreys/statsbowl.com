import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class Profile extends Backbone.Model {
  schema = () => _.extend({

    // Don't specify the user relation on the client to save headaches when updating profiles
    // user: () => ['belongsTo', require('./User')],

  }, require('./schemas/profile'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

Profile.prototype.urlRoot = '/api/profiles'
Profile.prototype.sync = require('backbone-http').sync(Profile)
