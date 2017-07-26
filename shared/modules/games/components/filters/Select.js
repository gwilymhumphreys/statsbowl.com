import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Input} from 'fl-react-utils'

export default class SelectFilter extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    filter: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    filterQuery: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {}
  }

  query() { return this.state.query }

  defaultValue() {
    const query = this.props.filterQuery[this.props.filter.field]
    if (!query) return this.props.filter.default || ''
    return query
  }

  handleChange = event => {
    const query = event.target.value ? {[this.props.filter.field]: event.target.value} : null
    this.setState({query})
    this.props.onFilter(this.props.filter, query)
  }

  render() {
    const {filter, label, options} = this.props

    return (
      <Input type="select" label={label} name={filter.field} defaultValue={this.defaultValue()} onChange={this.handleChange}>
        <option value=""></option>
        {_.map(options, option => (<option key={option.id || option.name} value={option.id}>{option.name}</option>))}
      </Input>
    )
  }
}

