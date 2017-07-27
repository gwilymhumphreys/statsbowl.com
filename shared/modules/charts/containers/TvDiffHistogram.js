import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {loadTvFreqRanges} from '../actions'
import TvDiffHistogram from '../components/TvDiffHistogram'
import Loader from '../../utils/components/Loader'

const DEFAULT_INTERVAL = 50
const DEFAULT_CUTOFF = 0

@connect(state => ({
  charts: state.charts,
  roundingInterval: state.router.params.roundingInterval,
  newTeamCutoff: state.router.params.newTeamCutoff,
}))
export default class TvDiffHistogramContainer extends React.Component {

  static propTypes = {
    charts: PropTypes.object.isRequired,
    roundingInterval: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    newTeamCutoff: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    roundingInterval: DEFAULT_INTERVAL,
    newTeamCutoff: DEFAULT_CUTOFF,
  }

  static fetchData({store, action}, callback) {
    const {router} = store.getState()
    const params = (action && action.payload && action.payload.params) || (router && router.params) || {}
    const roundingInterval = (params && params.roundingInterval) || DEFAULT_INTERVAL
    const newTeamCutoff = (params && params.newTeamCutoff) || DEFAULT_CUTOFF
    const queue = new Queue()

    queue.defer(callback => {
      const query = {
        newTeamCutoff,
        roundingInterval,
        upperTv: {$lte: 500},
      }
      store.dispatch(loadTvFreqRanges('tvRange', query, callback))
    })

    queue.await(callback)
  }

  render() {
    const {charts, roundingInterval, newTeamCutoff} = this.props
    const tvData = charts.get('tvRange')
    if (!tvData) return (<Loader />)

    return (
      <TvDiffHistogram
        roundingInterval={+roundingInterval}
        newTeamCutoff={+newTeamCutoff}
        data={tvData.toJSON()}
      />
    )
  }
}
