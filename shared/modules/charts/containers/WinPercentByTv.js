import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {loadTvFreqs} from '../actions'
import WinPercentByTv from '../components/WinPercentByTv'
import Loader from '../../utils/components/Loader'

@connect(state => ({
  charts: state.charts,
}))
export default class WinPercentByTvContainer extends React.Component {

  static propTypes = {
    charts: PropTypes.object.isRequired,
  }

  static fetchData({store, action}, callback) {
    const queue = new Queue()

    queue.defer(callback => {
      const query = {
        newTeamCutoff: 0,
        // roundingInterval: 50,
        tvdiff: {$lte: 500},
      }
      store.dispatch(loadTvFreqs('tv', query, callback))
    })

    queue.await(callback)
  }

  render() {
    const {charts} = this.props
    const tvData = charts.get('tv')
    if (!tvData) return (<Loader />)

    return (
      <section className="landing">
        <WinPercentByTv
          data={tvData.toJSON()}
        />
      </section>
    )
  }
}
