import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'
import {createGroupByReducer} from 'fl-redux-utils'
import {createPaginationReducer} from 'fl-redux-utils'
import {TYPES} from './actions'

const pagination = createPaginationReducer('JOB')

const byOrganisation = createGroupByReducer(
  [TYPES.JOB_LOAD + '_SUCCESS', TYPES.JOB_DELETE + '_SUCCESS'],
  game => game && game.startup_id && game.startup_id.toString(),
)

const defaultState = fromJS({
  errors: {},
  models: {},
  locations: {
    locations: [],
  },
  byOrganisation: byOrganisation(),
  pagination: pagination(),
})

export default function reducer(state=defaultState, action={}) {

  switch (action.type) {
    case TYPES.JOB_LOAD + '_START':
    case TYPES.JOB_SAVE + '_START':
    case TYPES.JOB_DELETE + '_START':
      return state.merge({loading: true, errors: {}})

    case TYPES.JOB_LOAD + '_ERROR':
    case TYPES.JOB_SAVE + '_ERROR':
    case TYPES.JOB_DELETE + '_ERROR':
      return state.merge({loading: false, errors: {games: action.error}})

    case TYPES.JOB_LOAD + '_SUCCESS':
      return state.merge({
        loading: false,
        errors: {},
        byOrganisation: byOrganisation(state.get('byOrganisation'), action),
        pagination: pagination(state.get('pagination'), action),
      }).mergeDeep({
        models: action.models,
      })

    case TYPES.JOB_COUNT + '_SUCCESS':
      return state.merge({
        pagination: pagination(state.get('pagination'), action),
      })

    case TYPES.JOB_SAVE + '_SUCCESS':
      const startupId = action.model.startup_id.toString()
      const currentList = state.get('byOrganisation').get(startupId) ? state.get('byOrganisation').get(startupId).toJSON() : []
      currentList.push(action.model.id)
      return state.merge({
        loading: false,
        errors: {},
      }).mergeDeep({
        byOrganisation: {[startupId]: _.uniq(currentList)},
        models: action.models,
      })

    case TYPES.JOB_DELETE + '_SUCCESS':
      const models = (state.get('models') || {}).toJSON()
      delete models[action.deletedModel.id]
      return state.merge({
        loading: false,
        errors: {},
        models: models,
        byOrganisation: byOrganisation(state.get('byOrganisation'), action),
      })

    case TYPES.JOB_LOCATION_LOAD + '_SUCCESS':
      return state.merge({
        locations: {
          locations: action.model.locations,
          timestamp: new Date().getTime(),
        },
      })

    default:
      return state

  }
}
