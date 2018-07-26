import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import CMSContent from './cms-content';
import HorizontalScrolling from './horizontal-scrolling';
import OfficerCard from './officer-card';
import style from './recent-activities.sass';


export default class RecentActivities extends Component {

  componentDidMount() {
    const { recentActivities, requestRecentActivities } = this.props;

    if (isEmpty(recentActivities)) {
      requestRecentActivities();
    }
  }

  render() {
    const { recentActivities, description, title } = this.props;

    return (
      <div className={ style.recentActivities }>
        <CMSContent className='carousel-title' content={ title } />
        <HorizontalScrolling>
          <CMSContent className='carousel-description' content={ description } />
          {
            recentActivities.map(officer => <OfficerCard officer={ officer } key={ officer.id } />)
          }
        </HorizontalScrolling>
      </div>
    );
  }
}

RecentActivities.defaultProps = {
  requestRecentActivities: () => {},
  recentActivities: []
};

RecentActivities.propTypes = {
  recentActivities: PropTypes.array,
  requestRecentActivities: PropTypes.func,
  description: PropTypes.object,
  title: PropTypes.object
};