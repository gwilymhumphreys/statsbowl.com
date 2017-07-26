import Immutable from 'immutable'
import {combineReducers} from 'redux'
import {routerStateReducer as router} from 'redux-router'
import {reducer as form} from 'redux-form'
import {reducer as admin} from 'fl-admin'
import {reducer as auth} from 'fl-auth-redux'
import app from './modules/app/reducer'
import profiles from './modules/profiles/reducer'
import charts from './modules/charts/reducer'
import games from './modules/games/reducer'

export default combineReducers({
  form,
  router,
  auth,
  app,
  profiles,
  charts,
  games,
  admin: admin || ((state=new Immutable.Map()) => state),
  config: (state=new Immutable.Map()) => state,
})
