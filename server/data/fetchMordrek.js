import request from 'superagent'

const QUERY_URL = 'http://www.mordrek.com:8888/Query'

// should work but doesn't
export default function(query, callback) {

  // console.log('seding query', query)
  request
    .post(QUERY_URL)
    .type('form')
    .field('query', query)
    .end((err, res) => {
      console.log('Mordrek sent', err, res && res.status, res && res.body)
      if (err) return callback(err)
      callback(null, res.body)
    })

}

//     .field('wheres', `{
//   "id": "r",
//   "type": "AND",
//   "left": {
//     "type": "single",
//     "col": "competitionname",
//     "op": "=",
//     "value": "Champion Ladder VII"
//   },
//   "right": {
//     "id": "pand",
//     "type": "AND",
//     "left": {
//       "id": "plid",
//       "type": "single",
//       "col": "leaguename",
//       "value": "Cabalvision Official League",
//       "op": "="
//     },
//     "right": {
//       "id": "plat",
//       "type": "single",
//       "col": "platform",
//       "value": "pc",
//       "op": "="
//     }
//   }
// }`)
//     .field('groups', `[
//   {
//     "col": "<none>"
//   }
// ],`)
//     .field('orders', `[
//   {
//     "col": "finished"
//   }
// ],`)
//     .field('filters', `[]`)
//     .field('presentation', `{
//   "from": "1",
//   "max": "200",
//   "show": "<standard>",
//   "alias": [],
//   "gui": "table"
// }`)