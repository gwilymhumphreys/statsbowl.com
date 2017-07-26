import _ from 'lodash' // eslint-disable-line
import React, {Component, PropTypes} from 'react'
import prefixLinks from '../prefixLinks'

export default class SocialLinks extends Component {

  static propTypes = {
    source: PropTypes.object.isRequired,
    hideWebsite: PropTypes.bool,
    editable: PropTypes.bool,
    onEdit: PropTypes.func,
  }

  render() {
    const {hideWebsite, editable, onEdit} = this.props
    const source = prefixLinks(this.props.source)
    const hasSome = source.linkedInUrl || source.facebookUrl || source.twitterUrl || source.instagramUrl || source.googlePlusUrl || source.githubUrl
    return (
      <div className="social-links">
        {source.websiteUrl && !hideWebsite && (<a href={source.websiteUrl} target="_blank"><i className="fa fa-link social-icon"/></a>)}
        {source.linkedInUrl && (<a href={source.linkedInUrl} target="_blank"><i className="fa fa-linkedin social-icon" href={source.linkedInUrl} /></a>)}
        {source.facebookUrl && (<a href={source.facebookUrl} target="_blank"><i className="fa fa-facebook social-icon" href={source.facebookUrl} /></a>)}
        {source.twitterUrl && (<a href={source.twitterUrl} target="_blank"><i className="fa fa-twitter social-icon" href={source.twitterUrl} /></a>)}
        {source.instagramUrl && (<a href={source.instagramUrl} target="_blank"><i className="fa fa-instagram social-icon" href={source.instagramUrl} /></a>)}
        {source.googlePlusUrl && (<a href={source.googlePlusUrl} target="_blank"><i className="fa fa-google-plus social-icon" href={source.googlePlusUrl} /></a>)}
        {source.githubUrl && (<a href={source.githubUrl} target="_blank"><i className="fa fa-github social-icon" href={source.githubUrl} /></a>)}
        {editable && onEdit && (<a onClick={onEdit}>{!hasSome && editable && onEdit && (<span>Add some links </span>)}<i className="fa fa-pencil social-edit" /></a>)}
      </div>
    )
  }
}
