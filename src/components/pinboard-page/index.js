import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './pinboard-page.sass';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';


export default class PinboardPage extends Component {
  componentDidMount() {
    const { fetchPinboard, fetchPinboardSocialGraph, fetchPinboardGeographicData } = this.props;
    const pinboardID = this.props.params.pinboardId;
    fetchPinboard(pinboardID);
    fetchPinboardSocialGraph(pinboardID);
    fetchPinboardGeographicData(pinboardID);
  }

  render() {
    const { pinboard, changePinboardTab, currentTab, hasMapMarker } = this.props;
    return (
      <div className={ cx(styles.pinboardPage, 'pinboard-page') }>
        <Link to='/search/'>Back to search page</Link>
        <div className='pinboard-info'>
          <div className='pinboard-title'>{ pinboard.title }</div>
          <div className='pinboard-description'>{ pinboard.description }</div>
        </div>
        <div className='data-visualizations'>
          <PinboardPaneSection
            changePinboardTab={ changePinboardTab }
            currentTab={ currentTab }
            hasMapMarker={ hasMapMarker }
          />
        </div>
      </div>
    );
  }
}

PinboardPage.propTypes = {
  pinboard: PropTypes.object,
  params: PropTypes.object,
  fetchPinboard: PropTypes.func,
  fetchPinboardSocialGraph: PropTypes.func,
  fetchPinboardGeographicData: PropTypes.func,
  changePinboardTab: PropTypes.func,
  currentTab: PropTypes.string,
  hasMapMarker: PropTypes.bool,
};

PinboardPage.defaultProps = {
  fetchPinboard: () => {},
  fetchPinboardSocialGraph: () => {},
  fetchPinboardGeographicData: () => {},
};
