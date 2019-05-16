import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';
import { kebabCase } from 'lodash';
import cx from 'classnames';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './relevant-coaccusal-card.sass';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';


export class RelevantCoaccusalCard extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = { fade: false };
  }

  handleClick(e) {
    e.preventDefault();

    if (this.state.fade)
      return;

    this.setState({ fade: true });

    const {
      id,
      addItemInPinboardPage,
      fullName,
      percentile,
      complaintCount,
      rank
    } = this.props;
    addItemInPinboardPage({
      type: 'OFFICER',
      id: id.toString(),
      fullName,
      percentile,
      complaintCount,
      rank,
    });
  }

  render() {
    const {
      id,
      fullName,
      percentile,
      rank,
      coaccusalCount,
    } = this.props;
    const officerSlug = kebabCase(fullName);
    const chartData = percentile && percentile.items;

    return (
      <Link
        to={ `/officer/${id}/${officerSlug}/` }
        className={ cx(styles.relevantCoaccusalCard, { 'fade-out': this.state.fade }) }
      >
        <div className='no-print radar-chart-wrapper'>
          <StaticRadarChart
            data={ chartData }
            width={ 148 }
            height={ 60 }
            radius={ 28 }
            offsetTop={ 2 }
            backgroundColor={ percentile ? percentile.visualTokenBackground : undefined }
          />
        </div>
        <div className='officer-card-name-wrapper'>
          <p className='light-text officer-card-rank'>{ rank }</p>
          <p className='bold-text officer-card-name'>{ fullName }</p>
        </div>
        <div className='coaccusal-count'>{ pluralize('coaccusal', coaccusalCount, true) }</div>
        <PlusButton onClick={ this.handleClick } darkMode={ true }/>
      </Link>
    );
  }
}

RelevantCoaccusalCard.propTypes = {
  id: PropTypes.number,
  fullName: PropTypes.string,
  percentile: PropTypes.object,
  rank: PropTypes.string,
  coaccusalCount: PropTypes.number,
  complaintCount: PropTypes.number,
  addItemInPinboardPage: PropTypes.func,
};

export default RelevantCoaccusalCard;
