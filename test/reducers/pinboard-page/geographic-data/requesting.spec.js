import should from 'should';

import requestingReducer from 'reducers/pinboard-page/geographic-data/requesting';
import {
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE,
} from 'actions/pinboard';


describe('requestingReducer', function () {
  it('should have initial state', function () {
    should(requestingReducer(undefined, {})).be.false();
  });

  it('should handle FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START', function () {
    requestingReducer(
      false,
      { type: FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START }
    ).should.be.true();
  });

  it('should handle FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS', function () {
    requestingReducer(
      true,
      { type: FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS }
    ).should.be.false();
  });

  it('should handle FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE', function () {
    requestingReducer(
      true,
      { type: FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE }
    ).should.be.false();
  });
});
