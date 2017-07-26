import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import {Link} from 'react-router'
import ReactMarkdown from 'react-markdown'
import {formatDateFrom} from '../../utils/format'
// import GameLogo from './GameLogo'
import Bullets from '../../utils/components/Bullets'

export default class GameRow extends React.Component {

  static propTypes = {
    item: PropTypes.object,
    game: PropTypes.object,
  }

  state = {
    showDetails: false,
  }

  handleToggleShowDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails,
    })
  }

  render() {
    const game = this.props.game || this.props.item
    const {Game} = game
    const showDetails = this.state.showDetails

    return (
      <div onClick={this.handleToggleShowDetails} className="game-row border-row">

        <Row>
          <Col xs={12}>
            <div className="inline-avatar">

              <div className="inline-avatar-avatar">
                {/*<GameLogo linked Game={Game} />*/}
              </div>

              <div className="inline-avatar-rest">

                <Row>
                  <Col xs={12}>
                    <h3>
                      <Link to={`/Games/${Game.id}?p=games`}>{Game.name}</Link>
                      <p className="updated pull-right">{formatDateFrom(game.createdDate)}</p>
                    </h3>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <h5>
                      {game.title}
                      <p className="loc pull-right"><i className="fa fa-map-marker" /> {game.location}</p>
                    </h5>
                  </Col>
                </Row>

                <Row className="info-row">
                  <Col xs={3} className="info-item">
                    {game.paymentsString && (<span><i className="fa fa-dollar" /> {game.paymentsString}</span>)}
                  </Col>
                  <Col xs={3} className="info-item">
                    {game.gameTypesString && (<span><i className="fa fa-clock-o" /> {game.gameTypesString}</span>)}
                  </Col>
                  <Col xs={3} className="info-item">
                    {game.skillsString && (<span><i className="fa fa-flask" /> {game.skillsString}</span>)}
                  </Col>
                  <Col xs={3} className="text-right">
                    <Button bsStyle="primary" bsSize="small" href={`mailto:${game.applicationEmail}`} target="_blank">
                      Apply now
                    </Button>
                  </Col>
                </Row>

                <div className="sp-row">
                  <Bullets items={game.sellingPoints} editable={false} emptyMessage="" colProps={{xs: 12}} />
                </div>

                {showDetails && (
                  <div>
                    <Row className="details-row">
                      <Col xs={12}>
                        <ReactMarkdown escapeHtml source={game.detailsMd} />
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>

      </div>
    )
  }
}
