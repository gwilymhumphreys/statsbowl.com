import _ from 'lodash' // eslint-disable-line
import AppSettings from '../../models/AppSettings'
import StaticPage from '../../models/StaticPage'

export const TYPES = {
  APP_SETTINGS_LOAD: 'APP_SETTINGS_LOAD',
  STATIC_PAGE_LOAD: 'STATIC_PAGE_LOAD',
  INDUSTRY_LOAD: 'INDUSTRY_LOAD',
}

export function loadStaticPage(slug, callback) {
  const query = {slug, $one: true, $template: 'detail'}
  return {
    type: TYPES.STATIC_PAGE_LOAD,
    request: StaticPage.cursor(query),
    callback,
  }
}

export function loadAppSettings(callback) {
  return {
    type: TYPES.APP_SETTINGS_LOAD,
    request: AppSettings.cursor({$one: true}),
    callback,
  }
}

export function saveActivity(data, callback) {
  const model = new Activity(data)
  return {
    type: TYPES.ACTIVITY_SAVE,
    request: model.save.bind(model),
    callback,
  }
}
