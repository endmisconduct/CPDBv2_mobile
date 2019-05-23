import { get, map, kebabCase, isEmpty, every } from 'lodash';
import { createSelector } from 'reselect';


const generatePinboardUrl = pinboard => {
  if (pinboard === null || pinboard['id'] === null) {
    return '';
  }

  const title = (pinboard['title'] !== '') ? pinboard['title'] : 'Untitled Pinboard';
  return `/pinboard/${pinboard.id}/${kebabCase(title)}/`;
};

const countPinnedItems = pinboard => {
  if (pinboard === null) {
    return 0;
  }
  return get(pinboard, 'officer_ids', []).length +
    get(pinboard, 'crids', []).length +
    get(pinboard, 'trr_ids', []).length;
};

export const getPinboard = createSelector(
  state => state.pinboardPage.pinboard,
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
    crItems: get(pinboard, 'crItems', []),
    officerItems: get(pinboard, 'officerItems', []),
    trrItems: get(pinboard, 'trrItems', []),
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

export const pinboardICRIDsSelector = createSelector(
  getPinboard,
  ({ crids }) => crids
);

export const isEmptyPinboardSelector = createSelector(
  getPinboard,
  ({ officerIds, crids, trrIds }) => every([officerIds, crids, trrIds], isEmpty)
);
