import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, keys, filter, capitalize } from 'lodash';
import cx from 'classnames';

import HorizontalScrolling from 'components/common/horizontal-scrolling';
import OfficerTimelineContainer from 'containers/officer-page/officer-timeline-container';
import CoaccusalsContainer from 'containers/officer-page/coaccusals-container';
import MapContainer from 'containers/officer-page/map-container';
import OfficerAttachmentsTabContainer from 'containers/officer-page/officer-attachments-container';
import { OFFICER_PAGE_TAB_NAMES } from 'constants/officer-page';
import style from './tabbed-pane-section.sass';


export default class TabbedPaneSection extends Component {
  _tabbedPaneMap() {
    const {
      hasCoaccusal,
      hasAttachment,
      hasMapMarker,
    } = this.props;
    return {
      [OFFICER_PAGE_TAB_NAMES.TIMELINE]: {
        component: OfficerTimelineContainer,
        show: true,
      },
      [OFFICER_PAGE_TAB_NAMES.MAP]: {
        component: MapContainer,
        show: hasMapMarker,
      },
      [OFFICER_PAGE_TAB_NAMES.COACCUSALS]: {
        component: CoaccusalsContainer,
        show: hasCoaccusal,
      },
      [OFFICER_PAGE_TAB_NAMES.ATTACHMENTS]: {
        component: OfficerAttachmentsTabContainer,
        show: hasAttachment,
      },
    };
  }

  _tabs(tabbedPaneMap) {
    const {
      currentTab,
      changeOfficerTab,
    } = this.props;

    return (
      <HorizontalScrolling className='tabbed-pane-section-menu' spaceBetween={ 9 }>
        {
          filter(keys(tabbedPaneMap), (paneName) => get(tabbedPaneMap, `${paneName}.show`)).map(paneName => (
            <span
              key={ paneName }
              className={ cx('tabbed-pane-tab-name', { 'active': paneName === currentTab }) }
              onClick={ () => changeOfficerTab(paneName) }
            >
              { capitalize(paneName) }
            </span>
          ))
        }
      </HorizontalScrolling>
    );
  }

  render() {
    const { currentTab, officerId } = this.props;
    const tabbedPaneMap = this._tabbedPaneMap();
    const CurrentComponent = get(tabbedPaneMap, `${currentTab}.component`, null);
    return (
      <div className={ style.tabbedPaneSection }>
        { this._tabs(tabbedPaneMap) }
        { CurrentComponent ? <CurrentComponent officerId={ officerId }/> : null }
        { this._tabs(tabbedPaneMap) }
      </div>
    );
  }
}

TabbedPaneSection.propTypes = {
  officerId: PropTypes.number,
  currentTab: PropTypes.string,
  changeOfficerTab: PropTypes.func,
  hasCoaccusal: PropTypes.bool,
  hasAttachment: PropTypes.bool,
  hasMapMarker: PropTypes.bool,
};
