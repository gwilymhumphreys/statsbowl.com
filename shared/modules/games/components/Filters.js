import _ from 'lodash' // eslint-disable-line
import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'
import Collapse from 'react-collapse'
import RangeSlider from './filters/RangeSlider'
import Select from './filters/Select'
import Checkbox from './filters/Checkbox'
import Checkboxes from './filters/Checkboxes'
import DateRange from './filters/DateRange'
import ReactSelect from './filters/ReactSelect'

function concatMerge(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

export default class Filters extends React.Component {

  static propTypes = {
    filters: PropTypes.array.isRequired,
    filterQuery: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
    onReset: PropTypes.func,
  }

  // filters prop is used for initial values only
  constructor(props) {
    super()
    this._renderFilters = {}
    this.state = {filters: props.filters, isOpened: true}
  }

  // make sure that the filters box is hidden on small screens and visible on large
  componentDidMount() {
    this.setState({isOpened: window.innerWidth > 480}) //eslint-disable-line
  }

  filterId = filter => filter.id || filter.field || filter.label

  handleFilter = (filter, _query) => {
    setTimeout(() => {
      let finalQuery = {}
      _.forEach(this._renderFilters, (component, id) => {
        const query = this.filterId(filter) === id ? _query : component.query()
        if (query) finalQuery = _.mergeWith(finalQuery, query, concatMerge)
      })
      this.props.onFilter(finalQuery)
    })
  }

  handleToggleOpened = () => {
    this.setState({isOpened: !this.state.isOpened})
  }

  renderFilterControl = (filter, index) => {
    const {filterQuery} = this.props

    const filterProps = {
      ...filter,
      key: index,
      filter,
      filterQuery,
      options: _.isFunction(filter.options) ? filter.options(this.props) : filter.options,
      onFilter: this.handleFilter,
      ref: component => this._renderFilters[this.filterId(filter)] = component,
    }

    let component = null

    switch (filter.type) {

      case 'range':
        component = (<RangeSlider {...filterProps} />)
        break

      case 'select':
        component = (<Select {...filterProps} />)
        break

      case 'react-select':
        component = (<ReactSelect {...this.props} {...filterProps} />)
        break

      case 'checkbox':
        component = (<Checkbox {...filterProps} />)
        break

      case 'checkboxes':
        component = (<Checkboxes {...filterProps} />)
        break

      case 'dateRange':
        component = (<DateRange {...filterProps} />)
        break

      default:
        warning(false, `Unknown filter input type: ${filter.type}`)
    }

    return component
  }

  renderFilterGroup = (filterGroup, index) => {
    if (!filterGroup.filters) return this.renderFilterControl(filterGroup, index)

    return (
      <div key={index} className="filter-group">
        <div className="filter-group-filters">
          {filterGroup.filters.map(this.renderFilterControl)}
        </div>
      </div>
    )
  }

  render() {
    const isOpened = this.state.isOpened
    return (
      <form onSubmit={e => e.preventDefault()}>
        <h3 className="hidden-xs">Filter results</h3>
        <h3 className="visible-xs"><a onClick={this.handleToggleOpened}>Filter results <i className={`fa fa-${isOpened ? 'caret-up' : 'caret-down'}`} /></a></h3>

        <Collapse keepCollapsedContent isOpened={isOpened}>
          <div className="filter-controls">
            {this.state.filters.map(this.renderFilterGroup)}

            {this.props.onReset ? (
              <div className="actions">
                <a className="pull-right clear" onClick={this.props.onReset}><i className="fa fa-times" /> Clear</a>
              </div>
            ) : null}
          </div>
        </Collapse>
      </form>
    )
  }
}
