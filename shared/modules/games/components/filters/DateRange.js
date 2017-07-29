import _ from 'lodash' // eslint-disable-line
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DateTime from 'react-datetime'

export default class DateRangeFilter extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    filter: PropTypes.object.isRequired,
    filterQuery: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,

    enableFrom: PropTypes.bool,
    enableTo: PropTypes.bool,
    fromLabel: PropTypes.string,
    toLabel: PropTypes.string,
  }

  static defaultProps = {
    enableFrom: true,
    enableTo: true,
    fromLabel: 'From',
    toLabel: 'To',
  }

  constructor() {
    super()
    this.state = {}
  }

  // data: $gte or $lte
  getFromDate() {
    const query = this.props.filterQuery[this.props.filter.field]
    if (!query) return this.props.filter.default || ''
    if (_.isObject(query)) return moment(query.$gte).format('LL')
    return query
  }

  getToDate() {
    const query = this.props.filterQuery[this.props.filter.field]
    if (!query) return this.props.filter.default || ''
    if (_.isObject(query)) return moment(query.$lte).format('LL')
    return query
  }

  query() { return this.state.query }

  handleFilter = () => {
    const dateQuery = {}
    if (this.state.fromDate) dateQuery.$gte = this.state.fromDate
    if (this.state.toDate) dateQuery.$lte = this.state.toDate
    const query = {[this.props.filter.field]: dateQuery}
    this.setState({query})
    this.props.onFilter(this.props.filter, query)
  }

  handleFromDateChange = data => {
    const tempDate = data ? data.toDate() : null
    this.setState({fromDate: tempDate}, err => {
      if (!err) this.handleFilter()
    })
  }

  handleToDateChange = data => {
    const tempDate = data ? data.toDate() : null
    this.setState({toDate: tempDate}, err => {
      if (!err) this.handleFilter()
    })
  }

  render() {
    const {label, enableFrom, enableTo, fromLabel, toLabel} = this.props

    return (
      <div>
        <label className="control-label">{label}</label>
        {enableFrom && (
          <div className="form-group">
            {fromLabel && <label className="control-label">{fromLabel}</label>}
            <DateTime name={`${label}_from`} closeOnSelect defaultValue={this.getFromDate()} dateFormat="LL" timeFormat={false} onChange={this.handleFromDateChange} />
          </div>
        )}
        {enableTo && (
          <div className="form-group">
            {toLabel && <label className="control-label">{toLabel}</label>}
            <DateTime name={`${label}_to`} closeOnSelect defaultValue={this.getToDate()} dateFormat="LL" timeFormat={false} onChange={this.handleToDateChange} />
          </div>
        )}
      </div>
    )
  }
}

