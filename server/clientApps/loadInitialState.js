import _ from 'lodash' // eslint-disable-line

export default function loadInitialState(req, callback) {
  const user = req.user

  const state = {}

  if (user) {
    state.auth = {
      user: {id: user.id},
    }
  }

  // Immutable.fromJS has a bug with objects flagged as anonymous in node 6
  // https://github.com/facebook/immutable-js/issues/1001
  callback(null, JSON.parse(JSON.stringify(state)))

  // callback(null, state)
}
