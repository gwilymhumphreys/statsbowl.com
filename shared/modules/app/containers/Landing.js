import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import Helmet from 'react-helmet'
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Landing from '../components/Landing'

@connect(state => _.extend(_.pick(state, 'auth', 'profiles')))
export default class LandingContainer extends React.Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    profiles: PropTypes.object.isRequired,
  }

  static fetchData({store, action}, callback) {
    const {auth} = store.getState()
    const user = auth.get('user')
    const queue = new Queue()
    queue.await(callback)
  }

  render() {
    const {auth} = this.props

    return (
      <section className="landing">
        <Helmet title={'statsbowl'} />
        <Landing />
      </section>
    )
  }
}
