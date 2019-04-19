import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { isUndefined } from 'lodash';

import Row from './row';
import styles from './legend.sass';


export default class Legend extends Component {

  render() {
    const { legend } = this.props;
    const legendItems = [
      {
        key: 'ALLEGATION_COUNT',
        className: 'complaint',
        text: 'Complaint',
        number: legend.allegationCount
      },
      {
        key: 'UNSUSTAINED_COUNT',
        className: 'unsustained-complaint',
        text: 'Unsustained Complaint',
        number: legend.unsustainedCount
      },
      {
        key: 'SUSTAINED_COUNT',
        className: 'sustained-complaint',
        text: 'Sustained Allegation',
        number: legend.sustainedCount
      },
      {
        key: 'USE_OF_FORCE_COUNT',
        className: 'use-of-force-report',
        text: 'Use of Force Report',
        number: legend.useOfForceCount
      },
    ];
    return (
      <div className={ cx(styles.legend, 'test--legend') }>
        { legendItems.map(legendItem => (!isUndefined(legendItem.number) && <Row { ...legendItem } /> )) }
      </div>
    );
  }
}

Legend.propTypes = {
  legend: PropTypes.shape({
    allegationCount: PropTypes.number,
    unsustainedCount: PropTypes.number,
    sustainedCount: PropTypes.number,
    useOfForceCount: PropTypes.number
  }),
};

Legend.defaultProps = {
  legend: {},
};
