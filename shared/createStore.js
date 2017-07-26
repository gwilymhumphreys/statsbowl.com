import _ from 'lodash' // eslint-disable-line
import {createStore as _createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {requestMiddleware, responseParserMiddleware, createRequestModifierMiddleware} from 'redux-request-middleware'
import {fetchComponentDataMiddleware} from 'fetch-component-data'
import {fromJS} from 'immutable'

const MUTABLES = {
  router: 'always',
  admin: 1,
}

function immute(fromObj, parentKey, depth=0) {
  const obj = {}

  Object.keys(fromObj).forEach(key => {
    const mutableKey = parentKey || key
    const immuteAt = MUTABLES[mutableKey]

    if (!immuteAt || immuteAt === depth) {
      obj[key] = fromJS(fromObj[key])
    }
    else if (immuteAt > depth) {
      obj[key] = immute(fromObj[key], mutableKey, depth+1)
    }
    else obj[key] = fromObj[key]
  })

  return obj
}

const requestModifierMiddleware = createRequestModifierMiddleware({
  getValue: store => {
    const {auth} = store.getState()
    const value = {}
    if (auth.get('user')) value.$user_id = auth.get('user').get('id')
    return value
  },
})

export default function createStore(reduxReactRouter, getRoutes, createHistory, _initialState) {
  const reducer = require('./reducer') // delay requiring reducers until needed
  const middlewares = applyMiddleware(
    thunk,
    requestModifierMiddleware,
    requestMiddleware,
    responseParserMiddleware,
    fetchComponentDataMiddleware,
  )
  const finalCreateStore = compose(
    reduxReactRouter({getRoutes, createHistory}),
    middlewares,
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
    typeof window === 'object' && window.LogRocket ? window.LogRocket.reduxEnhancer() : f => (a, b, c) => f(a, b, c),
  )(_createStore)

  const initialState = immute(_initialState)
  const store = finalCreateStore(reducer, initialState)
  return store
}
