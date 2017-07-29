import _ from 'lodash' // eslint-disable-line
import React from 'react'
import PropTypes from 'prop-types'
import {Checkbox} from 'react-bootstrap'
import Collapse from 'react-collapse'
import classNames from 'classnames'

export default class CheckboxFilter extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    filter: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    filterQuery: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
  }

  constructor(props) {
    super()
    const selectedValues = this.selectedValuesFromProps(props)
    this.state = {
      visibleLabels: {},
      selectedValues,
    }
  }

  componentWillReceiveProps(newProps) {
    const selectedValues = this.selectedValuesFromProps(newProps)
    this.setState({selectedValues})
  }

  // Only update if the filter query has changed externally
  shouldComponentUpdate(newProps) {
    if (newProps.filter && newProps.filter.shouldComponentUpdate) {
      if (newProps.filter.shouldComponentUpdate(newProps, this.props)) return true
    }
    return !_.isEqual(this.valuesFromQuery(this.props), this.valuesFromQuery(newProps))
  }

  selectedValuesFromProps(newProps) {
    const {options} = newProps
    const valuesFromQuery = this.valuesFromQuery(newProps)
    const availableOptions = _(options).map('checkboxes').flatten().value()
    const selectedValues = _.intersection(valuesFromQuery, availableOptions)
    return selectedValues
  }

  valuesFromQuery(props) {
    const query = props.filterQuery
    const field = props.filter.field
    if (props.filter.valuesFromQuery) return props.filter.valuesFromQuery(query, props)
    if (_.isObject(query)) {
      if (query[field]) {
        return query[field].$in || query[field]
      }
      else if (query.$or) {
        return _(query.$or).map(searchObj => searchObj[field] ? (searchObj[field].$search || searchObj[field]) : null).compact().value()
      }
    }
    return []
  }

  valueSelected = value => _.includes(this.state.selectedValues, value)

  isOpened = group => group.alwaysVisible || (_.isUndefined(this.state.visibleLabels[group.label]) ? group.visible : this.state.visibleLabels[group.label])

  toggleFilterGroupFn = group => () => {
    this.setState({visibleLabels: {[group.label]: !this.isOpened(group)}})
  }

  handleChangeFn = value => () => {
    let selectedValues = null

    if (this.valueSelected(value)) {
      selectedValues = _.without(this.state.selectedValues, value)
    }
    else {
      selectedValues = this.state.selectedValues.concat([value])
    }

    this.setState({selectedValues}, () => {
      this.props.onFilter(this.props.filter, this.query())
    })
  }

  query() {
    const {filter} = this.props
    const {selectedValues} = this.state
    const flatValues = _.flatten(selectedValues)

    if (!flatValues.length) return {}
    if (filter.query) return filter.query(flatValues, {selectedValues, props: this.props})
    return {$or: selectedValues.map(value => ({[filter.field]: value}))}
  }

  renderGroup = (group, i) => {
    const checkboxes = group.checkboxes.map(value => (
      <Checkbox
        key={value}
        onChange={this.handleChangeFn(value)}
        checked={this.valueSelected(value)}
        className={classNames({active: this.valueSelected(value)})}
      >
        {value}
      </Checkbox>
    ))
    const isOpened = this.isOpened(group)

    return (
      <div key={group.label} className="checkbox-group">
        {!group.alwaysVisible && (
          <a className="checkbox-label" onClick={this.toggleFilterGroupFn(group)}>
            {group.label} <i className={`fa fa-${isOpened ? 'caret-up' : 'caret-down'}`} />
          </a>
        )}
        <Collapse keepCollapsedContent isOpened={isOpened}>
          {checkboxes}
        </Collapse>
      </div>
    )
  }

  render() {
    const {filter, options} = this.props
    const groups = _.map(options, option => this.renderGroup(option))

    return (
      <div className={classNames('form-group', this.props.className)}>
        {filter.label && (<label>{filter.label}</label>)}
        <div className="checkboxes">
          {groups}
        </div>
      </div>
    )
  }
}
