import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import Navbar from './Navbar'
import Footer from './Footer'
import headerTags from '../headerTags'
import {loadAppSettings} from '../actions'
import {loadActiveProfile} from '../../profiles/actions'
import LoginModal from '../../users/containers/LoginModal'

@connect(state => ({
  routes: state.router.routes,
  config: state.config,
  auth: state.auth,
  profiles: state.profiles,
  router: state.router,
}))
export default class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    routes: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profiles: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  static contextTypes = {
    history: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    url: PropTypes.string,
    s3Url: PropTypes.string,
    publicPath: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {showModal: false}
  }

  getChildContext() {
    return {
      url: this.state.url,
      s3Url: this.state.s3Url,
      publicPath: this.state.publicPath,
    }
  }

  componentWillMount() {
    if (!this.state.url) {
      this.setState({
        url: this.props.config.get('url'),
        s3Url: this.props.config.get('s3Url'),
        publicPath: this.props.config.get('publicPath'),
      })
    }
  }

  static fetchData({store, action}, callback) {
    const {auth, app, profiles} = store.getState()
    const baseQueue = new Queue()

    if (!app.get('loaded')) baseQueue.defer(callback => store.dispatch(loadAppSettings(callback)))

    baseQueue.await(err => {
      if (err) return callback(err)

      const profileQueue = new Queue()

      if (auth.get('user')) {
        const userId = auth.get('user').get('id')
        if (!profiles.get('loading') && !profiles.get('active')) {
          profileQueue.defer(callback => store.dispatch(loadActiveProfile({user_id: userId}, callback)))
        }
      }

      profileQueue.await(callback)
    })

  }

  openLoginModal = (e) => {
    e.preventDefault()
    this.setState({showModal: true})
  }

  closeLoginModal = () => this.setState({showModal: false})

  render() {
    const isAdmin = this.props.router.routes[1] && this.props.router.routes[1].name === 'admin'

    let content = this.props.children
    if (!isAdmin) {
      content = (
        <div>
          <Navbar openLoginModal={this.openLoginModal} />
          {this.props.children}
          <Footer />
          <LoginModal show={this.state.showModal} onHide={this.closeLoginModal} />
        </div>
      )
    }

    return (
      <div id="app-view">
        <Helmet
          title=""
          titleTemplate={`%s - statsbowl`}
          {...headerTags(this.props)}
        />
        <div className="app-content">
          {content}
        </div>
      </div>
    )
  }
}
