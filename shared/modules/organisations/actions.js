import _ from 'lodash' // eslint-disable-line
import Organisation from '../../models/Organisation'

export const TYPES = {
  ORGANISATION_COUNT: 'ORGANISATION_COUNT',
  ORGANISATION_LOAD: 'ORGANISATION_LOAD',
  ORGANISATION_SAVE: 'ORGANISATION_SAVE',
  ORGANISATION_DELETE: 'ORGANISATION_DELETE',
}

export function count(query, callback) {
  return {
    type: TYPES.ORGANISATION_COUNT,
    request: callback => Organisation.count(query, callback),
    callback,
  }
}

export function load(query, callback) {
  return {
    type: TYPES.ORGANISATION_LOAD,
    request: Organisation.cursor(query),
    callback,
  }
}

export function loadPage(page, query, callback) {
  return {
    page,
    type: TYPES.ORGANISATION_LOAD,
    request: Organisation.cursor(query),
    callback,
  }
}

export function save(data, callback) {
  const model = new Organisation(data)
  return {
    type: TYPES.ORGANISATION_SAVE,
    request: model.save.bind(model),
    callback,
  }
}

export function del(data, callback) {
  const model = new Organisation(data)
  return {
    type: TYPES.ORGANISATION_DELETE,
    request: model.destroy.bind(model),
    deletedId: model.id,
    callback,
  }
}
