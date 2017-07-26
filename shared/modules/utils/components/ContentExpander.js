import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import classNames from 'classnames'
import ReactHeight from 'react-height'

export default class ContentExpander extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    visibleHeight: PropTypes.number,
  }

  static defaultProps = {
    visibleHeight: 64,
  }

  constructor() {
    super()
    this.state = {expanded: false}
  }

  componentDidMount = () => {
    typeof window !== 'undefined' && window.addEventListener('resize', this.updateDimensions)
  }
  componentWillUnmount = () => {
    typeof window !== 'undefined' && window.removeEventListener('resize', this.updateDimensions)
  }
  updateDimensions = _.debounce(() => {
    this.setState({resized: Math.random()})
  }, 100)

  handleHeightReady = height => {
    this.setState({height})
  }

  toggleExpand = () => {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    const {children} = this.props
    const {expanded, height} = this.state
    const hasMore = height > this.props.visibleHeight

    const btn = hasMore && !expanded ? (<span className="small">...<a onClick={this.toggleExpand}>more</a></span>) : null

    const style = {
      maxHeight: expanded ? height : this.props.visibleHeight,
      overflow: 'hidden',
    }

    return (
      <div className={classNames('content-expander', {'has-more': hasMore})}>
        <div className="content" style={style}>
          <ReactHeight onHeightReady={this.handleHeightReady}>
            <div ref={c => this._content = c}>
              {children}
            </div>
          </ReactHeight>
        </div>
        {btn}
      </div>
    )
  }
}
