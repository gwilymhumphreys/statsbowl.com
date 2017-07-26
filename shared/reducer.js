import Immutable from 'immutable'
import {combineReducers} from 'redux'
import {routerStateReducer as router} from 'redux-router'
import {reducer as form} from 'redux-form'
import {reducer as admin} from 'fl-admin'
import {reducer as auth} from 'fl-auth-redux'
import app from './modules/app/reducer'
import profiles from './modules/profiles/reducer'
import organisations from './modules/organisations/reducer'
import games from './modules/games/reducer'

export default combineReducers({
  form,
  router,
  auth,
  app,
  profiles,
  organisations,
  games,
  admin: admin || ((state=new Immutable.Map()) => state),
  config: (state=new Immutable.Map()) => state,
})
