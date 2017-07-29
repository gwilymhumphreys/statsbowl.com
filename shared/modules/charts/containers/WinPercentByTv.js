import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {loadTvFreqs} from '../actions'
import WinPercentByTv from '../components/WinPercentByTv'
import Loader from '../../utils/components/Loader'
import parseFilterQuery from '../../games/parseFilterQuery'
import {push} from 'redux-router'

@connect(state => ({
  charts: state.charts,
}), {push})
export default class WinPercentByTvContainer extends React.Component {

  static propTypes = {
    charts: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
  }

  static defaultProps = {
    filters: [
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
      const query = parseFilterQuery(location.query.filters, {newTeamCutoff: 0})
      query.tvdiff = {$lte: 500}
      store.dispatch(loadTvFreqs('tv', query, callback))
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
    const filterQuery = parseFilterQuery(location.query.filters, {newTeamCutoff: 0})
    const tvData = charts.get('tv')
    if (!tvData) return (<Loader />)

    return (
      <div>
        <Helmet title="Win percent by TV" />
        <WinPercentByTv
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
