import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import GameHeader from './GameHeader'

export default class GameDetail extends React.Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    children: PropTypes.node.isRequired,
  }

  render() {
    const {game, editable, errors, children} = this.props
    const panelProps = {game, editable, errors}

    return (
      <div className="game">
        <GameHeader {...panelProps} />

        <Grid fluid className="game-body">

          <Row>
            <Col xs={12} className="masonry">
              {children}
            </Col>
          </Row>

        </Grid>
      </div>
    )
  }
}
