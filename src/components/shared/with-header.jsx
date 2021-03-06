import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';

import styles from './with-header.sass';
import IOSPeek from 'components/common/ios-peek';
import BreadcrumbContainer from 'containers/breadcrumb';


const WithHeader = ({ children, className, customButtons }) => {
  return (
    <React.Fragment>
      <IOSPeek className={ styles.breadcrumbsIosPeek }/>
      <div className={ cx(styles.header) }>
        <BreadcrumbContainer />
        <div className='right-buttons-container'>
          <div className='right-buttons'>
            { customButtons }
          </div>
        </div>
      </div>
      <div className={ cx(styles.content, className) }>
        { children }
      </div>
    </React.Fragment>
  );
};

WithHeader.propTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
  children: PropTypes.node,
  className: PropTypes.string,
  customButtons: PropTypes.element,
};

export default withRouter(WithHeader);
