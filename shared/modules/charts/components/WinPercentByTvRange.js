import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import C3Chart from 'react-c3js'
import Filters from '../../games/components/Filters'

export default class WinPercentByTv extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    roundingInterval: PropTypes.number,
  }

  render() {
    const {data, roundingInterval, newTeamCutoff} = this.props

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

    const barChartProps = {
      data: {
        json: data,
        keys: {
          x: 'upperTv',
          value: ['upperTv', 'count'],
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
          label: 'TV difference',
        },
        y: {
          label: 'Games',
        },
      },
      bar: {
        width: {
          ratio: 1,
        },
      },
    }

    const pieCols = _.map(data, d => ([`${+d.upperTv-roundingInterval} - ${d.upperTv}`, d.gamePercent]))
    const pieChartProps = {
      data: {
        columns: pieCols,
        type: 'pie',
      },
      axis: {
        x: {
          label: 'TV difference',
        },
        y: {
          label: 'Percent of games',
        },
      },
    }

    return (
      <div>
        <Grid fluid className="section">
          <Row>
            <Col xs={12} sm={2}>
              <Filters {...this.props} />
            </Col>

            <Col xs={12} sm={10}>
              <Grid fluid>
                <Row>
                  <Col xs={12}>
                    <h2>Win percent</h2>
                    <p className="text-light">Interval: {roundingInterval}</p>
                    {newTeamCutoff ? (
                      <p className="text-light">Excluding games where both teams are {newTeamCutoff} tv or less</p>
                    ): null}

                    <C3Chart {...chartProps} />
                  </Col>
                </Row>
              </Grid>

              <Grid fluid>
                <Row>
                  <Col xs={12}>
                    <h2>Number of games</h2>
                    <p className="text-light">Interval: {roundingInterval}</p>
                    {newTeamCutoff ? (
                      <p className="text-light">Excluding games where both teams are {newTeamCutoff} tv or less</p>
                    ): null}

                    <C3Chart {...pieChartProps} />
                    <br />
                    <C3Chart {...barChartProps} />

                  </Col>
                </Row>
              </Grid>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
