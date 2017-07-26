import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {reduxForm, Field} from 'redux-form'
import {Row, Col} from 'react-bootstrap'
import {Input, RadioField} from 'fl-react-utils'
import validateProfile from '../validation'
import AvatarUploader from '../containers/AvatarUploader'
import EditorButtons from '../../utils/components/EditorButtons'

@reduxForm({
  form: 'profile_details',
  validate: validateProfile,
})
export default class ProfileDetailsForm extends React.Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    renderButtons: PropTypes.func,
    loading: PropTypes.bool,
  }

  render() {
    const {loading, profile, renderButtons, onCancel, handleSubmit} = this.props

    return (
      <form className="register" onSubmit={handleSubmit}>
        <Row>
            <Col xs={12}>
              <Field
                name="avatarImage"
                help={!profile.avatarUrl && !profile.avatarImage && `Your profile will look heaps better with a picture`}
                profile={profile}
                component={AvatarUploader}
              />
            </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6}>
            <Field
              name="firstName"
              label="First name *"
              inputProps={{placeholder: 'Nicolas'}}
              component={Input}
            />
          </Col>

          <Col xs={12} sm={6}>
            <Field
              name="lastName"
              label="Last name *"
              inputProps={{placeholder: 'Cage'}}
              component={Input}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6}>
            <Field
              name="city"
              label="City"
              inputProps={{placeholder: 'City'}}
              component={Input}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Field
              name="country"
              label="Country"
              inputProps={{placeholder: 'Country'}}
              component={Input}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Field
              type="email"
              name="contactEmail"
              label="Contact email"
              inputProps={{placeholder: 'hello@example.com'}}
              component={Input}
              help="This email will be visible to other users of the site. Leave it blank if you don't want to have a public contact email."
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <RadioField
              name="gender"
              label="Gender"
              options={[
                {label: 'Male', value: 'male'},
                {label: 'Female', value: 'female'},
                {label: 'Prefer not to say', value: 'other'},
              ]}
              help="Your gender won’t be visible to other users. It's used for reporting purposes only."
            />
          </Col>
        </Row>

        {renderButtons ? renderButtons() : (<EditorButtons loading={loading} onCancel={onCancel} />)}

      </form>
    )
  }

}
