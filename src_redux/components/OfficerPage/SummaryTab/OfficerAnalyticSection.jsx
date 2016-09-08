import React from 'react';
import DistributionCurve from 'components/OfficerPage/SummaryTab/OfficerAnalyticSection/DistributionCurve';
import style from 'styles/OfficerPage/SummaryTab/OfficerAnalyticSection.sass';


const OfficerAnalyticSection = React.createClass({
  propTypes: {
    officer: React.PropTypes.object,
    distribution: React.PropTypes.array
  },

  defaultProps: {
    officer: {},
    distribution: []
  },

  render() {
    return (
      <div className={ style.officerAnalyticSection }>
        <div className='section-header'>
          <span className='pad'>
            <span className='section-title bold'>Officer analytics</span>
          </span>
        </div>
        <DistributionCurve officer={ this.props.officer } distribution={ this.props.distribution } />
      </div>
    );
  }
});

export default OfficerAnalyticSection;
