import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './explainer-nav.sass';


export default class ExplainerNav extends Component {
  render() {
    const { leftNavigationText, rightNavigationText, leftNavHandler, rightNavHandler } = this.props;

    return (
      <div className={ style.explainerNav }>
        <span className='left-nav' onClick={ leftNavHandler }>
          <img className='arrow' src='/img/disclosure-indicator-blue.svg'/>
          <div className='text'>{ leftNavigationText }</div>
        </span>
        <span className='right-nav' onClick={ rightNavHandler }>
          <div className='text'>{ rightNavigationText }</div>
          <img className='arrow' src='/img/disclosure-indicator-blue.svg'/>
        </span>
      </div>
    );
  }
}

ExplainerNav.propTypes = {
  leftNavigationText: PropTypes.string,
  rightNavigationText: PropTypes.string,
  leftNavHandler: PropTypes.func,
  rightNavHandler: PropTypes.func,
};

