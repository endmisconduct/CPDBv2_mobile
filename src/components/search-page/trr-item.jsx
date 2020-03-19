import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import SearchItem from './search-item';
import searchItemStyle from './search-item.sass';


const TrrItem = ({ item, saveToRecent, addOrRemoveItemInPinboard, query }) => {
  return (
    <SearchItem
      url={ item.url }
      hasPinButton={ true }
      addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      showIntroduction={ item.showIntroduction }
      id={ item.id }
      query={ query }
      itemRank={ item.itemRank }
      isPinned={ item.isPinned }
      type={ item.type }
      recentItemData={ item.recentItemData }
      saveToRecent={ saveToRecent }
    >
      <div className={ cx(searchItemStyle.itemInfo, 'inline') }>
        <div className='item-title'>TRR</div>
        <div className='item-subtitle'>{ item.id }</div>
      </div>
    </SearchItem>
  );
};

TrrItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    url: PropTypes.string,
    isPinned: PropTypes.bool,
    type: PropTypes.string,
    recentItemData: PropTypes.object,
    itemRank: PropTypes.number,
    showIntroduction: PropTypes.bool,
  }),
  saveToRecent: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
  query: PropTypes.string,
  showIntroduction: PropTypes.bool,
};

TrrItem.defaultProps = {
  saveToRecent: () => {},
  item: {},
};

export default TrrItem;
