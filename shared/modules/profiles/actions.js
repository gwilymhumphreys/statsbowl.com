import _ from 'lodash' // eslint-disable-line
import request from 'superagent'
import Profile from '../../models/Profile'

// These actions are for user profiles
// For user actions see `fl-auth-redux`
// Profiles are created by the User model on the server when a new user registers

export const TYPES = {
  PROFILE_LOAD: 'PROFILE_LOAD',
  PROFILE_COUNT: 'PROFILE_COUNT',
  PROFILE_SAVE: 'PROFILE_SAVE',
  PROFILE_PLACE_LOAD: 'PROFILE_PLACE_LOAD',
}

export function load(query, callback) {
  return {
    type: TYPES.PROFILE_LOAD,
    request: Profile.cursor(query),
    callback,
  }
}

export function loadActiveProfile(query, callback) {
  query.$one = true
  return {
    type: TYPES.PROFILE_LOAD,
    active: true,
    request: Profile.cursor(query),
    callback,
  }
}

export function save(profile, callback) {
  const model = new Profile(profile)
  return {
    type: TYPES.PROFILE_SAVE,
    request: model.save.bind(model),
    callback,
  }
}

export function count(query, callback) {
  return {
    type: TYPES.PROFILE_COUNT,
    request: Profile.cursor(_.merge({}, query, {$count: true})),
    callback,
  }
}

export function loadPage(page, query, callback) {
  return {
    page,
    type: TYPES.PROFILE_LOAD,
    request: Profile.cursor(query),
    callback,
  }
}

export function loadPlaces(urlRoot, callback) {
  return {
    type: TYPES.PROFILE_PLACE_LOAD,
    request: request.get(`${urlRoot}/api/places/profiles`),
    callback,
  }
}
