import { get, post } from 'actions/common/async-action';
import { v2Url } from 'utils/url-util';
import constants from 'constants';


export const COMPLAINT_REQUEST_START = 'COMPLAINT_REQUEST_START';
export const COMPLAINT_REQUEST_SUCCESS = 'COMPLAINT_REQUEST_SUCCESS';
export const COMPLAINT_REQUEST_FAILURE = 'COMPLAINT_REQUEST_FAILURE';

export const COMPLAINT_REQUEST_DOC_REQUEST_START = 'COMPLAINT_REQUEST_DOC_REQUEST_START';
export const COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS = 'COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS';
export const COMPLAINT_REQUEST_DOC_REQUEST_FAILURE = 'COMPLAINT_REQUEST_DOC_REQUEST_FAILURE';

export const requestComplaint = (id) => get(
  v2Url(constants.COMPLAINT_API_ENDPOINT),
  [
    COMPLAINT_REQUEST_START,
    COMPLAINT_REQUEST_SUCCESS,
    COMPLAINT_REQUEST_FAILURE
  ]
)(undefined, undefined, `${id}/`, { id });

export const requestDocument = ({ id, email }) => post(
  `${v2Url(constants.COMPLAINT_API_ENDPOINT)}${id}/request-document/`,
  [COMPLAINT_REQUEST_DOC_REQUEST_START, COMPLAINT_REQUEST_DOC_REQUEST_SUCCESS, COMPLAINT_REQUEST_DOC_REQUEST_FAILURE]
)({ email: email });
