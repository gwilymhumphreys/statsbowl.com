import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import games from './data/games'
import calcTvFreq from '../server/data/calcTvFreq'
import calcTvFreqRanges from '../server/data/calcTvFreqRanges'
// import fetchMordrek from '../server/data/fetchMordrek'

export default callback => {
  const queue = new Queue()
  // let sum = 0
  // let total = 0

  // _.forEach(games, g => {
  //   if (g.teamhome === 'probably a mistake') {
  //     console.log(g.teamhome, g.tvdiffhome, g.valuehome, g.valueaway, g.teamaway)
  //     sum += +g.tvdiffhome
  //     total++
  //   }
  //   else if (g.teamaway === 'probably a mistake') {
  //     console.log(g.teamaway, g.tvdiffaway, g.valueaway, g.valuehome, g.teamhome)
  //     sum += +g.tvdiffaway
  //     total++
  //   }
  // })
  // const avg = sum/total
  // console.log('avg', avg)

  // const freqs = calcTvFreq(games, 1000)
  // const tvFreqRanges = calcTvFreqRanges(freqs, 50)
  // queue.await(callback)

  // const leageMatchesQuery = {"selects":["leaguematches"],"wheres":{"id":"r","type":"AND","left":{"type":"single","col":"competitionname","op":"=","value":"Champion Ladder VII"},"right":{"id":"pand","type":"AND","left":{"id":"plid","type":"single","col":"leaguename","value":"Cabalvision Official League","op":"="},"right":{"id":"plat","type":"single","col":"platform","value":"pc","op":"="}}},"groups":[{"col":"<none>"}],"orders":[{"col":"finished"}],"filters":[],"presentation":{"from":"1","max":"200","show":"<standard>","alias":[],"gui":"table"}}
  // const teamMatchesQuery = {"selects":["teammatches"],"wheres":{"id":"r","type":"AND","left":{"type":"single","col":"competitionname","op":"=","value":"Champion Ladder VII"},"right":{"id":"pand","type":"AND","left":{"id":"plid","type":"single","col":"leaguename","value":"Cabalvision Official League","op":"="},"right":{"id":"plat","type":"single","col":"platform","value":"pc","op":"="}}},"groups":[{"col":"<none>"}],"orders":[{"col":""}],"filters":[],"presentation":{"show":"<standard>","alias":[],"gui":"table","guiData":{"x":"","y":"","z":""}}}

  // const leageMatchesQuery = `{"selects":["leaguematches"],"wheres":{"id":"r","type":"AND","left":{"type":"single","col":"competitionname","op":"=","value":"Champion Ladder VII"},"right":{"id":"pand","type":"AND","left":{"id":"plid","type":"single","col":"leaguename","value":"Cabalvision Official League","op":"="},"right":{"id":"plat","type":"single","col":"platform","value":"pc","op":"="}}},"groups":[{"col":"<none>"}],"orders":[{"col":"finished"}],"filters":[],"presentation":{"from":"1","max":"200","show":"<standard>","alias":[],"gui":"table"}}`
  // const leageMatchesQuery = `{"selects":["leaguematches"],"wheres":{"id":"r","type":"AND","left":{"type":"single","col":"competitionname","op":"=","value":"Champion Ladder VII"},"right":{"id":"pand","type":"AND","left":{"id":"plid","type":"single","col":"leaguename","value":"Cabalvision Official League","op":"="},"right":{"id":"plat","type":"single","col":"platform","value":"pc","op":"="}}},"groups":[{"col":"<none>"}],"orders":[{"col":"finished"}],"filters":[],"presentation":{"from":"1","max":"200","show":"<standard>","alias":[],"gui":"table"}}`
  // const teamMatchesQuery = `{"selects":["teammatches"],"wheres":{"id":"r","type":"AND","left":{"type":"single","col":"competitionname","op":"=","value":"Champion Ladder VII"},"right":{"id":"pand","type":"AND","left":{"id":"plid","type":"single","col":"leaguename","value":"Cabalvision Official League","op":"="},"right":{"id":"plat","type":"single","col":"platform","value":"pc","op":"="}}},"groups":[{"col":"<none>"}],"orders":[{"col":""}],"filters":[],"presentation":{"show":"<standard>","alias":[],"gui":"table","guiData":{"x":"","y":"","z":""}}}`

  // fetchMordrek(leageMatchesQuery, callback)
}

// {
//   "selects": [
//     "leaguematches"
//   ],
//   "wheres": {
//     "id": "r",
//     "type": "AND",
//     "left": {
//       "type": "single",
//       "col": "competitionname",
//       "op": "=",
//       "value": "Champion Ladder VII"
//     },
//     "right": {
//       "id": "pand",
//       "type": "AND",
//       "left": {
//         "id": "plid",
//         "type": "single",
//         "col": "leaguename",
//         "value": "Cabalvision Official League",
//         "op": "="
//       },
//       "right": {
//         "id": "plat",
//         "type": "single",
//         "col": "platform",
//         "value": "pc",
//         "op": "="
//       }
//     }
//   },
//   "groups": [
//     {
//       "col": "<none>"
//     }
//   ],
//   "orders": [
//     {
//       "col": "finished"
//     }
//   ],
//   "filters": [],
//   "presentation": {
//     "from": "1",
//     "max": "200",
//     "show": "<standard>",
//     "alias": [],
//     "gui": "table"
//   }
// }
