import _ from 'lodash' // eslint-disable-line
import request from 'superagent'
import Game from '../../models/Game'

export const TYPES = {
  JOB_LOAD: 'JOB_LOAD',
  JOB_COUNT: 'JOB_COUNT',
  JOB_SAVE: 'JOB_SAVE',
  JOB_DELETE: 'JOB_DELETE',
  JOB_LOCATION_LOAD: 'JOB_LOCATION_LOAD',
}

/*
  Games
*/
export function loadGames(query, callback) {
  query.$sort = '-createdDate'
  return {
    type: TYPES.JOB_LOAD,
    request: Game.cursor(query),
    callback,
  }
}

export function loadGamesPage(page, query, callback) {
  return {
    page,
    type: TYPES.JOB_LOAD,
    request: Game.cursor(query),
    callback,
  }
}

export function countGames(query, callback) {
  return {
    type: TYPES.JOB_COUNT,
    request: Game.cursor(_.merge({}, query, {$count: true})),
    callback,
  }
}

export function saveGame(data, callback) {
  data.updatedDate = new Date()
  const model = new Game(data)

  return {
    type: TYPES.JOB_SAVE,
    request: model.save.bind(model),
    callback,
  }
}

export function deleteGame(data, callback) {
  const model = new Game(data)
  return {
    type: TYPES.JOB_DELETE,
    request: model.destroy.bind(model),
    organisationId: data.organisation_id,
    deletedModel: data,
    callback,
  }
}

export function loadGameLocations(urlRoot, callback) {
  return {
    type: TYPES.JOB_LOCATION_LOAD,
    request: request.get(`${urlRoot}/api/places/games`),
    callback,
  }
}
