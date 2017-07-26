import _ from 'lodash' // eslint-disable-line
import Inflection from 'inflection'
import React, {PropTypes} from 'react'
import {Row, Col} from 'react-bootstrap'
import {Pagination} from 'fl-react-utils'

export default class SearchFooter extends React.Component {

  static propTypes = {
    totalItems: PropTypes.number,
  }

  render() {
    const resultsString = Inflection.inflect('results', this.props.totalItems)
    return (
      <Row className="search-footer">
        <Col sm={2} xs={12}>
          <span className="results-count pull-left">{this.props.totalItems} {resultsString}</span>
        </Col>
        <Col sm={10} xs={12}>
          <div className="results-pagination">
            <Pagination {...this.props} />
          </div>
        </Col>
      </Row>
    )
  }
}
