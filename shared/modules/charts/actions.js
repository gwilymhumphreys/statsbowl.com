import _ from 'lodash' // eslint-disable-line
import request from 'superagent'
import Game from '../../models/Game'

export const TYPES = {
  GAME_LOAD: 'GAME_LOAD',
  GAME_COUNT: 'GAME_COUNT',
}

/*
  Games
*/
export function loadGames(query, callback) {
  query.$sort = '-createdDate'
  return {
    type: TYPES.GAME_LOAD,
    request: Game.cursor(query),
    callback,
  }
}

export function loadGamesPage(page, query, callback) {
  return {
    page,
    type: TYPES.GAME_LOAD,
    request: Game.cursor(query),
    callback,
  }
}

export function countGames(query, callback) {
  return {
    type: TYPES.GAME_COUNT,
    request: Game.cursor(_.merge({}, query, {$count: true})),
    callback,
  }
}
