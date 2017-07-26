import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import NotFound from '../../utils/components/NotFound'
import {load} from '../actions'
import GameDetail from '../components/GameDetail'

@connect(state => ({
  auth: state.auth,
  games: state.games,
  gameId: state.router.params.gameId,
}))
export default class GameDetailContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    games: PropTypes.object.isRequired,
    gameId: PropTypes.string.isRequired,
    saveProfile: PropTypes.func.isRequired,
    scrollToPanel: PropTypes.string,
  }

  static fetchData({store, action}, callback) {
    const {router, games} = store.getState()
    const gameId = ((action && action.payload && action.payload.params) || router.params).gameId

    const queue = new Queue(1)

    if (!games.get('models').get(gameId)) {
      queue.defer(callback => store.dispatch(load({id: gameId, $one: true}, callback)))
    }

    queue.await(callback)
  }

  state = {}

  // componentWillReceiveProps(props) {
  //   console.log('componentWillReceiveProps')
  //   const {scrollToPanel} = props
  componentDidMount = () => {
    console.log('componentDidMount', this)
    const {scrollToPanel} = this.props
    console.log('scrollToPanel', scrollToPanel)
    if (!scrollToPanel || scrollToPanel === this._scrollToPanel) return
    const scrollEle = document.getElementById(scrollToPanel)
    console.log('scrollEle', scrollEle)
    if (scrollEle) {
      scrollEle.scrollIntoView()
      this._scrollToPanel = scrollToPanel
    }
  }

  render() {
    const {games, gameId} = this.props
    const errors = games.get('errors').toJSON()
    const gameIm = games.get('models').get(gameId)

    if (!gameIm) return (<NotFound />)

    const game = gameIm.toJSON()
    const editable = userCanEditGame({...this.props, ...this.context})

    return (
      <div>
        <Helmet title={game.name} />
        <GameDetail
          game={game}
          errors={errors}
          editable={editable}
        />
      </div>
    )
  }
}
