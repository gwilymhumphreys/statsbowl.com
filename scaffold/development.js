import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import Game from '../server/models/Game'
import TvFreq from '../server/models/TvFreq'
import TvFreqRange from '../server/models/TvFreqRange'
import calcTvFreq from './functions/calcTvFreq'
import calcTvFreqRanges from './functions/calcTvFreqRanges'

const toScaffold = {
  users: {
    adminUser: {
      email: 'admin@statsbowl.com',
      password: 'statsbowl',
      admin: true,
      profile: {
        nickname: 'Admin McAdminson',
        firstName: 'Admin',
        lastName: 'McAdminson',
      },
    },
  },
}

const games = require('./data/games')
const models = {}

export default function scaffold(callback) {
  const queue = new Queue(10)

  queue.defer(callback => {
    require('./shared')(toScaffold, (err, _models) => callback(err, _.extend(models, _models)))
  })

  models.games = []
  console.log('Inserting', games.length, 'games')
  _.forEach(games, (_game, i) => {
    queue.defer(callback => {
      const game = new Game(_game)
      models.games.push(game)
      game.save(callback)
    })
  })

  models.tvFreqs = []
  console.log('Inserting', games.length, 'games')
  _.forEach(calcTvFreq(games), (_tvFreq, i) => {
    queue.defer(callback => {
      const tvFreq = new TvFreq(_tvFreq)
      models.tvFreqs.push(tvFreq)
      tvFreq.save(callback)
    })
  })

  models.tvFreqRanges = []
  const tvFreqRanges = calcTvFreqRanges(freqs)
  console.log('tvFreqRanges', tvFreqRanges)
  _.forEach(tvFreqRanges, _tvFreqRange => {
    queue.defer(callback => {
      const tvFreqRange = new TvFreqRange(_tvFreqRange)
      models.tvFreqRanges.push(tvFreqRange)
      tvFreqRange.save(callback)
    })
  })

  queue.await(err => callback(err, models))
}
