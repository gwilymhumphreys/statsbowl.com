import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {formValueSelector} from 'redux-form'
import {push} from 'redux-router'
import {login} from 'fl-auth-redux'
import Login from '../components/Login'

const selector = formValueSelector('login')
@connect(state => _.extend(_.pick(state, 'auth', 'config'), {query: state.router.location.query, email: selector(state, 'email')}), {push, login})
export default class LoginContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    email: PropTypes.string,
  }

  constructor() {
    super()
    this.state = {}
  }

  handleSubmit = data => {
    this.props.login(`${this.props.config.get('url')}/login`, data.email && data.email.trim(), data.password, err => {
      if (!err) {
        this.setState({loaded: true}, () => window.location.href = this.props.query.redirectTo || '/')
      }
    })
  }

  render() {
    const {auth, query, email} = this.props
    // Stay loading while the redirect is happening
    const loading = auth.get('loading') || this.state.loaded
    const errorMsg = auth.get('errors') ? auth.get('errors').get('login') : null
    const initialValues = {}
    if (query.email) initialValues.email = query.email

    return (
      <div>
        <Login loading={loading} errorMsg={errorMsg} onSubmit={this.handleSubmit} email={email} />
      </div>
    )
  }
}
