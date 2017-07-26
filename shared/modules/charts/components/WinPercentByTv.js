import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Grid, Row, Col} from 'react-bootstrap'
import C3Chart from 'react-c3js'

export default class WinPercentByTv extends React.Component {

  static propTypes = {
    data: PropTypes.array,
  }

  render() {
    const {data} = this.props
    console.log('data', data)

    const chartData = {
      json: data,
      keys: {
        x: 'tvdiff',
        value: ['tvdiff', 'winPercent'],
      },
      type: 'bar',
    }

    console.log('chartData', chartData)

    return (
      <div>
        <Grid fluid className="header">
          <Row>
            <Col xs={12}>
              <div style={{width: 960, height: 500}}>

                <C3Chart data={chartData} />

              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
