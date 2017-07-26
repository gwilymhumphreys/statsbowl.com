import _ from 'lodash'
console.log('Parsing teamMatches')
const teammatchData = require('../../../data/teamMatches_raw.json')

const rows = teammatchData.Data.rows
const cols = teammatchData.Data.cols
const teamMatches = []

_.forEach(rows, row => {
  const teammatch = {}
  _.forEach(cols, (col, i) => {
    teammatch[col] = row[i]
  })
  teamMatches.push(teammatch)
})

require('fs').writeFileSync('../data/teamMatches.json', JSON.stringify(teamMatches, null, 2))

console.log('Wrote', teamMatches.length, 'teamMatches')

export default teamMatches
