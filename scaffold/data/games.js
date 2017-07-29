import parseMordrek from '../../server/data/parseMordrek'
import parseGamesFromMatches from '../../server/data/parseGamesFromMatches'

const teamMatches = parseMordrek(require('../../../data/teamMatches_raw.json'), '../data/teamMatches.json')
const leagueMatches = parseMordrek(require('../../../data/leagueMatches_raw.json'), '../data/leagueMatches.json')

const games = parseGamesFromMatches(teamMatches, leagueMatches, '../data/games.json')
export default games
