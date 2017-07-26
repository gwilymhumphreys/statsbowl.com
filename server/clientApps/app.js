import _ from 'lodash'
import {createServerRenderer} from 'fl-react-server'
import config from '../config'
import loadInitialState from './loadInitialState'
import createStore from '../../shared/createStore'
import getRoutes from '../../shared/routes'

const HEAP = process.env.NODE_ENV === 'production' && config.heapId
const LOGROCKET_REPORTING = false
const LOGROCKET = process.env.NODE_ENV === 'production' && config.logRocketId

export default createServerRenderer({
  createStore,
  getRoutes,
  loadInitialState,
  omit: 'admin',
  gaId: config.gaId,
  alwaysFetch: require('../../shared/modules/app/containers/App'),

  // LogRocket
  preScriptTags: req => {
    if (!LOGROCKET) return ''
    const identStr = req.user ? `window.LogRocket && window.LogRocket.identify('${req.user.id}', {
      name: '${req.user.profile ? req.user.profile.nickname : null}',
      email: '${req.user.email}',
    })` : ''
    return `
      <script src="https://cdn.logrocket.com/LogRocket.min.js"></script>
      <script>
        window.LogRocket && window.LogRocket.init('${config.logRocketId}', {
          shouldShowReportingButton: ${LOGROCKET_REPORTING},
        })
        ${identStr}
      </script>
    `
  },
  // Heap analyics
  postScriptTags: HEAP ? `
    <script type="text/javascript">
      window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};
      heap.load("${config.heapId}")
    </script>
  ` : '',

  config: (req, callback) => callback(null, _.pick(config, config.clientConfigKeys)),
})
