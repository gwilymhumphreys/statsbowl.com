import _ from 'lodash'

// Group tvFreqs by home tv
export default (tvFreqs, roundingInterval=50) => {

  const tvFreqRanges = {}
  const defaultFreq = (upperTv, staticData) => _.extend({
    label: `${upperTv-roundingInterval} - ${upperTv}`,
    roundingInterval: roundingInterval,
    lowerTv: upperTv-roundingInterval,
    upperTv,
    count: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    winPercent: 0,
  }, staticData)

  const totalGames = _.sumBy(tvFreqs, f => f.count)
  console.log('totalGames', totalGames)
  // Link home + away team tvFreqs and file them under their 'vs' key, which seems to be how they're linked to leagueMatches
  _.forEach(tvFreqs, tvFreq => {
    const upperTv = tvFreq.tvdiff + (roundingInterval - (tvFreq.tvdiff % roundingInterval))
    const freqRange = tvFreqRanges[upperTv] || defaultFreq(upperTv, {newTeamCutoff: tvFreq.newTeamCutoff})

    freqRange.count += tvFreq.count
    freqRange.wins += tvFreq.wins
    freqRange.draws += tvFreq.draws
    freqRange.losses += tvFreq.losses

    freqRange.winPercent = +((freqRange.wins + freqRange.draws/2) / freqRange.count * 100).toFixed(2)
    freqRange.gamePercent = +(freqRange.count / totalGames * 100).toFixed(2)
    freqRange.gamePercent = +(freqRange.count / totalGames * 100).toFixed(2)

    tvFreqRanges[upperTv] = freqRange
  })

  const ranges = _(tvFreqRanges).values().sortBy(f => f.upperTv).value()

  const sumOver150 = _.sumBy(ranges, r => r.upperTv > 150 ? r.gamePercent : 0)
  console.log('sumOver 150', sumOver150)

  const sumOver250 = _.sumBy(ranges, r => r.upperTv > 250 ? r.gamePercent : 0)
  console.log('sumOver 250', sumOver250)

  return ranges
}
