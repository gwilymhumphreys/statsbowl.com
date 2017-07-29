import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {loadTvFreqRanges} from '../actions'
import WinPercentByTvRange from '../components/WinPercentByTvRange'
import Loader from '../../utils/components/Loader'
import parseFilterQuery from '../../games/parseFilterQuery'
import {push} from 'redux-router'

const INTERVALS = [50, 100]

@connect(state => ({
  charts: state.charts,
}), {push})
export default class WinPercentByTvRangeContainer extends React.Component {

  static propTypes = {
    charts: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
  }

  static defaultProps = {
    filters: [
      {
        field: 'roundingInterval',
        type: 'select',
        label: 'Rounding interval',
        default: 50,
        options: _.map(INTERVALS, i => ({label: i, value: i})),
        query: value => ({roundingInterval: +value}),
      },
      {
        label: 'Exclude games between new teams (both teams equal to or less than 1000tv)',
        field: 'newTeamCutoff',
        type: 'checkbox',
        valueFromQuery: query => !!query.newTeamCutoff,
        query: checked => ({newTeamCutoff: checked ? 1000 : 0}),
      },
    ],
  }

  static fetchData({store, action}, callback) {
    const {router} = store.getState()
    const location = (action && action.payload && action.payload.location ? action.payload.location : router.location)
    const queue = new Queue()

    queue.defer(callback => {
      const query = parseFilterQuery(location.query.filters, {roundingInterval: 50, newTeamCutoff: 0})
      query.upperTv = {$lte: 500}
      store.dispatch(loadTvFreqRanges('tvRange', query, callback))
    })

    queue.await(callback)
  }

  handleFilter = filterQuery => {
    const {location, push} = this.props
    const query = _.extend({}, location.query, {filters: JSON.stringify(filterQuery)})
    push({query, pathname: location.pathname})
  }

  render() {
    const {location, charts} = this.props
    const filterQuery = parseFilterQuery(location.query.filters, {roundingInterval: 50, newTeamCutoff: 0})
    const tvData = charts.get('tvRange')
    if (!tvData) return (<Loader />)

    return (
      <div>
        <Helmet title="Win percent by TV range" />
        <WinPercentByTvRange
          filters={this.props.filters}
          onFilter={this.handleFilter}
          filterQuery={filterQuery}

          loading={charts.get('loading')}
          roundingInterval={+filterQuery.roundingInterval}
          newTeamCutoff={+filterQuery.newTeamCutoff}
          data={tvData.toJSON()}
        />
      </div>
    )
  }
}
