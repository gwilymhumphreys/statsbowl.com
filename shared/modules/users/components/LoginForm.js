import React, {Component, PropTypes} from 'react'
import {Alert, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router'
import {reduxForm, Field} from 'redux-form'
import {Input} from 'fl-react-utils'
import Button from '../../utils/components/Button'

@reduxForm({
  form: 'login',
})
export default class LoginForm extends Component {

  static propTypes = {
    email: PropTypes.string,
    loading: PropTypes.bool,
    errorMsg: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {handleSubmit, loading, errorMsg} = this.props
    const email = this.props.email || ''

    return (
      <form onSubmit={handleSubmit} className="login">
        <Row>
          <Col sm={8} smOffset={2}>
            <Field
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
              <Alert bsStyle="warning">
                <strong>Sorry!</strong> Either that email address hasn't been registered or your password isn't correct. Try again or <Link to={`/reset-request?email=${email}`}>reset your password</Link>.
                <span style={{display: 'none'}}>{errorMsg}</span>
              </Alert>
            )}

            <Button loading={loading} type="submit" bsStyle="primary" block onClick={handleSubmit}>Sign in</Button>

          </Col>
        </Row>

        <div className="text-center">
          <hr />
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
          <p>Forgot your password?<Link to={`/reset-request?email=${email}`}> Reset it here</Link></p>
        </div>
      </form>
    )
  }
}
