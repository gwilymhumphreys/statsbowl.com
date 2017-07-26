import _ from 'lodash'

// Group games by home tv
export default (games, newTeamCutoff=1000) => {

  const gamesByTvDiff = {}
  const defaultFreq = tvdiff => ({
    tvdiff,
    count: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    winPercent: 0,
    gamePercent: 0,
    newTeamCutoff,
  })
  let skipCount = 0

  // Link home + away team games and file them under their 'vs' key, which seems to be how they're linked to leagueMatches
  _.forEach(games, game => {
    const tvdiff = Math.abs(+game.tvdiffhome)

    if (+game.valuehome <= newTeamCutoff && +game.valueaway <= newTeamCutoff) {
      skipCount++
      return
    }

    const freq = gamesByTvDiff[tvdiff] || defaultFreq(tvdiff)
    freq.count++

    // Use away data if home is the underdog
    if (game.tvdiffhome <= 0) {
      if (+game.winaway) freq.wins++
      else if (+game.drawaway) freq.draws++
      else freq.losses++
    }
    else {
      if (+game.winhome) freq.wins++
      else if (+game.drawhome) freq.draws++
      else freq.losses++
    }

    freq.winPercent = +((freq.wins + freq.draws/2) / freq.count * 100).toFixed(2)
    freq.gamePercent = +(freq.count / games.length * 100).toFixed(2)
    gamesByTvDiff[tvdiff] = freq
  })

  const tvFreqs = _(gamesByTvDiff).values().sortBy(f => f.tvdiff).value()

  console.log('SKIPPED ', skipCount, 'games')
  return tvFreqs
}
