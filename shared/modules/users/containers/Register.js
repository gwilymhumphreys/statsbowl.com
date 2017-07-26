import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {push} from 'redux-router'
import {register} from 'fl-auth-redux'
import {loadActiveProfile} from '../../profiles/actions'
import Register from '../components/Register'

@connect(state => ({auth: state.auth, url: state.config.get('url'), query: state.router.location.query}), {register, loadActiveProfile, push})
export default class RegisterContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    loadActiveProfile: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  handleSubmit = data => {
    data.email = data.email && data.email.trim()
    this.props.register(`${this.props.url}/register`, data, err => {
      if (err) return
      this.props.loadActiveProfile({user_id: this.props.auth.get('user').get('id')}, err => {
        if (!err) this.props.push('/')
      })
    })
  }

  render() {
    const {auth} = this.props
    const loading = auth.get('loading')
    const errorMsg = auth.get('errors') ? auth.get('errors').get('register') : null

    return (
      <div>
        <Helmet title="Register" />
        <Register loading={loading} errorMsg={errorMsg} organisation={this.context.organisation} onSubmit={this.handleSubmit} />
      </div>
    )
  }

}
