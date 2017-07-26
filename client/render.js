import React from 'react'
import moment from 'moment'
import {ReduxRouter} from 'redux-router'
import {render} from 'react-dom'
import createHistory from 'history/lib/createBrowserHistory'
import {Provider} from 'react-redux'
import {reduxReactRouter} from 'redux-router'
import {patchRouteEntry} from 'fl-react-utils'

// Set moment locale to aus
moment.locale('en-AU')

// no jQuery, backbone needs an ajax function
const Backbone = require('backbone')
Backbone.ajax = require('fl-backbone.nativeajax')

import createStore from '../shared/createStore'

export default function(getRoutes) {
  const initialState = window.__INITIAL_STATE__
  const store = createStore(reduxReactRouter, patchRouteEntry(getRoutes), createHistory, initialState)

  render((
    <Provider store={store} key="provider">
      <ReduxRouter routes={getRoutes(store)} />
    </Provider>
  ), document.getElementById('react-view'))
}
