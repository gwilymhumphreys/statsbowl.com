import _ from 'lodash' //eslint-disable-line
import React, {PropTypes} from 'react'
import {Grid} from 'react-bootstrap'
import SearchHeader from './SearchHeader'
import SearchFooter from './SearchFooter'
import Loader from '../../utils/components/Loader'

export default class SearchPage extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
    rowComponent: PropTypes.func.isRequired,
    messageComponent: PropTypes.func,
    headerProps: PropTypes.object.isRequired,
    visibleItems: PropTypes.array.isRequired,
  }

  render() {
    const {visibleItems, headerProps} = this.props
    const RowComponent = this.props.rowComponent
    const MessageComponent = this.props.messageComponent

    let results
    if (this.props.loading) {
      results = (<Loader />)
    }
    else if (!visibleItems.length) {
      results = (
        <div className="no-results">
          <p className="icon"><i className="fa fa-frown-o" /></p>
          <p>No results found! Try removing some filters</p>
        </div>
      )
    }
    else {
      results = (
        <div>
          {_.map(visibleItems, item => (
            <RowComponent
              key={item.id}
              item={item}
              {...this.props}
            />
          ))}
          <SearchFooter {...this.props} />
        </div>
      )
    }

    return (
      <section className="search-page">
        <SearchHeader {...headerProps} {...this.props} />
        {MessageComponent && <MessageComponent />}
        <Grid fluid className="results">
          {results}
        </Grid>
      </section>
    )
  }
}
