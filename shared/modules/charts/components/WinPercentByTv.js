import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import C3Chart from 'react-c3js'
import Filters from '../../games/components/Filters'

export default class WinPercentByTv extends React.Component {

  static propTypes = {
    data: PropTypes.array,
  }

  render() {
    const {data} = this.props

    const chartProps = {
      data: {
        json: data,
        keys: {
          x: 'tvdiff',
          value: ['tvdiff', 'winPercent'],
        },
        type: 'bar',
      },
      axis: {
        x: {
          label: 'TV advantage',
        },
        y: {
          label: 'Win %',
        },
      },
    }

    console.log('chartProps', chartProps)

    return (
      <div>
        <Grid fluid className="section">
          <Row>
            <Col xs={12}>
              <Filters {...this.props} />
            </Col>
          </Row>
        </Grid>
        <Grid fluid className="section">
          <Row>
            <Col xs={12}>
              <h2>Win percent by tv</h2>
              <C3Chart {...chartProps} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
