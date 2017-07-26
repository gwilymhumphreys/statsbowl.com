import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {Grid, Row, Col} from 'react-bootstrap'
import TermsModal from '../../users/components/TermsModal'
import PrivacyModal from '../../users/components/PrivacyModal'

@connect(state => _.pick(state, 'auth', 'config', 'app'), {})
export default class Navbar extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
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
    // const {app} = this.props
    // const staticPageLinks = app.get('staticPageLinks').toJSON()
    // const {footerContactInfo, facebookUrl, twitterUrl, instagramUrl} = app.get('settings').toJSON()
    // const pageLinks = staticPageLinks && _.map(staticPageLinks, p => (<li key={p.slug}><Link to={`/${p.slug}`}>{p.title}</Link></li>))

    return (
      <footer>
        <Grid fluid className="org-footer">
          <Row>
            <Col xs={12} md={6} className="copyright">
              &copy; statsbowl Pty Ltd 2016
            </Col>
            <Col xs={12} md={6} className="terms-privacy text-right">
              <a href="mailto:hello@statsbowl.com">hello@statsbowl.com</a> | <a onClick={this.openTermsModal}>Terms</a> | <a onClick={this.openPrivacyModal}>Privacy</a>
            </Col>
          </Row>
        </Grid>
        <TermsModal show={this.state.showTermsModal} onHide={this.closeTermsModal} />
        <PrivacyModal show={this.state.showPrivacyModal} onHide={this.closePrivacyModal} />
      </footer>
    )
  }
}
