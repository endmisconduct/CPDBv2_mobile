import { get, map, isEmpty, every } from 'lodash';
import { createSelector } from 'reselect';

import { generatePinboardUrl } from 'utils/pinboard';

export const getInitialRequested = state => get(state, 'pinboardPage.initialRequested', false);

const countPinnedItems = pinboard => {
  if (pinboard === null) {
    return 0;
  }
  return get(pinboard, 'officer_ids', []).length +
    get(pinboard, 'crids', []).length +
    get(pinboard, 'trr_ids', []).length;
};

export const getPinboard = createSelector(
  state => get(state, 'pinboardPage.pinboard', {}),
  pinboard => ({
    id: get(pinboard, 'id', null) !== null ? pinboard['id'].toString() : null,
    title: get(pinboard, 'title', ''),
    officerIds: map(get(pinboard, 'officer_ids', []), (id) => (id.toString())),
    crids: get(pinboard, 'crids', []),
    trrIds: map(get(pinboard, 'trr_ids', []), (id) => (id.toString())),
    description: get(pinboard, 'description', ''),
    url: generatePinboardUrl(pinboard),
    itemsCount: countPinnedItems(pinboard),
    ownedByCurrentUser: get(pinboard, 'ownedByCurrentUser', false),
    crItems: get(pinboard, 'crItems.items', []),
    officerItems: get(pinboard, 'officerItems.items', []),
    trrItems: get(pinboard, 'trrItems.items', []),
    isPinboardRestored: get(pinboard, 'isPinboardRestored', false),
  })
);

export const pinboardItemsSelector = createSelector(
  getPinboard,
  ({ officerIds, crids, trrIds }) => ({
    'OFFICER': officerIds,
    'CR': crids,
    'TRR': trrIds,
  })
);

export const isItemPinned = (pinnedItemType, id, pinboardItems) => {
  return Object.prototype.hasOwnProperty.call(pinboardItems, pinnedItemType) &&
    (pinboardItems[pinnedItemType].indexOf(String(id)) !== -1);
};

export const pinboardICRIDsSelector = createSelector(
  getPinboard,
  ({ crids }) => crids
);

export const isEmptyPinboardSelector = createSelector(
  getPinboard,
  ({ officerIds, crids, trrIds }) => every([officerIds, crids, trrIds], isEmpty)
);

export const examplePinboardsSelector = createSelector(
  state => state.pinboardPage.pinboard,
  pinboard => get(pinboard, 'example_pinboards', []),
);
