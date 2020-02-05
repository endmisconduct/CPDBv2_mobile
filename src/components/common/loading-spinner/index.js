import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { range } from 'lodash';

import SingleSpin from './single-spin';
import styles from './common.sass';


export default function LoadingSpinner(props) {
  const { className, fill } = props;
  return (
    <svg
      className={ cx(styles.animation, className) }
      width='200px' height='200px' xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'
    >
      { range(12).map(i => (
        <SingleSpin
          key={ i }
          transform={ `rotate(${ 30 * i } 50 50)` }
          begin={ `${ (i - 11) / 12 }s` }
          fill={ fill }
        />
      )) }
    </svg>
  );
}

LoadingSpinner.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  fill: '#28292F',
};
