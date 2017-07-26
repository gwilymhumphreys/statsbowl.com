import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {formatLocation, formatDateDuration} from '../../utils/format'
import ProfileAvatar from '../../utils/components/Avatar'
import SocialLinks from '../../utils/components/SocialLinks'
import DetailsEditor from '../containers/DetailsEditor'

export default class ProfileHeader extends React.Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    editable: PropTypes.bool,
  }

  constructor() {
    super()
    this.state = {
      editing: false,
      linksEditing: false,
    }
  }

  handleToggleEdit = () => this.setState({editing: !this.state.editing})
  handleToggleLinksEdit = () => this.setState({linksEditing: !this.state.linksEditing})

  render() {
    const {profile, errors, editable} = this.props
    const {editing, linksEditing} = this.state
    const locationStr = formatLocation(profile)
    if (errors) {
      // console.error('errors:', errors)
    }

    return (
      <div>

        <Grid fluid className={`profile-header ${profile.role}`}>
          <Row>
            <Col xs={12} className="profile-actions">
              {profile.lastActiveDate && (<p className="last-seen">Last seen {formatDateDuration(profile.lastActiveDate)} ago</p>)}
              {editable ? (
                !editing && (<p><Button bsStyle="primary" onClick={this.handleToggleEdit}>Edit Profile</Button></p>)
              ) : (
                profile.contactEmail && (<p><Button bsStyle="primary" href={`mailto:${profile.contactEmail}`}>Contact</Button></p>)
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h2 className="display-name">{profile.nickname}</h2>
              <p className="location">{locationStr}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ProfileAvatar bordered source={profile} />
            </Col>
          </Row>
        </Grid>

        <Grid fluid className="profile-details">
          {editing && (
            <Row>
              <Col xs={12}>
                <DetailsEditor profile={profile} onComplete={this.handleToggleEdit} />
              </Col>
            </Row>
          )}
        </Grid>
      </div>
    )
  }
}
