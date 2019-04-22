import * as _ from 'lodash';
import { browserHistory } from 'react-router';

import {
  ADD_ITEM_TO_PINBOARD,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  createPinboard,
  updatePinboard,
  fetchPinboard,
  fetchPinboardSocialGraph,
  fetchPinboardGeographicData,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
} from 'actions/pinboard';
import { getPinboard } from 'selectors/pinboard';
import { getPathname } from 'selectors/common/routing';


const PINBOARD_ATTR_MAP = {
  'CR': 'crids',
  'OFFICER': 'officerIds',
  'TRR': 'trrIds',
};

const PINBOARD_FETCH_SELECTED_MAP = {
  'CR': fetchPinboardComplaints,
  'OFFICER': fetchPinboardOfficers,
  'TRR': fetchPinboardTRRs,
};


const addItem = (pinboard, item) => {
  const key = PINBOARD_ATTR_MAP[item.type];
  pinboard[key].push(item.id);
};

const removeItem = (pinboard, item) => {
  const key = PINBOARD_ATTR_MAP[item.type];
  _.remove(pinboard[key], (id) => (id === item.id));
};

export default store => next => action => {
  let pinboard = null;
  let item = null;
  let pinboardAction = null;

  if (action.type === ADD_ITEM_TO_PINBOARD || action.type === REMOVE_ITEM_IN_PINBOARD_PAGE) {
    pinboard = getPinboard(store.getState());
    item = action.payload;

    pinboardAction = pinboard.ownedByCurrentUser ? updatePinboard : createPinboard;
    item.isPinned ? removeItem(pinboard, item) : addItem(pinboard, item);
  }

  if (action.type === ADD_ITEM_TO_PINBOARD) {
    if (pinboard.id === null) {
      store.dispatch(createPinboard(pinboard));
    } else {
      store.dispatch(pinboardAction(pinboard));
    }
  }
  else if (action.type === REMOVE_ITEM_IN_PINBOARD_PAGE) {
    const pinboardPromise = store.dispatch(pinboardAction(pinboard));

    // TODO: test this async function
    if (pinboard.ownedByCurrentUser) {
      /* istanbul ignore next */
      pinboardPromise.then(response => {
        const pinboardID = response.payload.id;
        const pinboardFetchSelected = PINBOARD_FETCH_SELECTED_MAP[action.payload.type];

        store.dispatch(pinboardFetchSelected(pinboardID));
      });
    }
  }
  if (action.type === PINBOARD_CREATE_REQUEST_SUCCESS) {
    const state = store.getState();
    if (getPathname(state).match(/\/pinboard\/[\w\d]+/)) {
      browserHistory.push(`/pinboard/${action.payload.id}/`);
    }
  }
  if (action.type === PINBOARD_UPDATE_REQUEST_SUCCESS) {
    const state = store.getState();
    if (getPathname(state).match(/\/pinboard\/[\w\d]+/)) {
      const pinboardID = action.payload.id;
      store.dispatch(fetchPinboard(pinboardID));
      store.dispatch(fetchPinboardSocialGraph(pinboardID));
      store.dispatch(fetchPinboardGeographicData(pinboardID));
      store.dispatch(fetchPinboardRelevantDocuments(pinboardID));
      store.dispatch(fetchPinboardRelevantCoaccusals(pinboardID));
      store.dispatch(fetchPinboardRelevantComplaints(pinboardID));
    }
  }
  return next(action);
};
