import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import games from './data/games'
import TvFreq from '../server/models/TvFreq'
import TvFreqRange from '../server/models/TvFreqRange'
import calcTvFreq from './functions/calcTvFreq'
import calcTvFreqRanges from './functions/calcTvFreqRanges'

export default callback => {
  const queue = new Queue()

  const freqs = calcTvFreq(games)
  // console.log('freqs', freqs)
  _.forEach(freqs, _tvFreq => {
    queue.defer(callback => {
      const tvFreq = new TvFreq(_tvFreq)
      tvFreq.save(callback)
    })
  })

  const tvFreqRanges = calcTvFreqRanges(freqs)
  console.log('tvFreqRanges', tvFreqRanges)
  _.forEach(tvFreqRanges, _tvFreqRange => {
    queue.defer(callback => {
      const tvFreqRange = new TvFreqRange(_tvFreqRange)
      tvFreqRange.save(callback)
    })
  })

  queue.await(callback)

}
