import { handleActions } from 'redux-actions';

import { SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE } from 'actions/suggestion';


const isRequesting = handleActions({
  [SUGGESTION_REQUEST_START]: (state, action) => (true),
  [SUGGESTION_REQUEST_SUCCESS]: (state, action) => (false),
  [SUGGESTION_REQUEST_FAILURE]: (state, action) => (false),
}, false);

export default isRequesting;
