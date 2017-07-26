import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import Select from 'react-select'
import {Col} from 'react-bootstrap'

export default class ReactSelectFilter extends React.Component {

  static propTypes = {
    multi: PropTypes.bool,
    filter: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    filterQuery: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {selectedValues: []}
  }

  componentWillReceiveProps(newProps) {
    const {options} = newProps
    const valuesFromQuery = this.valueFromQuery(newProps)
    const selectedValues = []

    _.forEach(options, (option, index) => {
      const opts = option.options(newProps)
      const value = _.intersection(valuesFromQuery, _.map(opts, 'value'))
      selectedValues[index] = value
    })
    this.setState({selectedValues})
  }

  // Only update if the filter query has changed externally
  shouldComponentUpdate(newProps) {
    return !_.isEqual(this.valueFromQuery(this.props), this.valueFromQuery(newProps))
  }

  valueFromQuery(props) {
    const query = props.filterQuery
    const field = props.filter.field
    if (props.filter.valueFromQuery) return props.filter.valueFromQuery(query)
    if (_.isObject(query)) {
      if (query.$or) {
        return _(query.$or).map(searchObj => searchObj[field] ? searchObj[field].$search : null).compact().value()
      }
      else if (query[field]) {
        return query[field].$in || query[field]
      }
    }
    return []
  }

  query() { return this.state.query }

  //todo: upgrade react-select to 1.x when it's stable (ie when multi works)
  // valuesStr will then be an array of values rather than a comma separated string
  handleFilterChange = (valuesStr, index) => {
    const {filter} = this.props
    const values = valuesStr.length ? valuesStr.split(',') : []
    const selectedValues = _.clone(this.state.selectedValues)
    selectedValues[index] = values

    const combinedArray = _.flatten(selectedValues)
    let query = null

    if (combinedArray.length) {
      query = filter.query ? filter.query(combinedArray) : {$or: combinedArray.map(value => ({[filter.field]: {$search: value}}))}
    }

    this.setState({query, selectedValues})
    this.props.onFilter(filter, query)
  }

  render() {
    const {options, multi} = this.props
    return (
      <div>
        {options.map((option, index) => {
          return (
            <Col key={index} sm={4}>
              <div className="form-group">
                <label className="control-label">{option.label}</label>
                <Select
                  options={option.options(this.props)}
                  onChange={values => this.handleFilterChange(values, index)}
                  value={this.state.selectedValues[index]}
                  simpleValue
                  // joinValues
                  multi={multi}
                />
              </div>
            </Col>
          )}
        )}
      </div>
    )
  }
}
