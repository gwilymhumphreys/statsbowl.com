import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import classNames from 'classnames'
import SearchBox from './SearchBox'
import Filters from './Filters'

export default class SearchHeader extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    className: PropTypes.string,
  }

  render() {
    const {title, subtitle} = this.props

    return (
      <Grid fluid className={classNames(this.props.className, 'search-header')}>
        <Row className="search-header-title">
          <Col xs={12}>
            {title && (<h1>{title}</h1>)}
            {subtitle && (<p>{subtitle}</p>)}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SearchBox {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Filters {...this.props} />
          </Col>
        </Row>
      </Grid>
    )
  }
}
