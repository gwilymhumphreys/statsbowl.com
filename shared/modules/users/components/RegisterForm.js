import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {Alert, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import {reduxForm, Field, formValueSelector} from 'redux-form'
import {Link} from 'react-router'
import Collapse from 'react-collapse'
import {Input} from 'fl-react-utils'
import {validateEmailPass} from '../validation'
import TermsModal from './TermsModal'
import PrivacyModal from './PrivacyModal'
import Button from '../../utils/components/Button'

const selector = formValueSelector('register')

// Connect this form to redux to get the current value of email. Kind of bleh, but whatever
@connect(
  state => ({email: selector(state, 'email')}),
)
@reduxForm({
  form: 'register',
  validate: validateEmailPass,
})
export default class RegisterForm extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    email: PropTypes.string,
    errorMsg: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {showTermsModal: false, showPrivacyModal: false}
  }

  openTermsModal = () =>  this.setState({showTermsModal: true})
  openPrivacyModal = () =>  this.setState({showPrivacyModal: true})

  closeTermsModal = () => this.setState({showTermsModal: false})
  closePrivacyModal = () => this.setState({showPrivacyModal: false})

  render() {
    const {loading, errorMsg, handleSubmit, email} = this.props
    const showEmail = !!(this.state.showEmail || loading)

    return (
      <div className="text-center">
        <h2 className="header">Alrighty, let's get you started!</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <Row>
            <Col sm={8} smOffset={2}>
              <Field
                ref="email"
                type="email"
                name="email"
                inputProps={{placeholder: 'Email'}}
                component={Input}
              />
              <Field
                type="password"
                name="password"
                inputProps={{placeholder: 'Password (6 or more characters)'}}
                component={Input}
              />

              {errorMsg && (
                <Alert bsStyle="info">
                  {errorMsg === 'User already exists' ? (
                    <div>
                      <strong>Hey!</strong> Looks like that email is already registered. You can <Link to={`/login?email=${email}`}> sign in here</Link>.
                    </div>
                  ) : errorMsg}
                  <span style={{display: 'none'}}>{errorMsg}</span>
                </Alert>
              )}

              <Button block loading={loading} bsStyle="primary" bsSize="large" type="submit">Join the community</Button>

            </Col>
          </Row>

          <p className="text-light">
            By signing up, you agree to our <a onClick={this.openTermsModal}>terms of use</a> and <a onClick={this.openPrivacyModal}>privacy policy</a>.
          </p>
        </form>

        <TermsModal show={this.state.showTermsModal} onHide={this.closeTermsModal} />
        <PrivacyModal show={this.state.showPrivacyModal} onHide={this.closePrivacyModal} />
      </div>
    )
  }
}
