import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {formValueSelector} from 'redux-form'
import {login} from 'fl-auth-redux'
import LoginModal from '../components/LoginModal'

const selector = formValueSelector('login')
@connect(state => ({auth: state.auth, url: state.config.get('url'), query: state.router.location.query, email: selector(state, 'email')}), {login})
export default class LoginModalContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    email: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {}
  }

  handleSubmit = data => {
    this.props.login(`${this.props.url}/login`, data.email && data.email.trim(), data.password, err => {
      if (!err) {
        this.setState({loaded: true}, () => window.location.href = this.props.query.redirectTo || '/')
      }
    })
  }

  render() {
    const {auth, email} = this.props
    // Stay loading while the redirect is happening
    const loading = auth.get('loading') || this.state.loaded
    const errorMsg = auth.get('errors') && auth.get('errors').get('login')
    return (
      <LoginModal loading={loading} errorMsg={errorMsg} email={email} onSubmit={this.handleSubmit} {...this.props} />
    )
  }
}
