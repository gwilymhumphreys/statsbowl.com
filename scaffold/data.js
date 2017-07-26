import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import games from './data/games'
import calcTvFreq from './functions/calcTvFreq'
import calcTvFreqRanges from './functions/calcTvFreqRanges'

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

  const freqs = calcTvFreq(games, 1000)
  const tvFreqRanges = calcTvFreqRanges(freqs, 50)
  queue.await(callback)
}
