import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class User extends Backbone.Model {
  schema = () => _.extend({

    // Don't specify the profile relation on the client to save headaches when updating profiles
    // profile: () => ['hasOne', require('./Profile')],
    // tags: () => ['hasMany', require('./Tag')],
    // educations: () => ['hasMany', require('./Education')],
    // workExperiences: () => ['hasMany', require('./WorkExperience')],

    // links: () => ['hasMany', require('./Link')],

    // impacts: () => ['hasMany', require('./Impact'), {as: 'creator'}],
    // notes: () => ['hasMany', require('./Note'), {as: 'creator'}],
    // files: () => ['hasMany', require('./File'), {as: 'creator'}],

    // organisation: () => ['belongsTo', require('./Organisation')],

  }, require('./schemas/user'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

User.prototype.urlRoot = '/api/users'
User.prototype.sync = require('backbone-http').sync(User)
