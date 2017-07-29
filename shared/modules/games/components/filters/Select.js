import _ from 'lodash' // eslint-disable-line
import React from 'react'
import PropTypes from 'prop-types'
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

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

  value() {
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
      <FormGroup controlId={filter.field}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl componentClass="select" value={this.value()} onChange={this.handleChange}>
          {_.map(options, option => (<option key={option.value} value={option.value}>{option.label}</option>))}
        </FormControl>
      </FormGroup>
    )
  }
}
