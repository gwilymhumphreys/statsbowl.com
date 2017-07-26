import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {load} from '../actions'
import Loader from '../../utils/components/Loader'
import OrganisationDetail from '../components/OrganisationDetail'

@connect(state => ({..._.pick(state, 'organisations', 'router')}), {})
export default class OrganisationDetailContainer extends Component {

  static propTypes = {
    app: PropTypes.object.isRequired,
    organisations: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  static fetchData({store, action}, callback) {
    const {router} = store.getState()
    const id = ((action && action.payload && action.payload.params) || router.params).id
    store.dispatch(load({id}, callback))
  }

  hasData() {
    return !this.props.organisations.get('loading')
  }

  render() {
    if (!this.hasData()) return (<Loader />)
    const {organisations, router} = this.props
    const modelId = router.params.id
    const organisation = organisations.get('models').get(modelId).toJSON()

    return (
      <div>
        <Helmet title={organisation.name} />
        <OrganisationDetail organisation={organisation} />
      </div>
    )
  }
}
