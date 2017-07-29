import _ from 'lodash'

export default function(rawJson, outputFilename) {

  const rows = rawJson.Data.rows
  const cols = rawJson.Data.cols
  const jsonObjects = []

  _.forEach(rows, row => {
    const game = {}
    _.forEach(cols, (col, i) => {
      game[col] = row[i]
    })
    jsonObjects.push(game)
  })

  if (outputFilename) {
    require('fs').writeFileSync(outputFilename, JSON.stringify(jsonObjects, null, 2))
    console.log('Wrote', jsonObjects.length, 'items to', outputFilename)
  }

  return jsonObjects
}
