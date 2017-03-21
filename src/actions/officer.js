import { get } from 'actions/common/async-action';
import { v2v2Url } from 'utils/UrlUtil';
import constants from 'constants';


export const OFFICER_SUMMARY_REQUEST_START = 'OFFICER_SUMMARY_REQUEST_START';
export const OFFICER_SUMMARY_REQUEST_SUCCESS = 'OFFICER_SUMMARY_REQUEST_SUCCESS';
export const OFFICER_SUMMARY_REQUEST_FAILURE = 'OFFICER_SUMMARY_REQUEST_FAILURE';

export const getOfficerSummary = (id) => {
  const getFunc = get(
    v2v2Url(constants.OFFICER_API_ENDPOINT),
    [
      OFFICER_SUMMARY_REQUEST_START,
      OFFICER_SUMMARY_REQUEST_SUCCESS,
      OFFICER_SUMMARY_REQUEST_FAILURE
    ]
  );

  return getFunc({}, undefined, `${id}/summary/`);
};


export const OFFICER_TIMELINE_REQUEST_START = 'OFFICER_TIMELINE_REQUEST_START';
export const OFFICER_TIMELINE_REQUEST_SUCCESS = 'OFFICER_TIMELINE_REQUEST_SUCCESS';
export const OFFICER_TIMELINE_REQUEST_FAILURE = 'OFFICER_TIMELINE_REQUEST_FAILURE';

export const getOfficerTimeline = (id) => {
  const getFunc = get(
    v2v2Url(constants.OFFICER_API_ENDPOINT),
    [
      OFFICER_TIMELINE_REQUEST_START,
      OFFICER_TIMELINE_REQUEST_SUCCESS,
      OFFICER_TIMELINE_REQUEST_FAILURE
    ]
  );

  return getFunc({}, undefined, `${id}/timeline/`);
};
