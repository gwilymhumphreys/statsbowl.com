import _ from 'lodash' // eslint-disable-line
import React from 'react'
import PropTypes from 'prop-types'
import {FormGroup, Checkbox} from 'react-bootstrap'

export default class CheckboxFilter extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    filter: PropTypes.object.isRequired,
    filterQuery: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
  }

  constructor(props) {
    super()
    this.state = {
      checked: this.checkedFromProps(props),
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({checked: this.checkedFromProps(newProps)})
  }

  checkedFromProps(newProps) {
    if (newProps.filter.valueFromQuery) return newProps.filter.valueFromQuery(newProps.filterQuery)
    return newProps.filterQuery[newProps.filter.field] || !!newProps.filter.default
  }

  query() {
    const {checked} = this.state
    console.log('qchecked', checked)
    let query
    if (this.props.filter.query) query = this.props.filter.query(checked)
    else query = checked ? {[this.props.filter.field]: checked} : {}
    console.log('query is', query)
    return query
  }

  handleChange = () => {
    const checked = !this.state.checked
    console.log('handleChange', checked)
    this.setState({checked}, () => {
      this.props.onFilter(this.props.filter, this.query())
    })
  }

  render() {
    const {filter, label} = this.props

    return (
      <FormGroup controlId={filter.field}>
        <Checkbox checked={this.state.checked} onChange={this.handleChange}>
          {label}
        </Checkbox>
      </FormGroup>
    )
  }
}
