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
    // this.setXaxisConfig();
    // this.updateXaxis();
    const xAxis = this.setXaxisConfig();
    this.updateXaxis(xAxis);
  }

  // SET X-AXIS CONFIG
  setXaxisConfig() {
    const xAxis = this.props.axis;
    const config = this.props.config;
    const xScale = config.scale;
    const orient = config.orient;
    xAxis
      .scale(xScale)
      .orient(orient)
      .tickPadding(5)
      // To come: ticks need to be at an appropriate 'density',
      // rather than a fixed number...
      .ticks(5)
      .tickSize(5);
    return xAxis;
  }

  getAxisGroupTransformString() {
    let height = 0;
    if (this.props.config.orient === 'bottom') {
      height = this.props.config.bounds.height;
    }
    return `translate(0,${height})`;
  }

  // UPDATE X-AXIS
  // Called directly on the DOM to update the axis
  updateXaxis(xAxis) {
    const axisGroup = Dthree.select('.d3-xaxis-group');
    const duration = this.props.config.duration;
    const transform = this.getAxisGroupTransformString();
    axisGroup
      .transition().duration(duration)
      .call(xAxis)
        .transition().duration(duration)
        .attr('transform', transform)
        ;
  }

  // RENDER
  render() {
    // Axis group
    return (
      <g className="d3-xaxis-group" ref="axisGrouproup"/>
    );
  }
}
