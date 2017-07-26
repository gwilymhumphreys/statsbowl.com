import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Grid, Row, Col, Panel} from 'react-bootstrap'

export default class EmailConfirm extends Component {

  static propTypes = {
    errorMsg: PropTypes.string,
    loading: PropTypes.bool,
    emailConfirmed: PropTypes.bool,
  }

  render() {
    const {emailConfirmed, loading, errorMsg} = this.props

    return (
      <div className="form-page email-confirm">
        <header>
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <h1 className="text-center">Email confirmed</h1>
              </Col>
            </Row>
          </Grid>
        </header>

        <Grid>
          <Row>
            <Col xs={12} sm={10} smOffset={1} md={12} mdOffset={0}>
              <Panel className="panel-form">
                {loading && <small>loading...</small>}
                {errorMsg && <small>{errorMsg}</small>}

                {emailConfirmed && (
                  <div className="text-center">
                    <h2 className="text-center">Thanks! Your email is confirmed.</h2>
                    <h3><Link to="/" className="text-center">Head back to your dashboard</Link></h3>
                  </div>
                )}
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
