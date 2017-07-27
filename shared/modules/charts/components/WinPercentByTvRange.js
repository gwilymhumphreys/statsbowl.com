import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import C3Chart from 'react-c3js'

export default class WinPercentByTv extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    roundingInterval: PropTypes.number,
  }

  render() {
    const {data, roundingInterval} = this.props

    const chartProps = {
      data: {
        json: data,
        keys: {
          x: 'upperTv',
          value: ['upperTv', 'winPercent'],
        },
        labels: true,
        type: 'bar',
      },
      axis: {
        x: {
          tick: {
            culling: false,
            format: x => `${+x-roundingInterval} - ${x}`,
          },
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
              <h2>Win percent by tv range ({roundingInterval})</h2>
              <C3Chart {...chartProps} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
    // import Correlation from 'node-correlation'
    // const correlation = Correlation.calc(_.map(data, 'upperTv'), _.map(data, 'winPercent'))
    // {/*<h5>Correlation: {correlation}</h5>*/}
