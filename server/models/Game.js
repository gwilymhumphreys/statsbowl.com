import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) console.log('Missing process.env.DATABASE_URL')

export default class Game extends Backbone.Model {
  url = `${dbUrl}/games`

  schema = () => _.extend({

  }, require('../../shared/models/schemas/game'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

Game.prototype.sync = smartSync(dbUrl, Game)
