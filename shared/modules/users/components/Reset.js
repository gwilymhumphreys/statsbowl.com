import React, {Component, PropTypes} from 'react'
import {Grid, Row, Col, Panel} from 'react-bootstrap'
import {ResetForm} from 'fl-auth-react'

export default class Reset extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="form-page password-reset">

        <header>
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <h1 className="text-center">Enter a new password</h1>
              </Col>
            </Row>
          </Grid>
        </header>

        <Grid>
          <Row>
            <Col xs={12} sm={10} smOffset={1} md={12} mdOffset={0}>
              <Panel className="panel-form">
                <ResetForm {...this.props} />
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
