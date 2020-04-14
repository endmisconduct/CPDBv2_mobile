import React from 'react';
import PropTypes from 'prop-types';

import SearchItem from './search-item';
import searchItemStyle from './search-item.sass';


const CrItem = ({ item, saveToRecent, addOrRemoveItemInPinboard, query }) => {
  return (
    <SearchItem
      url={ item.url }
      hasPinButton={ true }
      addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      showIntroduction={ item.showIntroduction }
      id={ item.crid }
      itemRank={ item.itemRank }
      query={ query }
      isPinned={ item.isPinned }
      type={ item.type }
      recentItemData={ item.recentItemData }
      saveToRecent={ saveToRecent }
    >
      <div className={ searchItemStyle.itemInfo }>
        <div className='item-title'>{ item.category }</div>
        <div className='item-subtitle'>CRID { item.crid } • { item.incidentDate }</div>
      </div>
    </SearchItem>
  );
};

CrItem.propTypes = {
  item: PropTypes.shape({
    crid: PropTypes.string,
    category: PropTypes.string,
    incidentDate: PropTypes.string,
    url: PropTypes.string,
    itemRank: PropTypes.number,
    isPinned: PropTypes.bool,
    type: PropTypes.string,
    recentItemData: PropTypes.object,
    showIntroduction: PropTypes.bool,
  }),
  saveToRecent: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
  query: PropTypes.string,
  showIntroduction: PropTypes.bool,
};

CrItem.defaultProps = {
  saveToRecent: () => {},
  item: {},
};

export default CrItem;
