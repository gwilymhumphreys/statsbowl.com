import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {load} from '../actions'
import Profile from '../components/Profile'
import Loader from '../../utils/components/Loader'
import NotFound from '../../utils/components/NotFound'
import {userCanEditProfile} from '../../../lib/permissions'
import {profileFromParams} from '../../../lib/context'

const needsFetching = [

]

@connect(state => ({
  auth: state.auth,
  profileId: state.router.params.profileId,
  profiles: state.profiles,
}), {load})
export default class ProfileContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    profiles: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    userId: PropTypes.string,
  }

  state = {}

  static fetchData({store, action}, callback) {
    const context = profileFromParams(store.getState(), action, true)
    const queue = new Queue(1)

    if (!context.profile) {
      const query = context.profileId ? {id: context.profileId, $one: true} : {user_id: context.userId, $one: true}
      queue.defer(callback => store.dispatch(load(query, callback)))
    }

    needsFetching.forEach(Container => Container.fetchData && queue.defer(callback => Container.fetchData({store, action}, callback)))

    queue.await(callback)
  }

  render() {
    const {profiles} = this.props
    if (profiles.get('loading')) return (<Loader />)
    const {profile} = profileFromParams(this.props, null, true)
    if (!profile) return (<NotFound />)

    const errors = profiles.get('errors').toJSON()
    const editable = userCanEditProfile(_.assign({profile}, this.props))

    return (
      <div>
        <Helmet title={profile.nickname} />
        <Profile
          profile={profile}
          errors={errors}
          editable={editable}
        />
      </div>
    )
  }

}
