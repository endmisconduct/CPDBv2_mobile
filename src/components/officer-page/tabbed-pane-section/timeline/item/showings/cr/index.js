import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

// import Attachments from './attachments';
import styles from './cr.sass';


export default class Cr extends Component {
  render() {
    const { item, hasBorderBottom, officerId, openComplaintPage } = this.props;

    return (
      <span
        className={ cx(styles.wrapperShowing, 'test--cr-item') }
        onClick={ () => openComplaintPage({ crid: item.crid, officerId: officerId }) }
      >
        <span className='showing'>
          <div className='wrapper-kind'>
            <span
              className='kind'
            >
              Complaint
            </span>
          </div>
          <span className='detail'>
            <div
              className='category'>
              { item.category }
            </div>
            <div className='finding'>{ item.finding }, { item.outcome }</div>
          </span>
          <span className='right'>
            <span className='coaccused'>1 of { item.coaccused } coaccused</span>
            {/*<Attachments attachments={ item.attachments } />*/}
            <span className='date'>{ item.date }</span>
          </span>
        </span>
      </span>
    );
  }
}

Cr.propTypes = {
  item: PropTypes.object,
  hasBorderBottom: PropTypes.bool,
  officerId: PropTypes.number,
  openComplaintPage: PropTypes.func,
};
