import { handleActions } from 'redux-actions';

import { OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER, NEW_TIMELINE_FILTERS } from 'constants';


export default handleActions({
  [OFFICER_NEW_TIMELINE_ITEMS_CHANGE_FILTER]: (state, action) => {
    return action.payload;
  },
}, NEW_TIMELINE_FILTERS.ALL);
