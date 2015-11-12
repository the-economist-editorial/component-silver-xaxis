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

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      'moveAxis': true,
    };
  }

  // COMPONENT DID MOUNT
  componentDidMount() {
    const xAxis = this.setXaxisConfig();
    this.updateXaxis(xAxis);
  }

  /*
  Gets called on 2nd render, when
  */
  /*
  componentWillReceiveProps(nextProps) {
    if (!nextProps.config.checkMargins) {
      const oldAxisPosition = this.props.config.orient;
      const newAxisPosition = nextProps.config.orient;
      console.log('componentWillReceiveProps sets moveAxis = ' + (oldAxisPosition !== newAxisPosition))
      this.setState({ 'moveAxis': (oldAxisPosition !== newAxisPosition) });
      //console.log("checkMargins is false and moveAxis is " + this.state.moveAxis);
    } else {
      //console.log("checkMargins is true;")
    }
    this.setState({ 'moveAxis': true })
  }
  */

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
    const ticks = config.ticks;
    const orient = config.orient;
    let height = config.bounds.height;
    // But are ticks drawn down from top, or up from bottom?
    if (orient === 'top') {
      height = -height;
    }
    xAxis
      .scale(xScale)
      .orient(orient)
      // Position of labels above tick ends, at top
      // Needs to be prefs for top and bottom...
      .tickPadding(3)
      // To come: ticks need to be at an appropriate 'density',
      // rather than a fixed number... This will require a
      // bit of calculating to get a min and max with an
      // appropriate number of intermediate ticks...
      .ticks(ticks)
      .tickSize(height);
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
      // One transition on scale values
      .transition().duration(duration)
      .call(xAxis)
        // And another transition on scale position
        .transition().duration(duration)
        .attr('transform', transform)
        ;
  }

  // RENDER
  render() {
    // Axis group
    return (
      <g className="d3-xaxis-group"/>
    );
  }
}
