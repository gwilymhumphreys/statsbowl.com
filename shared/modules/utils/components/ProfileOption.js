import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import classNames from 'classnames'
import Avatar from './Avatar'

export default class Option extends React.Component {

  static propTypes = {
    addLabelText: PropTypes.string,          // string rendered in case of allowCreate option passed to ReactSelect
    className: PropTypes.string,             // className (based on mouse position)
    mouseDown: PropTypes.func,               // method to handle click on option element
    mouseEnter: PropTypes.func,              // method to handle mouseEnter on option element
    mouseLeave: PropTypes.func,              // method to handle mouseLeave on option element
    option: PropTypes.object.isRequired,     // object that is base for that option
    renderFunc: PropTypes.func,              // method passed to ReactSelect component to render label text
  }

  blockEvent = event => {
    event.preventDefault()
    if ((event.target.tagName !== 'A') || !('href' in event.target)) {
      return
    }

    if (event.target.target) {
      window.open(event.target.href)
    }
    else {
      window.location.href = event.target.href
    }
  }

  handleMouseDown = e => {
    this.props.mouseDown(this.props.option, e)
  }
  handleMouseEnter = e => {
    this.props.mouseEnter(this.props.option, e)
  }
  handleMouseLeave = e => {
    this.props.mouseLeave(this.props.option, e)
  }

  render() {
    const {option} = this.props
    const {profile} = option
    const label = option.create ? this.props.addLabelText.replace('{label}', option.label) : this.props.renderFunc(option)
    const optionClasses = classNames(this.props.className, option.className, 'profile-option')

    return option.disabled ? (
      <div className={optionClasses}
        onMouseDown={this.blockEvent}
        onClick={this.blockEvent}>
        {label}
      </div>
    ) : (
      <div className={optionClasses}
        style={option.style}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleMouseDown}
        title={option.title}
      >
        {profile && (<Avatar source={profile} size={50} className="pull-left" />)} <span className="name">{label}</span>
      </div>
    )
  }
}
