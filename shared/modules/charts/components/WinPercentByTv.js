import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Grid, Row, Col} from 'react-bootstrap'
import D3LineGraph from './D3LineGraph'


export default class WinPercentByTv extends React.Component {

  static propTypes = {
    data: PropTypes.array,
  }

  render() {
    const {data} = this.props
    console.log('data', data)
    const area = true

    return (
      <div>
        <Grid fluid className="header">
          <Row>
            <Col xs={12}>
              <div style={{width: 960, height: 500}}>
                <D3LineGraph data={data} area={area} xField="tvdiff" yField="winPercent" />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
