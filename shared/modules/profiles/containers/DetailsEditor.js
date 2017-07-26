import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {save} from '../actions'
import Loader from '../../utils/components/Loader'
import DetailsForm from '../components/DetailsForm'

@connect(state => ({profiles: state.profiles}), {save})
export default class DetailsEditor extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    onComplete: PropTypes.func,

    profiles: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
  }

  handleSubmit = data => {
    this.props.save(_.extend(this.props.profile, data), err => {
      if (err) return console.error(err) // todo: errors
      // this.props.onComplete && this.props.onComplete()
    })
  }

  handleCancel = () => {
    this.props.onComplete && this.props.onComplete()
  }

  hasData() {
    return !this.props.profiles.get('loading')
  }

  render() {
    if (!this.hasData()) return (<Loader />)
    const {profile, profiles} = this.props
    const errors = profiles.get('errors').toJSON()

    return (
      <DetailsForm
        profile={profile}
        initialValues={profile}
        errors={errors}
        onCancel={this.handleCancel}
        onSubmit={this.handleSubmit}
      />
    )
  }
}
