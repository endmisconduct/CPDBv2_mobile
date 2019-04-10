import React, { Component, PropTypes } from 'react';
import { get, keys } from 'lodash';
import cx from 'classnames';

import GeographicContainer from 'containers/pinboard-page/geographic-container';
import SocialGraphContainer from 'containers/pinboard-page/social-graph-container';
import constants from 'constants';
import styles from './pinboard-pane-section.sass';


export default class PinboardPaneSection extends Component {
  render() {
    const {
      currentTab,
      changePinboardTab,
      hasMapMarker,
    } = this.props;
    const pinboardPaneMap = {
      [constants.PINBOARD_PAGE_TAB_NAMES.NETWORK]: {
        component: SocialGraphContainer,
        show: true,
      },
      [constants.PINBOARD_PAGE_TAB_NAMES.GEOGRAPHIC]: {
        component: GeographicContainer,
        show: hasMapMarker,
      },
    };
    const CurrentComponent = get(pinboardPaneMap, `${currentTab}.component`, null);
    return (
      <div className={ cx(styles.pinboardPaneSection, 'pinboard-pane-section') }>
        <div className='pinboard-pane-section-menu'>
          {
            keys(pinboardPaneMap).map(paneName => (
              get(pinboardPaneMap, `${paneName}.show`) ? (
                <span
                  key={ paneName }
                  className={ cx('pinboard-pane-tab-name', { 'active': paneName === currentTab }) }
                  onClick={ () => changePinboardTab(paneName) }
                >
                  { paneName }
                </span>
              ) : null
            ))
          }
        </div>
        { CurrentComponent ? <CurrentComponent /> : null }
      </div>
    );
  }
}

PinboardPaneSection.propTypes = {
  currentTab: PropTypes.string,
  changePinboardTab: PropTypes.func,
  hasMapMarker: PropTypes.bool,
};
