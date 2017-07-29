import _ from 'lodash' // eslint-disable-line
import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

export default class ReactSelectFilter extends React.Component {

  static propTypes = {
    filter: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    filterQuery: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
  }

  constructor(props) {
    super()
    const selectedValues = this.selectedValuesFromProps(props)
    this.state = {selectedValues}
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

  selectOptions = (option, props) => _.isFunction(option.selectOptions) ? option.selectOptions(props) : option.selectOptions

  selectedValuesFromProps(newProps) {
    const {options} = newProps
    const valuesFromQuery = this.valuesFromQuery(newProps)
    const selectedValues = []

    _.forEach(options, (option, index) => {
      const opts = this.selectOptions(option, newProps)
      const value = _.intersection(valuesFromQuery, _.map(opts, 'value'))
      selectedValues[index] = value
    })
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
      else if (query.$or || query.$and) {
        const list = query.$or || query.$and
        return _(list).map(searchObj => searchObj[field] ? (searchObj[field].$search || searchObj[field]) : null).compact().value()
      }
    }
    return []
  }

  //todo: upgrade react-select to 1.x when it's stable (ie when multi works)
  // valuesStr will then be an array of values rather than a comma separated string
  handleFilterChangeFn = (option, index) => valuesStr => {
    const values = valuesStr.length ? valuesStr.split(',') : []
    const selectedValues = _.clone(this.state.selectedValues)
    selectedValues[index] = values

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
    return {$or: flatValues.map(value => ({[filter.field]: {$search: value}}))}
  }

  render() {
    const {options} = this.props

    return (
      <div>
        {options.map((option, index) => {
          const value = option.multi ? this.state.selectedValues[index] : (this.state.selectedValues[index] && this.state.selectedValues[index][0])
          return (
            <div key={index} className="form-group">
              <label className="control-label">{option.label}</label>
              <Select
                options={this.selectOptions(option, this.props)}
                onChange={this.handleFilterChangeFn(option, index)}
                value={value}
                simpleValue
                // joinValues
                multi={option.multi}
              />
            </div>
          )}
        )}
      </div>
    )
  }
}
