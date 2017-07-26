import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import AvatarUploader from '../../utils/components/AvatarUploader'
import {save} from '../actions'

@connect(() => ({}), {save})
export default class ProfileAvatarUploader extends React.Component {

  static propTypes = {
    save: PropTypes.func.isRequired,
  }

  render() {
    return (
      <AvatarUploader {...this.props} />
    )
  }
}
