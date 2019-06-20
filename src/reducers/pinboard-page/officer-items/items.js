import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import {
  PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
  ADD_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
} from 'actions/pinboard';


const toRawOfficer = (item) => {
  const { id, fullName, percentile, rank, complaintCount } = item;
  let rawPercentile = null;
  if (percentile && percentile.items) {
    rawPercentile = {
      'percentile_trr': percentile.items[0].value,
      'percentile_allegation_internal': percentile.items[1].value,
      'percentile_allegation_civilian': percentile.items[2].value,
    };
  }

  return {
    'id': _.parseInt(id),
    'full_name': fullName,
    'percentile': rawPercentile,
    rank,
    'complaint_count': complaintCount,
  };
};

export default handleActions({
  [PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
  [ADD_ITEM_IN_PINBOARD_PAGE]: (state, action) => {
    const currentItems = state;
    if (action.payload.type === 'OFFICER') {
      const item = action.payload;
      if (_.every(currentItems, currentItem => currentItem.id !== parseInt(item.id))) {
        return currentItems.concat(toRawOfficer(item));
      }
    }
    return currentItems;
  },
  [REMOVE_ITEM_IN_PINBOARD_PAGE]: (state, action) => {
    const currentItems = state;
    const { id, type } = action.payload;

    if (type === 'OFFICER') {
      return _.reject(currentItems, { id: parseInt(id) });
    }
    return currentItems;
  },
  [ORDER_PINBOARD]: (state, action) => {
    const currentItems = state;
    const { ids, type } = action.payload;

    if (type === 'OFFICER') {
      return _.sortBy(currentItems, item => _.findIndex(ids, id => id === item.id.toString()));
    }
    return currentItems;
  },
}, []);
