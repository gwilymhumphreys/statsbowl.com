import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import ProfileHeader from './ProfileHeader'

export default class Profile extends React.Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    editable: PropTypes.bool,
  }

  render() {
    const {profile, editable, errors} = this.props
    const panelProps = {profile, editable}
    if (errors) {
      // console.error('errors:', errors)
    }

    return (
      <div className="profile">
        <ProfileHeader {...panelProps} errors={errors} />

        <Grid fluid className="profile-body">

        </Grid>
      </div>
    )
  }
}
