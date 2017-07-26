import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {FormGroup, ControlLabel, Checkbox} from 'react-bootstrap'
import {Field} from 'redux-form'

export default class Checkboxes extends React.Component {

  static propTypes = {
    keyFn: PropTypes.func,
    labelFn: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  }

  static defaultProps = {
    keyFn: i => i.id && i.id.toString(),
    labelFn: i => i.label || i.name,
  }

  isSelected = (item, field) => {
    return _.includes(_.map(field.input.value, v => v.toString()), this.props.keyFn(item))
  }

  toggleItemFn = (item, field) => () => {
    const key = this.props.keyFn(item)
    const currentValue = field.input.value || []
    let newValue

    if (this.isSelected(item, field)) {
      newValue = _.without(currentValue, key)
    }
    else {
      newValue = currentValue.concat(key)
    }
    field.input.onChange(newValue)
  }

  renderItems = field => {
    const {keyFn, labelFn, items} = this.props
    return (
      <div>
        {_.map(items, item => (
          <Checkbox
            key={keyFn(item)}
            onClick={this.toggleItemFn(item, field)}
            checked={this.isSelected(item, field)}
          >
            {labelFn(item)}
          </Checkbox>
        ))}
      </div>
    )
  }

  render() {
    const {label, name} = this.props

    return (
      <FormGroup controlId={name}>
        {label && (<ControlLabel>{label}</ControlLabel>)}

        <Field
          name={name}
          component={this.renderItems}
        />

      </FormGroup>
    )
  }

}
