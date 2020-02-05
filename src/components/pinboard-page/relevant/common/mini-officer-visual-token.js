import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './mini-officer-visual-token.sass';


export function MiniVisualToken(props) {
  const { percentile, className } = props;
  return (
    <div className={ cx(className, styles.miniOfficerVisualToken) }>
      <StaticRadarChart
        hideAxisText={ true }
        showGrid={ false }
        showSpineLine={ false }
        backgroundColor={ percentile ? percentile.visualTokenBackground : undefined }
        data={ percentile && percentile.items }
        width={ 22 }
        height={ 22 }
        radius={ 10 }
        yAxisCenter={ 9 }
      />
    </div>
  );
}

MiniVisualToken.propTypes = {
  percentile: PropTypes.object,
  className: PropTypes.string,
};

export default MiniVisualToken;
