import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import Game from '../server/models/Game'

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
      if (_game.teamnameopp === 'Nobody Expects the Boot' || _game.teamname === 'Nobody Expects the Boot') {
        console.dir(_game, {colors: true})
      }
      const game = new Game(_game)
      models.games.push(game)
      game.save(callback)
    })
  })

  queue.await(err => callback(err, models))
}
