import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import Inflection from 'inflection'
import Organisation from '../../../models/Organisation'

const template = (_games, options, callback) => {
  let single = false
  let games = _games
  if (!_.isArray(games)) {
    single = true
    games = [games]
  }

  const organisationQuery = {id: {$in: _(games).map('organisation_id').uniq().compact().value()}}
  let organisations = []
  const queue = new Queue()

  queue.defer(callback => Organisation.cursor(organisationQuery).toJSON((err, _organisations) => callback(err, organisations = _organisations)))

  queue.await(err => {
    if (err) return callback(err)
    _.forEach(games, game => {
      game.organisation = _.find(organisations, s => s.id === game.organisation_id)

      // game.paymentsString = (game.paymentTypes || []).join(' + ')
      // game.gameTypesString = (game.gameTypes || []).join(', ')
      // game.skillsString = (game.skillCategories || []).map(s => Inflection.capitalize(s)).join(', ')
      // game.sellingPointsString = (game.sellingPoints || []).join(', ')

    })
    callback(null, single ? games[0] : games)
  })
}

template.$raw = true
export default template
