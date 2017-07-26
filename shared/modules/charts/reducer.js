import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'
import {createPaginationReducer} from 'fl-redux-utils'
import {TYPES} from './actions'

const defaultState = fromJS({
  errors: {},
  models: {},
})

export default function reducer(state=defaultState, action={}) {

  switch (action.type) {
    case TYPES.TV_FREQ_LOAD + '_START':
      return state.merge({loading: true, errors: {}})

    case TYPES.TV_FREQ_LOAD + '_ERROR':
      return state.merge({loading: false, errors: {games: action.error}})

    case TYPES.TV_FREQ_LOAD + '_SUCCESS':
      return state.merge({
        loading: false,
        errors: {},
      }).merge({
        [action.chart]: action.modelList,
      })

    default:
      return state

  }
}
