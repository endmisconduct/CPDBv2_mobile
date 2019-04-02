import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import constants from 'constants';
import style from './complaint-summary-card.sass';


const ComplaintSummaryCard = ({ allegation }) => {
  return (
    <Link
      to={ `${constants.COMPLAINT_PATH}${allegation.crid}/` }
      className={ style.complaintSummaryCard }
    >
      <div className='incident-date'>{ allegation.incidentDate }</div>
      <div className='complaint-summary'>
        { allegation.summary }
        <div className='gradient'/>
      </div>
    </Link>
  );
};

ComplaintSummaryCard.propTypes = {
  allegation: PropTypes.object
};

export default ComplaintSummaryCard;