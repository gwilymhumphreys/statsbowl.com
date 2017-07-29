import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import games from '../data/games'
import calcTvFreq from './calcTvFreq'
import calcTvFreqRanges from './calcTvFreqRanges'
import TvFreq from '../../server/models/TvFreq'
import TvFreqRange from '../../server/models/TvFreqRange'

export default callback => {

  const queue = new Queue()
  const cutoffs = [0, 1000]
  const roundingIntervals = [50, 100]

  _.forEach(cutoffs, newTeamCutoff => {

    const freqs = calcTvFreq(games, newTeamCutoff)
    _.forEach(freqs, _tvFreq => {
      queue.defer(callback => {
        const tvFreq = new TvFreq(_tvFreq)
        tvFreq.save(callback)
      })
    })

    _.forEach(roundingIntervals, roundingInterval => {
      const tvFreqRanges = calcTvFreqRanges(freqs, roundingInterval)
      console.log('tvFreqRanges', tvFreqRanges)

      _.forEach(tvFreqRanges, _tvFreqRange => {
        queue.defer(callback => {
          const tvFreqRange = new TvFreqRange(_tvFreqRange)
          tvFreqRange.save(callback)
        })
      })
    })
  })

  queue.await(callback)
}
