import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {Row, Col, Glyphicon} from 'react-bootstrap'
import Button from './Button'

export default class StepButtons extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    onBack: PropTypes.func,
    onNext: PropTypes.func,
    nextText: PropTypes.node,
    nextIcon: PropTypes.node,
  }

  static defaultProps ={
    nextText: 'Save & Continue',
    nextIcon: (<span> <Glyphicon glyph="chevron-right" /></span>),
  }

  render() {
    const {loading, onBack, onNext, nextIcon, nextText} = this.props
    const buttonProps = {loading}
    if (onNext) buttonProps.onClick = onNext

    const nextButton = (
      <Button type="submit" bsStyle="primary" bsSize="large" {...buttonProps}>{nextText}{nextIcon}</Button>
    )

    return (
      <Row className="actions">
        {onBack ? (
          <Col xs={12}>
            <Button disabled={loading} bsSize="large" onClick={onBack}><Glyphicon glyph="chevron-left" /> Back</Button>
            <div className="pull-right">
              {nextButton}
            </div>
          </Col>
        ) : (
          <Col xs={12} className="text-center">
            {nextButton}
          </Col>
        )}
      </Row>
    )
  }
}
