import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {AdminRoute} from 'fl-admin'

export default function getRoutes(store) {
  function requireUserFn(checkFn) {
    return function requireUser(nextState, replace, callback) {
      const {auth} = store.getState()
      const user = auth.get('user')
      if (!user || (checkFn && !checkFn(user))) {
        replace(`/login?redirectTo=${nextState.location.pathname}`)
      }
      callback()
    }
  }

  const requireUser = requireUserFn()
  const requireAdmin = requireUserFn(user => user.get('admin'))

  return (
    <Route path="/" name="app" component={require('./modules/app/containers/App')}>
      <IndexRoute sidebarIfUser component={require('./modules/app/containers/Landing')} />

      <AdminRoute path="/admin" name="admin" onEnter={requireAdmin} />

      <Route component={require('./modules/users/containers/Login')} path="login" />
      <Route component={require('./modules/users/containers/ResetRequest')} path="reset-request" />
      <Route component={require('./modules/users/containers/Reset')} path="reset" />
      <Route component={require('./modules/users/containers/EmailConfirm')} path="confirm-email" />

      <Route path="register" component={require('./modules/users/containers/Register')} />

      <Route onEnter={requireUser}>
        <Route path="profile" sidebar component={require('./modules/profiles/containers/Profile')} />
      </Route>

      <Route path="people/:profileId" sidebar component={require('./modules/profiles/containers/Profile')} />

      <Route path="games" sidebar component={require('./modules/games/containers/GameFinder')} />
      <Route path="games/:gameId" sidebar component={require('./modules/games/containers/GameDetail')} />

      <Route path="/p/:slug" component={require('./modules/app/containers/StaticPage')} />
    </Route>
  )
}
