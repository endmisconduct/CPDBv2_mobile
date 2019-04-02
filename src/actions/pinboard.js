import { createAction } from 'redux-actions';

import { get, post, put } from 'actions/common/async-action';
import constants from 'constants';
import { v2Url } from 'utils/url-util';


export const PINBOARD_CREATE_REQUEST_START = 'PINBOARD_CREATE_REQUEST_START';
export const PINBOARD_CREATE_REQUEST_SUCCESS = 'PINBOARD_CREATE_REQUEST_SUCCESS';
export const PINBOARD_CREATE_REQUEST_FAILURE = 'PINBOARD_CREATE_REQUEST_FAILURE';

export const PINBOARD_UPDATE_REQUEST_START = 'PINBOARD_UPDATE_REQUEST_START';
export const PINBOARD_UPDATE_REQUEST_SUCCESS = 'PINBOARD_UPDATE_REQUEST_SUCCESS';
export const PINBOARD_UPDATE_REQUEST_FAILURE = 'PINBOARD_UPDATE_REQUEST_FAILURE';

export const PINBOARD_FETCH_REQUEST_START = 'PINBOARD_FETCH_REQUEST_START';
export const PINBOARD_FETCH_REQUEST_SUCCESS = 'PINBOARD_FETCH_REQUEST_SUCCESS';
export const PINBOARD_FETCH_REQUEST_FAILURE = 'PINBOARD_FETCH_REQUEST_FAILURE';

export const ADD_ITEM_TO_PINBOARD = 'ADD_ITEM_TO_PINBOARD';

export const addItemToPinboard = createAction(ADD_ITEM_TO_PINBOARD);

export const createPinboard = ({ officerIds, crids, trrIds }) => post(
  v2Url(constants.PINBOARDS_API_ENDPOINT),
  [
    PINBOARD_CREATE_REQUEST_START,
    PINBOARD_CREATE_REQUEST_SUCCESS,
    PINBOARD_CREATE_REQUEST_FAILURE,
  ]
)({ 'officer_ids': officerIds, crids: crids, 'trr_ids': trrIds });

export const updatePinboard = ({ id, title, officerIds, crids, trrIds }) => put(
  `${v2Url(constants.PINBOARDS_API_ENDPOINT)}${id}/`,
  [
    PINBOARD_UPDATE_REQUEST_START,
    PINBOARD_UPDATE_REQUEST_SUCCESS,
    PINBOARD_UPDATE_REQUEST_FAILURE,
  ]
)({ title: title, 'officer_ids': officerIds, crids: crids, 'trr_ids': trrIds });

export const fetchPinboard = id => get(
  `${v2Url(constants.PINBOARDS_API_ENDPOINT)}${id}/`,
  [
    PINBOARD_FETCH_REQUEST_START,
    PINBOARD_FETCH_REQUEST_SUCCESS,
    PINBOARD_FETCH_REQUEST_FAILURE,
  ]
)();
