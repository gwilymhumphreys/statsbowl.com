import _ from 'lodash' // eslint-disable-line
import React from 'react'
import PropTypes from 'prop-types'
import ReactSlider from 'react-slider'
import warning from 'warning'

export default class RangeSliderFilter extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    filter: PropTypes.object.isRequired,
    filterQuery: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {}
  }

  query() { return this.state.query }

  toString = () => {
    const value = !_.isUndefined(this.state.value) ? this.state.value : this.defaultValue()
    const {filter} = this.props
    if (filter.hasOwnProperty('toString')) return filter.toString(value, filter)
    if (_.isArray(value)) return `${value[0]} - ${value[1]}`
    return value
  }

  defaultValue() {
    const {filterQuery, filter} = this.props
    if (filter.field) {
      const query = filterQuery[filter.field]
      if (!query) return filter.default
      if (_.isObject(query)) return [+query.$gte, +query.$lte]
      return +query
    }
    else if (filter.between) {
      const fields = filter.fields
      return filterQuery[fields[0]] ? filterQuery[fields[0]].$lte : filter.default
    }
    else if (filter.multi) {
      const fields = filter.fields
      const queryOne = filterQuery[fields[0]] ? filterQuery[fields[0]].$gte : filter.default[0]
      const queryTwo = filterQuery[fields[1]] ? filterQuery[fields[1]].$lte : filter.default[1]
      if (!queryOne && !queryTwo) return filter.default
      return [+queryOne, +queryTwo]
    }
  }

  handleFilterStateChange = data => this.setState({value: data})

  handleAfterChange = () => {
    const {filter} = this.props
    const value = this.state.value
    if (!value) return
    let query = {}
    if (filter.field) {
      query = {[filter.field]: _.isArray(value) ? {$gte: +value[0], $lte: +value[1]} : +value}
    }
    else if (filter.between) {
      if (value !== filter.default) {
        query = {
          [filter.fields[0]]: {$lte: +value},
          [filter.fields[1]]: {$gte: +value},
        }
      }
    }
    else if (filter.multi && _.isArray(value)) {
      query = {
        [filter.fields[0]]: {$gte: +value[0]},
        [filter.fields[1]]: {$lte: +value[1]},
      }
    }
    else {
      warning('RangeSlider: Missing field(s) or fields option was provided without multi: true')
    }
    this.setState({query})
    this.props.onFilter(filter, query)
  }

  render() {
    const {label, filter} = this.props
    const sliderProps = _.merge(filter, {
      withBars: true,
      className: filter.multi && 'slider multi',
      onChange: this.handleFilterStateChange,
      onAfterChange: this.handleAfterChange,
    })
    sliderProps.defaultValue = this.defaultValue()
    return (
      <div className="form-group slider-container">
        <label>{label}</label>
        <span className="slider-value pull-right">{this.toString()}</span>
        <ReactSlider {...sliderProps} />
      </div>
    )
  }
}

