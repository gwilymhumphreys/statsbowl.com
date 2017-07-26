import _ from 'lodash' //eslint-disable-line
import Queue from 'queue-async'
import warning from 'warning'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {push} from 'redux-router'
import {createPaginationSelector} from 'fl-redux-utils'
import Helmet from 'react-helmet'
import Loader from '../../utils/components/Loader'
import {countGames, loadGamesPage, loadGameLocations} from '../actions'
import SearchPage from '../components/SearchPage'
import GameRow from '../components/GameRow'
import filters from '../filters'

const ITEMS_PER_PAGE = 50

function parseFilterQuery(filters) {
  if (!filters) return {}
  let filterQuery = {}
  try {
    filterQuery = JSON.parse(filters)
  }
  catch (err) {
    warning(false, err)
  }
  return filterQuery
}

@connect(createPaginationSelector('games', state => ({
  auth: state.auth,
  profiles: state.profiles,
  games: state.games,
})), {push})
export default class SearchPageContainer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    profiles: PropTypes.object.isRequired,
    games: PropTypes.object.isRequired,

    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    handleFilter: PropTypes.func,

    visibleItems: PropTypes.array.isRequired,
    totalItems: PropTypes.number.isRequired,
  }

  static defaultProps = {filters}

  static fetchData({store, action}, callback) {
    const {games, config, router} = store.getState()
    // const organisationId = organisations.get('active').get('id')
    const location = (action && action.payload && action.payload.location ? action.payload.location : router.location)

    const query = _.extend({deleted: false}, parseFilterQuery(location.query.filters))
    if (location.query.search) {
      const $search = location.query.search.trim()
      query.$or = [
        {title: {$search}},
        {'organisation.name': {$search}},
      ]
    }
    // query['organisation.links.organisation_id'] = organisationId

    const perPage = +(location.query.perPage) || ITEMS_PER_PAGE
    const queue = new Queue()
    queue.defer(callback => store.dispatch(countGames(query, callback)))
    queue.defer(callback => {
      query.$limit = perPage
      // query.$template = 'detail'
      query.$sort = '-createdDate'
      const page = +(location.query.page) || 1

      if (page > 1) query.$offset = perPage * (page-1)
      store.dispatch(loadGamesPage(page, query, callback))
    })

    queue.await(err => {
      if (err) store.dispatch(push(location.pathname, {}))
      callback()
    })
  }

  handleSearch = searchString => {
    const {location, push} = this.props
    const query = location.query
    if (searchString) {
      query.search = searchString.trim()
    }
    else {
      delete query.search
    }
    push({query, pathname: location.pathname})
  }

  handleFilter = filterQuery => {
    const {location, push} = this.props
    const query = _.extend({}, location.query, {filters: JSON.stringify(filterQuery)})
    push({query, pathname: location.pathname})
  }

  handleReset = () => {
    const {location, push} = this.props
    push({query: {}, pathname: location.pathname})
  }

  hasData() {
    return !this.props.games.get('loading')
  }

  render() {
    if (!this.hasData()) return (<Loader />)
    const {location, games} = this.props
    const currentPage = +(location.query.page || 1)
    const itemsPerPage = +(location.query.perPage || ITEMS_PER_PAGE)
    const searchString = location.query.search || ''
    const filterQuery = parseFilterQuery(location.query.filters)

    return (
      <div>
        <Helmet title="Find games" />
        <SearchPage
          filters={this.props.filters}
          onFilter={this.handleFilter}
          onReset={this.handleReset}
          onSearch={this.handleSearch}
          onPerPage={this.handlePerPage}
          searchString={searchString}
          filterQuery={filterQuery}

          location={location}
          loading={games.get('loading')}
          visibleItems={this.props.visibleItems}
          totalItems={this.props.totalItems}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}

          headerProps={{className: 'games', title: 'Games', subtitle: `Scope out the awesome games`}}
          rowComponent={GameRow}
        />
      </div>
    )
  }

}
