import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'

export default class StaticPage extends Component {
  render() {
    const {page} = this.props
    return (
      <div>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{__html: page.content}} />
      </div>
    )
  }
}

StaticPage.propTypes = {
  page: PropTypes.object.isRequired,
}
