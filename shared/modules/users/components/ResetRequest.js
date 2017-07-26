import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Grid, Row, Col, Panel} from 'react-bootstrap'
import {ResetRequestForm} from 'fl-auth-react'

export default class ResetRequest extends Component {

  static propTypes = {
    email: PropTypes.string,
    errorMsg: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {email, errorMsg} = this.props
    const notFound = errorMsg === 'User not found'
    const err = errorMsg && !notFound

    return (
      <div className="form-page reset-request">

        <header>
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <h1 className="text-center">Reset your password</h1>
              </Col>
            </Row>
          </Grid>
        </header>

        <Grid>
          <Row>
            <Col xs={12} sm={10} smOffset={1} md={12} mdOffset={0}>
              <Panel className="panel-form">
                <ResetRequestForm initialValues={{email}} {...this.props} />
                {errorMsg === 'User not found' && (<p>Sorry, we don't have that email registered. You can <Link to="/register">sign up here</Link></p>)}
                {err && (<p>Sorry, something went wrong while resetting your password. Please <a href="mailto:reseterror@statsbowl.com">get in touch with us</a> so we can fix it up.</p>)}
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
