import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import LoginForm from './LoginForm'

export default class LoginModal extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <h3 className="text-center">Sign in</h3>
        <LoginForm {...this.props} />
      </Modal>
    )
  }
}
