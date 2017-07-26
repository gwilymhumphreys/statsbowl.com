import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import Inflection from 'inflection'
import {FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap'
import {validationHelp, validationState} from 'fl-react-utils'

const getRte = () => {
  if (typeof window !== 'undefined') return require('react-rte').default
  return null
}

export default class MarkdownInput extends React.Component {

  static propTypes = {
    label: PropTypes.node,
    input: PropTypes.object,
    help: PropTypes.node,
    defaultHelp: PropTypes.node,
    helpTop: PropTypes.bool,
    meta: PropTypes.object,
    validationState: PropTypes.func,
    inputProps: PropTypes.object,
    initialValue: PropTypes.string,
  }

  static defaultProps = {
    validationState,
    inputProps: {},
  }

  constructor(props) {
    super(props)
    this.state = {}
    const RichTextEditor = getRte()
    if (!RichTextEditor) return
    this.state.value = RichTextEditor.createValueFromString(props.input.value, 'markdown')
  }

  onChange = value => {
    this.setState({value})
    // todo: avoid generating a string on each change?
    this.props.input.onChange(value.toString('markdown'))
  }

  render() {
    const {label, input, meta, inputProps, helpTop, defaultHelp, validationState} = this.props

    let help = this.props.help
    if (_.isUndefined(help)) {
      help = validationHelp(meta) || defaultHelp
    }

    const id = Inflection.dasherize(input.name.toLowerCase())
    const RichTextEditor = getRte()
    const control = RichTextEditor ? (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
        {...inputProps}
      />
    ) : null

    return (
      <FormGroup controlId={id} validationState={validationState ? validationState(meta) : null}>
        {label && <ControlLabel>{label}</ControlLabel>}
        {help && helpTop && (<HelpBlock>{help}</HelpBlock>)}
        {control}
        {help && !helpTop && (<HelpBlock>{help}</HelpBlock>)}
      </FormGroup>
    )
  }
}
