import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'
import {createPaginationReducer} from 'fl-redux-utils'
import {TYPES} from './actions'

const pagination = createPaginationReducer('ORGANISATION')

const defaultState = fromJS({
  models: {},
  pagination: pagination(),
})

export default function reducer(state=defaultState, action={}) {

  switch (action.type) {
    case TYPES.ORGANISATION_LOAD + '_START':
    case TYPES.ORGANISATION_SAVE + '_START':
    case TYPES.ORGANISATION_DELETE + '_START':
      return state.merge({loading: true, errors: null})

    case TYPES.ORGANISATION_LOAD + '_ERROR':
    case TYPES.ORGANISATION_SAVE + '_ERROR':
    case TYPES.ORGANISATION_DELETE + '_ERROR':
      return state.merge({loading: false, errors: action.error || action.res.body.error})

    case TYPES.ORGANISATION_LOAD +'_SUCCESS':
      const ss = state.mergeDeep({
        loading: false,
        errors: null,
        models: action.models,
        pagination: pagination(state.get('pagination'), action),
      })
      return ss

    case TYPES.ORGANISATION_SAVE + '_SUCCESS':
      return state.mergeDeep({
        loading: false,
        errors: null,
        models: action.models,
      })

    case TYPES.ORGANISATION_DELETE + '_SUCCESS':
      const models = (state.get('models') || {}).toJSON()
      delete models[action.deletedId]
      return state.merge({
        loading: false,
        errors: null,
        models: models,
      })

    case TYPES.ORGANISATION_COUNT +'_SUCCESS':
      return state.mergeDeep({
        pagination: pagination(state.get('pagination'), action),
      })

    default:
      return state

  }
}
