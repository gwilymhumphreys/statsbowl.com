import _ from 'lodash'
import Queue from 'queue-async'
import Inflection from 'inflection'

import {trackNewUser} from '../server/activity'
import StaticPage from '../server/models/StaticPage'
import User from '../server/models/User'
import AppSettings from '../server/models/AppSettings'

const defaults = {
  appSettings: {
    facebookUrl: 'https://facebook.com/',
    twitterUrl: 'https://twitter.com/',
    instagramUrl: 'https://instagram.com/',
    footerContactInfo: `
      XX Fake st<br />
      Sydney<br />
      NSW 2000<br />
      Australia`,
  },
  staticPages: [
    {title: 'About Us'},
    {title: 'FAQ'},
    {title: 'Privacy', content: '<p>privacy content</p>'},
    {title: 'Terms of Service', content: '<p>terms content</p>'},
  ],
}
const models = {}

export default function scaffold(_toScaffold, callback) {
  const toScaffold = _.extend(defaults, _toScaffold)
  const queue = new Queue(1)
  models.users = {}

  _.forEach(toScaffold.users, (_user, key) => {
    queue.defer(callback => {
      console.log('Creating user', _user.profile.nickname)
      User.findOne({email: _user.email}, (err, existingUser) => {
        if (err) return callback(err)
        if (existingUser) {
          models.users[key] = existingUser
          return callback()
        }
        const user = new User(_user)
        models.users[key] = user
        user.set({password: User.createHash(user.get('password'))})
        user.save(err => {
          if (err) return callback(err)
          user.get('profile').save({contactEmail: user.get('email')}, (err, profile) => {
            if (err) return callback(err)
            trackNewUser({user: user.toJSON(), profile: profile.toJSON()}, callback)
          })
        })
      })
    })
  })

  queue.defer(callback => AppSettings.findOrCreate(toScaffold.appSettings, callback))

  models.staticPages = []
  _.forEach(toScaffold.staticPages, (_staticPage, i) => {
    queue.defer(callback => {
      console.log('Creating page', _staticPage.title)
      const pageDefaults = {visible: true, showInFooter: true, order: i, slug: StaticPage.slugify(_staticPage.title)}
      const staticPage = new StaticPage(_.extend(pageDefaults, _staticPage))
      models.staticPages.push(staticPage)
      staticPage.save(callback)
    })
  })

  queue.await(err => callback(err, models))
}
