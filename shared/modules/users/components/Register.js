import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {Grid, Row, Col, Panel} from 'react-bootstrap'
import RegisterForm from './RegisterForm'

export default function Register(props) {
  return (
    <div className="form-page register">

      <header>
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <h1 className="text-center">Register</h1>
            </Col>
          </Row>
        </Grid>
      </header>

      <Grid>
        <Row>
          <Col xs={12} sm={10} smOffset={1} md={12} mdOffset={0}>
            <Panel className="panel-form">
              <RegisterForm {...props} />
            </Panel>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}
