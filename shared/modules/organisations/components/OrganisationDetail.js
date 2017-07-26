import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'

export default class OrganisationDetail extends React.Component {

  render() {
    const {organisation} = this.props

    return (
      <div>
        <h2>{organisation.name}</h2>
      </div>
    )
  }
}

OrganisationDetail.propTypes = {
  organisation: PropTypes.object.isRequired,
}
