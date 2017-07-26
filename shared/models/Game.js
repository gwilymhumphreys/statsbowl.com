import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'

export default class Game extends Backbone.Model {
  schema = () => _.extend({

  }, require('./schemas/game'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

Game.prototype.urlRoot = '/api/games'
Game.prototype.sync = require('backbone-http').sync(Game)
