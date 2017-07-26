import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Input} from 'fl-react-utils'
import classNames from 'classnames'

export default class CheckboxFilter extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    filter: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    filterQuery: PropTypes.object.isRequired,
    onFilter: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {query: null}
    this._checkboxes = {}
  }

  componentWillMount() {
    this.setState({query: this.defaultValue()})
  }

  query() { return this.state.query }

  defaultValue() {
    return _.pick(this.props.filterQuery || {}, _.map(this.props.options, 'field'))
  }

  handleChange = () => {
    const potentialQuery = {}
    let checkedCount = 0

    _.forEach(this.props.options, option => {
      const checked = this._checkboxes[option.field].getChecked()
      if (checked) {
        checkedCount++
        potentialQuery[option.field] = true
      }
    })

    const query = checkedCount ? potentialQuery : null
    this.setState({query, dirty: true}, () => {
      this.props.onFilter(this.props.filter, query)
    })
  }

  render() {
    const {label, options} = this.props
    const checkboxes = _.map(options, (option) => {
      const props = {
        key: option.field,
        name: option.field,
        type: 'checkbox',
        ref: c => this._checkboxes[option.field] = c,
        label: option.label,
        inputProps: {
          standalone,
          onChange: this.handleChange,
          checked: this.state.query && this.state.query[option.field],
        },
      }
      return (<Input {...props} />)
    })
    return (
      <div className={classNames('form-group', this.props.className)}>
        {label && (<label>{label}</label>)}
        {checkboxes}
      </div>
    )
  }
}
