import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {loadTvFreqRanges} from '../actions'
import WinPercentByTvRange from '../components/WinPercentByTvRange'
import Loader from '../../utils/components/Loader'

const DEFAULT_INTERVAL = 50

@connect(state => ({
  charts: state.charts,
  roundingInterval: state.router.params.roundingInterval,
}))
export default class WinPercentByTvRangeContainer extends React.Component {

  static propTypes = {
    charts: PropTypes.object.isRequired,
    roundingInterval: PropTypes.string,
  }

  static defaultProps = {
    roundingInterval: DEFAULT_INTERVAL,
  }

  static fetchData({store, action}, callback) {
    const {router} = store.getState()
    const params = (action && action.payload && action.payload.params) || (router && router.params) || {}
    const roundingInterval = (params && params.roundingInterval) || DEFAULT_INTERVAL
    const queue = new Queue()

    queue.defer(callback => {
      const query = {
        newTeamCutoff: 0,
        roundingInterval: roundingInterval,
        upperTv: {$lte: 500},
      }
      store.dispatch(loadTvFreqRanges('tvRange', query, callback))
    })

    queue.await(callback)
  }

  render() {
    const {charts, roundingInterval} = this.props
    const tvData = charts.get('tvRange')
    if (!tvData) return (<Loader />)

    return (
      <WinPercentByTvRange
        roundingInterval={+roundingInterval}
        data={tvData.toJSON()}
      />
    )
  }
}
