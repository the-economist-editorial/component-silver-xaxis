// Disable prefer-reflect, for D3 axis.call()
/* eslint-disable prefer-reflect */
import Dthree from 'd3';
import React from 'react';

export default class SilverXaxis extends React.Component {

  // PROP TYPES
  static get propTypes() {
    return {
      test: React.PropTypes.string,
      config: React.PropTypes.object,
      axis: React.PropTypes.func,
    };
  }

  // DEFAULT PROPS
  static get defaultProps() {
    return {
      axis: Dthree.svg.axis(),
    };
  }

  // COMPONENT DID MOUNT
  componentDidMount() {
    const xAxis = this.setXaxisConfig();
    this.updateXaxis(xAxis);
  }

  // COMPONENT DID UPDATE
  componentDidUpdate() {
    const xAxis = this.setXaxisConfig();
    this.updateXaxis(xAxis);
  }

  // SET X-AXIS CONFIG
  setXaxisConfig() {
    const xAxis = this.props.axis;
    const config = this.props.config;
    // Scale function:
    const xScale = config.scale;
    // Tick density:
    const tickDensity = config.tickDensity;
    // Padding between labels and tick-ends:
    const tickPadding = config.tickPadding;
    // Top or bottom:
    const orient = config.orient;
    // Tick length
    let tickLength = config.tickLength;
    // If axis at top, tickLength is neg value:
    if (orient === 'top') {
      tickLength = -tickLength;
    }
    xAxis
      .scale(xScale)
      .orient(orient)
      // Position of labels above tick ends, at top
      .tickPadding(tickPadding)
      // Number of ticks
      .ticks(tickDensity)
      // Tick length
      .tickSize(tickLength);
    return xAxis;
  }
  // SET X-AXIS CONFIG ends

  // GET AXIS GROUP TRANSFORM STRING
  // Called from updateXAxis. Returns string that determines
  // whether axis is drawn top/bottom
  getAxisGroupTransformString() {
    let height = 0;
    if (this.props.config.orient === 'bottom') {
      height = this.props.config.bounds.height;
    }
    return `translate(0,${height})`;
  }
  // GET AXIS GROUP TRANSFORM STRING ends

  // UPDATE X-AXIS
  // Called directly on the DOM to update the axis
  updateXaxis(xAxis) {
    const axisGroup = Dthree.select('.d3-xaxis-group');
    const duration = this.props.config.duration;
    const transform = this.getAxisGroupTransformString();
    axisGroup
      // One transition on scale values
      .transition().duration(duration)
      .call(xAxis)
        // And another transition on scale position
        .transition().duration(duration)
        .attr('transform', transform)
        ;
  }
  // UPDATE X-AXIS ends

  // RENDER axis group
  render() {
    return (
      <g className="d3-xaxis-group"/>
    );
  }
}
