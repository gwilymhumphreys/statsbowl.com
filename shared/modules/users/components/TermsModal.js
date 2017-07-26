import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import Terms from '../../app/components/Terms'

export default class TermsModal extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Terms />
      </Modal>
    )
  }
}
