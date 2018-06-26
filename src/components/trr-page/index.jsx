import React, { Component, PropTypes } from 'react';

import style from './trr-page.sass';
import BottomPadding from 'components/shared/bottom-padding';
import Header from 'components/shared/header';
import Officer from 'components/trr-page/officer';
import Info from 'components/trr-page/info';


export default class TRRPage extends Component {

  componentDidMount() {
    const { trr, requestTRR, trrId } = this.props;
    if (!trr) {
      requestTRR(trrId);
    }
  }

  render() {
    const { trr } = this.props;

    if (!trr) {
      return null;
    }

    return (
      <div className={ style.trrPage }>
        <Header />
        <h4 className='trr-header'>{ trr.category }</h4>
        <div className='trr-page-body'>
          <Officer { ...trr.officer }/>
          <Info { ...trr.info }/>
        </div>
        <BottomPadding />
      </div>
    );
  }
}

TRRPage.propTypes = {
  requestTRR: PropTypes.func,
  trrId: PropTypes.number,
  trr: PropTypes.object
};
