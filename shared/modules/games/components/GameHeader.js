import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {formatLocation, formatDateDuration} from '../../utils/format'

// import GameLogo from './GameLogo'
import {prefixUrl} from '../../utils/prefixLinks'

export default class GameHeader extends React.Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    errors: PropTypes.object,
    editable: PropTypes.bool,
  }

  constructor() {
    super()
    this.state = {
      editing: false,
    }
  }

  handleToggleEdit = () => this.setState({editing: !this.state.editing})

  render() {
    const {game, errors, editable} = this.props
    const {editing} = this.state
    const locationStr = formatLocation(game)
    if (errors) {
      // console.error('errors:', errors)
    }

    return (
      <Grid fluid className="game-header">
        <Row>
          <Col xs={12} className="game-actions">
            <p className="last-updated">Last updated: {formatDateDuration(game.updatedDate)} ago</p>
            {editable && !editing && (<p><Button bsStyle="primary" onClick={this.handleToggleEdit}>Edit</Button></p>)}
            {game.contactEmail && (<p><Button bsStyle="primary" href={`mailto:${game.contactEmail}`}>Contact</Button></p>)}
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            {/*<GameLogo bordered game={game} />*/}
          </Col>
        </Row>

        <Row className="game-info">
          <Col xs={12}>
            <h1>{game.name}</h1>
            <p className="location">{locationStr}</p>
            <p className="short-description"><a href={prefixUrl(game.websiteUrl)} target="_blank">{game.websiteUrl && game.websiteUrl.split('//').pop()}</a></p>
          </Col>
        </Row>
      </Grid>
    )
  }
}
