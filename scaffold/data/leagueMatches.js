import _ from 'lodash'

console.log('Parsing leagueMatches')
const gameData = require('../../../data/leagueMatches_raw.json')

const rows = gameData.Data.rows
const cols = gameData.Data.cols
const leagueMatches = []

_.forEach(rows, row => {
  const game = {}
  _.forEach(cols, (col, i) => {
    game[col] = row[i]
  })
  leagueMatches.push(game)
})

require('fs').writeFileSync('../data/leagueMatches.json', JSON.stringify(leagueMatches, null, 2))

console.log('Wrote', leagueMatches.length, 'leagueMatches')

export default leagueMatches
