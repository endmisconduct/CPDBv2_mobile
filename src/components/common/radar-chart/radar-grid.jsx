import React, { Component, PropTypes } from 'react';
import { range } from 'lodash';
import { curveLinearClosed, radialLine } from 'd3-shape';
import { scaleLinear } from 'd3-scale';

import style from './radar-grid.sass';


const LEVEL = 5;

export default class RadarGrid extends Component {
  render() {
    const { radius, maxValue, numAxis, strokeWidth, strokeColor, opacity } = this.props;

    if (!numAxis)
      return <g className='test--radar-grid-wrapper'/>;

    const angleSlice = Math.PI * 2 / numAxis;

    const rScale = scaleLinear()
      .range([0, radius + strokeWidth])
      .domain([0, maxValue]);

    const maxValueScaled = rScale(maxValue);

    const radarLine = radialLine()
      .curve(curveLinearClosed)
      .radius((d) => d.value)
      .angle((d, i) => i * angleSlice - Math.PI);

    return (
      <g className='test--radar-grid-wrapper'>
        { range(LEVEL).map((i) => (
          <path
            stroke={ strokeColor }
            key={ `radar-grid-${i + 1}` }
            className={ style.radarGrid }
            d={ radarLine(range(numAxis).map(() => ({ value: maxValueScaled * (i + 1) / LEVEL }))) }
            style={ { strokeOpacity: opacity } }
          />
        )) }
      </g>
    );
  }
}

RadarGrid.propTypes = {
  radius: PropTypes.number,
  maxValue: PropTypes.number,
  numAxis: PropTypes.number,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string,
  opacity: PropTypes.number,
};
