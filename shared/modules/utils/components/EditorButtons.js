import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {Row, Col} from 'react-bootstrap'
import Button from './Button'

export default class EditorButtons extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    onCancel: PropTypes.func,
  }

  render() {
    const {loading} = this.props
    return (
      <Row className="actions">
        <Col xs={12}>
          {this.props.onCancel ? (<Button disabled={loading} onClick={this.props.onCancel} bsSize="lg">Cancel</Button>) : null}
          <div className={this.props.onCancel ? 'pull-right' : 'text-center'}>
            <Button loading={loading} type="submit" bsStyle="primary" bsSize="lg">Save</Button>
          </div>
        </Col>
      </Row>
    )
  }
}
