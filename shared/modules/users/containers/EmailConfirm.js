import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {push} from 'redux-router'
import {confirmEmail} from 'fl-auth-redux'
import EmailConfirm from '../components/EmailConfirm'

@connect(state => _.extend(_.pick(state, 'auth', 'config'), {query: state.router.location.query}), {confirmEmail, push})
export default class EmailConfirmContainer extends Component {

  static propTypes = {
    auth: PropTypes.object,
    config: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    confirmEmail: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  componentDidMount(props) {
    this.confirm(props)
  }

  componentWillReceiveProps(props) {
    this.confirm(props)
  }

  confirm(_props) {
    const props = _props || this.props
    const {auth, config, query} = props
    if (!(auth.get('errors') && auth.get('errors').get('confirmEmail')) && !auth.get('loading') && !auth.get('emailConfirmed')) {
      this.props.confirmEmail(`${config.get('url')}/confirm-email`, query.email, query.token)
    }
  }

  render() {
    const {auth} = this.props
    const loading = auth.get('loading')
    const err = auth.get('errors') && auth.get('errors').get('confirmEmail')
    const emailConfirmed = auth.get('emailConfirmed')

    return (
      <div>
        <Helmet title="Confirm your email" />
        <EmailConfirm
          errorMsg={err ? err.toString() : ''}
          loading={loading}
          emailConfirmed={emailConfirmed}
        />
      </div>
    )
  }
}
