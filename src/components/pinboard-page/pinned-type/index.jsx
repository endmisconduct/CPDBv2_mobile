import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import cx from 'classnames';

import style from './pinned-type.sass';
import LoadingSpinner from 'components/common/loading-spinner';
import PinnedGrid from './pinned-grid';


export default function PinnedType(props) {
  const { type, title, items, requesting, pinboardId } = props;
  const noItems = items.length < 1;

  if (!requesting && noItems) {
    return null;
  }

  return (
    <div className={ cx(style.pinnedType, `test--${type}-section` ) }>
      <div className='type-title'>
        { title }
      </div>
      {
        (requesting) ?
          <LoadingSpinner className='type-cards-loading' />
          :
          <PinnedGrid key={ `${pinboardId}-pinned-${title}` } { ...omit(props, ['requesting', 'title']) }/>
      }
    </div>
  );
}

PinnedType.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.array,
  removeItemInPinboardPage: PropTypes.func,
  orderPinboard: PropTypes.func,
  requesting: PropTypes.bool,
  pinboardId: PropTypes.string,
};

PinnedType.defaultProps = {
  items: [],
};
