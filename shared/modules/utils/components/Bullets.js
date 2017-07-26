import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Row, Col} from 'react-bootstrap'

export default class Bullets extends React.Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    emptyMessage: PropTypes.string,
    onEdit: PropTypes.func,
    editable: PropTypes.bool,
    colProps: PropTypes.object,
  }

  static defaultProps = {
    onEdit: f => f,
    colProps: {
      xs: 6,
      sm: 4,
      lg: 3,
    },
  }

  render() {
    const {items, emptyMessage, editable, onEdit, colProps} = this.props

    return (
      <Row className="bullets">
        {items.length ? (
          items.map((name, i) => (
            <Col key={i} {...colProps}><i className="fa fa-square" />{name}</Col>
          ))
        ) : (
          <Col xs={12}>
            {_.isUndefined(emptyMessage) ? (
              <p className="last">Nothing at the moment{editable ? (<span> <a onClick={onEdit}>edit</a></span>) : ''}.</p>
            ) : (
              <p className="last">{emptyMessage}</p>
            )}
          </Col>
        )}
      </Row>
    )
  }
}
