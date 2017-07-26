const d3 = require('d3')
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ReactFauxDOM from 'react-faux-dom'

export default class D3LineGraph extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    xField: PropTypes.string.isRequired,
    yField: PropTypes.string.isRequired,
    area: PropTypes.bool,
  }

  render() {
    const {data, xField, yField} = this.props
    if (!data.length) return null

    //return d3 graph
    const margin = {top: 20, right: 20, bottom: 30, left: 50}
    const width = 960 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    // set the ranges
    const x = d3.scaleLinear().range([0, width])
    const y = d3.scaleLinear().range([height, 0])

    // define the area
    const area = d3.area()
      .x(d => x(d[xField]))
      .y0(height)
      .y1(d => y(d[yField]))

    // define the line
    const valueline = d3.line()
      .x(d => x(d[xField]))
      .y(d => y(d[yField]))

    const node = ReactFauxDOM.createElement('svg')
    const svg = d3.select(node)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // format the data
    // data.forEach(d => {
    //   d[xField] = +d[xField]
    //   d[yField] = +d[yField]
    // })

    // scale the range of the data
    x.domain(d3.extent(data, d => d[xField]))
    y.domain([0, d3.max(data, d => d[yField])])

    if (this.props.area) {
      // add the area
      svg.append('path')
        .data([data])
        .attr('class', 'area')
        .attr('d', area)
    }

    // add the valueline path.
    svg.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('d', valueline)

    // add the X Axis
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))

    // add the Y Axis
    svg.append('g')
      .call(d3.axisLeft(y))

    return node.toReact()
  }
}

