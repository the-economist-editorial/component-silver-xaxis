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

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  // COMPONENT DID MOUNT
  componentDidMount() {
    this.setXaxisConfig();
    this.updateXaxis();
  }

  // COMPONENT DID UPDATE
  componentDidUpdate() {
    this.setXaxisConfig();
    this.updateXaxis();
  }

  // GET X-AXIS CONFIG
  //
  setXaxisConfig() {
    const config = this.props.config;
    const xScale = config.scale;
    const orient = config.orient;
    // Ouch! Shouldn't be fiddling with the props...!
    this.props.axis
      .scale(xScale)
      .orient(orient)
      .tickPadding(5)
      .ticks(5)
      .tickSize(5);
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
  updateXaxis() {
    const axisGroup = Dthree.select('.d3-xaxis-group');
    const duration = this.props.config.duration;
    const transform = this.getAxisGroupTransformString();
    // I'm trying to chain the transitions if the axis moves
    // from bottom to top, as well as changing scale. This
    // is only partly successful, because I also need to address
    // the orientation (top/bottom), which flips the ticks and strings...
    axisGroup
      .transition().duration(duration)
      .call(this.props.axis)
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
