import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {Link} from 'react-router'
import Gravatar from 'react-gravatar'
import {S3Image} from 'fl-react-utils'
import Icon from '../../utils/components/Icon'

export default class Avatar extends React.Component {

  static propTypes = {
    source: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired,
    linked: PropTypes.bool,
    className: PropTypes.string,
    defaultIcon: PropTypes.string,
    getLink: PropTypes.func,
    profile: PropTypes.bool,
    startup: PropTypes.bool,
    bordered: PropTypes.bool,
  }

  static defaultProps = {
    size: 80,
    getLink: source => `/people/${source.id}`,
    defaultIcon: 'flaticon/motorcyclist',
  }

  render() {
    const {source, className, size} = this.props
    let image = null
    let fallback = (
      <div className="avatar-backup">
        <Icon icon={this.props.defaultIcon} />
      </div>
    )

    if (source.avatarUrl) {
      image = (<img className="avatar-image" src={source.avatarUrl} />)
      fallback = null
    }
    else if (source.avatarImage || source.logoImage) {
      image = (<S3Image className="avatar-image" filename={source.avatarImage || source.logoImage} />)
      fallback = null
    }
    else if (source.emailMd5) {
      image = (
        <div>
          <Gravatar alt={null} md5={source.emailMd5} size={this.props.size} default="blank" />
        </div>
      )
    }

    const classes = classNames(className, {
      avatar: true,
      profile: this.props.profile,
      startup: this.props.startup,
      bordered: this.props.bordered,
    })

    return (
      <div className={classes} style={{width: size, height: size}}>
        {this.props.linked ? (
          <Link to={this.props.getLink(source)}>
            {image}
            {fallback}
          </Link>
        ) : (
          <div>
            {image}
            {fallback}
          </div>
        )}
      </div>
    )
  }
}
