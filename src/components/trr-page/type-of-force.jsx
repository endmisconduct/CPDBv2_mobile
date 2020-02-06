import React from 'react';
import PropTypes from 'prop-types';

import style from './type-of-force.sass';


function TypeOfForce(props) {
  const { forceTypes } = props;

  if (!forceTypes) {
    return null;
  }

  const [topForceType, ...theRest] = props.forceTypes;

  return (
    <div className={ style.typeOfForce }>
      <div className='title'>TYPES OF FORCE</div>
      <div className='top-force-type'>{ topForceType }</div>
      { theRest.map((forceType, idx) => (
        <div key={ idx } className='force-type'>↑{ forceType }</div>
      )) }
    </div>
  );
}


TypeOfForce.propTypes = {
  forceTypes: PropTypes.arrayOf(PropTypes.string),
};

export default TypeOfForce;
