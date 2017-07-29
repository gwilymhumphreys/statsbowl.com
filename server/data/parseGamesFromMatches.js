import _ from 'lodash'

const TM_FIELDS = [
  'win', 'draw', 'loss', 'tvdiff', 'conceded', 'concedereceived', 'value', 'cashspentinducements',
  'inflictedko', 'sustainedko', 'inflictedcasualties', 'sustainedcasualties', 'inflicteddead', 'sustaineddead', 'inflictedpushouts',
]
const OMIT_FIELDS = ['externalstats', 'idraceimghome', 'idraceimgaway']

const log = (...args) => console.log('[parsing games]', ...args)
const isMatch = (t1, t2) => {
  if (!t1 || !t2) return false
  return (t1.teamname === t2.teamnameopp && t1.coach === t2.coachopp) || (t2.teamname === t1.teamnameopp && t2.coach === t1.coachopp)
}

export default function(teamMatches, leagueMatches, outputFilename) {

  // Raw data has two entries per match; here we want to consolidate it into one
  const games = []
  const tmByVs = {}

  // Link home + away team games and file them under their 'vs' key, which seems to be how they're linked to leagueMatches
  _.forEach(teamMatches, (tm, i) => {
    if (isMatch(tm, teamMatches[i-1])) {
      tm.awayTeamMatch = teamMatches[i-1]
    }
    else if (isMatch(tm, teamMatches[i+1])) {
      tm.awayTeamMatch = teamMatches[i+1]
    }
    tmByVs[tm.vs] = tm
  })

  _.forEach(leagueMatches, leagueMatch => {
    const homeTeamMatch = tmByVs[leagueMatch.vs]
    if (!homeTeamMatch) return log('Missing homeTeamMatch for vs', leagueMatch.vs)

    const awayTeamMatch = homeTeamMatch.awayTeamMatch
    if (!awayTeamMatch) return log('Missing awayTeamMatch for vs', leagueMatch.vs, homeTeamMatch)

    const game = _.extend({}, _.omit(leagueMatch, OMIT_FIELDS))

    _.forEach(TM_FIELDS, field => {
      game[field+'home'] = homeTeamMatch[field]
      game[field+'away'] = awayTeamMatch[field]
    })

    game.date = new Date(game.date)
    games.push(game)
  })

  if (outputFilename) {
    require('fs').writeFileSync(outputFilename, JSON.stringify(games, null, 2))
    console.log('Wrote', games.length, 'games to', outputFilename)
  }

  return games
}
