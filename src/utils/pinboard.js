import { kebabCase, isEmpty, isNil, every, get, map } from 'lodash';

import {
  fetchPinboardSocialGraph,
  fetchPinboardGeographic,
  fetchFirstPagePinboardGeographicCrs,
  fetchOtherPagesPinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchOtherPagesPinboardGeographicTrrs,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
} from 'actions/pinboard';
import loadPaginatedData from 'utils/load-paginated-data';
import { PINBOARD_PATH } from 'constants/paths';
import { PINBOARD_INTRODUCTION } from 'constants';


export const generatePinboardUrl = pinboard => {
  if (pinboard === null || isNil(pinboard['id'])) {
    return '';
  }

  const title = isEmpty(pinboard['title']) ? 'Untitled Pinboard' : pinboard['title'];
  return `${PINBOARD_PATH}${pinboard.id}/${kebabCase(title)}/`;
};

export const dispatchFetchPinboardPageData = (store, pinboardId) => {
  store.dispatch(fetchPinboardSocialGraph(pinboardId));
  store.dispatch(fetchPinboardGeographic());
  loadPaginatedData(
    { 'pinboard_id': pinboardId },
    fetchFirstPagePinboardGeographicCrs,
    fetchOtherPagesPinboardGeographicCrs,
    store,
  );
  loadPaginatedData(
    { 'pinboard_id': pinboardId },
    fetchFirstPagePinboardGeographicTrrs,
    fetchOtherPagesPinboardGeographicTrrs,
    store,
  );
  store.dispatch(fetchPinboardRelevantDocuments(pinboardId));
  store.dispatch(fetchPinboardRelevantCoaccusals(pinboardId));
  store.dispatch(fetchPinboardRelevantComplaints(pinboardId));
};

export const dispatchFetchPinboardPinnedItems = (store, pinboardId) => {
  store.dispatch(fetchPinboardComplaints(pinboardId));
  store.dispatch(fetchPinboardOfficers(pinboardId));
  store.dispatch(fetchPinboardTRRs(pinboardId));
};

export const isEmptyPinboard = pinboard => {
  const { officerIds, crids, trrIds } = pinboard;
  return every([officerIds, crids, trrIds], isEmpty);
};

export const getRequestPinboard = pinboard => ({
  id: get(pinboard, 'id', null),
  title: get(pinboard, 'title', ''),
  officerIds: map(get(pinboard, 'officer_ids', []), id => (id.toString())),
  crids: get(pinboard, 'crids', []),
  trrIds: map(get(pinboard, 'trr_ids', []), id => (id.toString())),
  description: get(pinboard, 'description', ''),
});


const getIsVisited = (key) => localStorage.getItem(key) === '1';
const setIsVisited = (key) => localStorage.setItem(key, '1');
export const isPinboardButtonIntroductionVisited = () => getIsVisited(
  PINBOARD_INTRODUCTION.PINBOARD_BUTTON_INTRODUCTION
);
export const setPinboardButtonIntroductionVisited = () => setIsVisited(
  PINBOARD_INTRODUCTION.PINBOARD_BUTTON_INTRODUCTION
);
export const isPinboardIntroductionVisited = () => getIsVisited(PINBOARD_INTRODUCTION.PINBOARD_INTRODUCTION);
export const setPinboardIntroductionVisited = () => setIsVisited(PINBOARD_INTRODUCTION.PINBOARD_INTRODUCTION);
export const isPinButtonIntroductionVisited = () => getIsVisited(PINBOARD_INTRODUCTION.PIN_BUTTON_INTRODUCTION);
export const setPinButtonIntroductionVisited = () => setIsVisited(PINBOARD_INTRODUCTION.PIN_BUTTON_INTRODUCTION);
