import _ from 'lodash' // eslint-disable-line
import moment from 'moment'
import Backbone from 'backbone'
import {smartSync} from 'fl-server-utils'

const dbUrl = process.env.DATABASE_URL
if (!dbUrl) console.log('Missing process.env.DATABASE_URL')

export default class EmailCapture extends Backbone.Model {
  url = `${dbUrl}/email_captures`

  schema = () => _.extend({

  }, require('../../shared/models/schemas/emailCapture'))

  defaults() { return {createdDate: moment.utc().toDate()} }
}

EmailCapture.prototype.sync = smartSync(dbUrl, EmailCapture)
