import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Row, Col} from 'react-bootstrap'
import Collapse from 'react-collapse'
import warning from 'warning'
import RangeSlider from './filters/RangeSlider'
import Select from './filters/Select'
import Checkboxes from './filters/Checkboxes'
import DateRange from './filters/DateRange'
import ReactSelect from './filters/ReactSelect'

export default class Filters extends React.Component {

  static propTypes = {
    filters: PropTypes.array.isRequired,
    filterQuery: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
  }

  // filters prop is used for initial values only
  constructor(props) {
    super()
    this._renderFilters = {}
    this.state = {filters: props.filters}
  }

  filterId = filter => filter.id || filter.label

  handleFilter = (filter, _query) => {
    setTimeout(() => {

      let finalQuery = {}
      _.forEach(this._renderFilters, (component, id) => {
        const query = this.filterId(filter) === id ? _query : component.query()
        if (query) finalQuery = _.merge(finalQuery, query)
      })

      this.props.onFilter(finalQuery)
    })
  }

  toggleFilterGroupFn = i => () => {
    const filters = this.state.filters
    filters[i].visible = !filters[i].visible
    this.setState({filters})
  }

  renderFilter(filter, index) {
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
    if (filterGroup.collapse) {
      return (
        <Row key={index} className="filter-group">
          <a onClick={this.toggleFilterGroupFn(index)} className={`group-title ${filterGroup.visible ? 'active' : ''}`}>
            {filterGroup.heading} <i className={`fa fa-${filterGroup.visible ? 'caret-down' : 'caret-right'}`} />
          </a>
          <Col xs={12}>
            <Collapse keepCollapsedContent isOpened={!!filterGroup.visible}>
              <Row className="filter-group-filters">
                {filterGroup.filters.map((filter, i) => this.renderFilter(filter, i))}
              </Row>
            </Collapse>
          </Col>
        </Row>
      )
    }

    return (
      <Row key={index} className="filter-group">
        <div className="filter-group-filters">
          {filterGroup.filters.map((filter, i) => this.renderFilter(filter, i))}
        </div>
      </Row>
    )
  }

  render() {
    return (
      <form onSubmit={e => e.preventDefault()} className="filters">
        {this.state.filters.map((filter, i) => (
          filter.filters ? this.renderFilterGroup(filter, i) : this.renderFilter(filter)
        ))}
        <Row className="actions">
          <Col xs={12}>
            <a className="pull-right clear" onClick={this.props.onReset}><i className="fa fa-times" /> Clear</a>
          </Col>
        </Row>
      </form>
    )
  }
}
