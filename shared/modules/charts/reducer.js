import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'
import {createPaginationReducer} from 'fl-redux-utils'
import {TYPES} from './actions'

const pagination = createPaginationReducer('GAME')

const defaultState = fromJS({
  errors: {},
  models: {},
  pagination: pagination(),
})

export default function reducer(state=defaultState, action={}) {

  switch (action.type) {
    case TYPES.GAME_LOAD + '_START':
      return state.merge({loading: true, errors: {}})

    case TYPES.GAME_LOAD + '_ERROR':
      return state.merge({loading: false, errors: {games: action.error}})

    case TYPES.GAME_LOAD + '_SUCCESS':
      return state.merge({
        loading: false,
        errors: {},
        pagination: pagination(state.get('pagination'), action),
      }).mergeDeep({
        models: action.models,
      })

    case TYPES.GAME_COUNT + '_SUCCESS':
      return state.merge({
        pagination: pagination(state.get('pagination'), action),
      })

    default:
      return state

  }
}
