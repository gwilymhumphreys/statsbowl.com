import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Grid, Row, Col} from 'react-bootstrap'

export default class Landing extends React.Component {

  static propTypes = {

  }

  static contextTypes = {
    s3Url: PropTypes.string.isRequired,
  }

  render() {

    return (
      <div>
        <Grid fluid className="header">
          <Row>
            <Col xs={12} md={6} lg={6}>
              <h1>It's alive! Rarr</h1>
              <Link to="/register"><button className="btn btn-lg btn-info">Do things</button></Link>
            </Col>
            <Col xs={12} md={6} lg={6}>
            </Col>
          </Row>
        </Grid>

        <Grid fluid className="cta2">
          <Row>
            <Col>
              <h2>More things</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Link to="/admin"><button className="btn btn-lg btn-danger">Admin things</button></Link>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
