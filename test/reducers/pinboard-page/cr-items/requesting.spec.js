import should from 'should';

import requestingReducer from 'reducers/pinboard-page/cr-items/requesting';
import {
  PINBOARD_COMPLAINTS_FETCH_REQUEST_START,
  PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
  PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE,
} from 'actions/pinboard';


describe('requestingReducer', function () {
  it('should have initial state', function () {
    should(requestingReducer(undefined, {})).be.false();
  });

  it('should handle PINBOARD_COMPLAINTS_FETCH_REQUEST_START', function () {
    requestingReducer(
      false,
      { type: PINBOARD_COMPLAINTS_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS', function () {
    requestingReducer(
      true,
      { type: PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS }
    ).should.be.false();
  });

  it('should handle PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE', function () {
    requestingReducer(
      true,
      { type: PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE }
    ).should.be.false();
  });
});
