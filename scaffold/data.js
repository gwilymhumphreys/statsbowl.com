import games from './data/games'

export default callback => {
  console.log('imported games', games.length)
  callback()
}
