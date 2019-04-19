import should from 'should';

import pinboardReducer from 'reducers/pinboard';
import {
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
  PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
  PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
} from 'actions/pinboard';


describe('Pinboard reducer', function () {
  it('should have initial state', function () {
    should(pinboardReducer(undefined, {})).eql(null);
  });

  it('should handle PINBOARD_CREATE_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: 2,
        title: 'Title 2',
        description: 'Description 2',
        'officer_ids': [2],
        crids: [],
        'trr_ids': [],
        ownedByCurrentUser: false,
      },
      {
        type: PINBOARD_CREATE_REQUEST_SUCCESS,
        payload: {
          id: 1,
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
          'trr_ids': [1],
        }
      }
    ).should.deepEqual({
      id: 1,
      title: 'Title',
      description: 'Description',
      'officer_ids': [1],
      crids: ['abc'],
      'trr_ids': [1],
      ownedByCurrentUser: true,
    });
  });

  it('should handle PINBOARD_UPDATE_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        ownedByCurrentUser: false,
      },
      {
        type: PINBOARD_UPDATE_REQUEST_SUCCESS,
        payload: {
          id: 1,
          title: 'Title',
          description: 'Description',
          'officer_ids': [1],
          crids: ['abc'],
          'trr_ids': [1],
        }
      }
    ).should.deepEqual({
      id: 1,
      title: 'Title',
      description: 'Description',
      'officer_ids': [1],
      crids: ['abc'],
      'trr_ids': [1],
      ownedByCurrentUser: false,
    });
  });

  context('handling PINBOARD_FETCH_REQUEST_SUCCESS', function () {
    it('should set ownedByCurrentUser as False if current pinboard is null', function () {
      pinboardReducer(
        {
          id: null,
          ownedByCurrentUser: false,
        },
        {
          type: PINBOARD_FETCH_REQUEST_SUCCESS,
          payload: {
            id: 1,
          }
        }
      ).should.deepEqual({
        id: 1,
        ownedByCurrentUser: false
      });
    });

    it('should set ownedByCurrentUser as False if fetched and current pinboard are not alike', function () {
      pinboardReducer(
        {
          id: 1,
          ownedByCurrentUser: true,
        },
        {
          type: PINBOARD_FETCH_REQUEST_SUCCESS,
          payload: {
            id: 2,
          }
        }
      ).should.deepEqual({
        id: 2,
        ownedByCurrentUser: false
      });
    });

    context('when fetched and current pinboard are like', function () {
      it('should set ownedByCurrentUser as True if ownedByCurrentUser is True', function () {
        pinboardReducer(
          {
            id: 1,
            ownedByCurrentUser: true,
          },
          {
            type: PINBOARD_FETCH_REQUEST_SUCCESS,
            payload: {
              id: 1,
            }
          }
        ).should.deepEqual({
          id: 1,
          ownedByCurrentUser: true
        });
      });

      it('should set ownedByCurrentUser as False if ownedByCurrentUser is False', function () {
        pinboardReducer(
          {
            id: 1,
            ownedByCurrentUser: false,
          },
          {
            type: PINBOARD_FETCH_REQUEST_SUCCESS,
            payload: {
              id: 1,
            }
          }
        ).should.deepEqual({
          id: 1,
          ownedByCurrentUser: false
        });
      });
    });
  });

  it('should handle PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: 1,
        crItems: [{ id: 1 }],
      },
      {
        type: PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
        payload: [
          { id: 2 }, { id: 3 },
        ]
      }
    ).should.deepEqual({
      id: 1,
      crItems: [{ id: 2 }, { id: 3 }],
    });
  });

  it('should handle PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: 1,
        officerItems: [{ id: 1 }],
      },
      {
        type: PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
        payload: [
          { id: 2 }, { id: 3 },
        ]
      }
    ).should.deepEqual({
      id: 1,
      officerItems: [{ id: 2 }, { id: 3 }],
    });
  });

  it('should handle PINBOARD_TRRS_FETCH_REQUEST_SUCCESS', function () {
    pinboardReducer(
      {
        id: 1,
        trrItems: [{ id: 1 }],
      },
      {
        type: PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
        payload: [
          { id: 2 }, { id: 3 },
        ]
      }
    ).should.deepEqual({
      id: 1,
      trrItems: [{ id: 2 }, { id: 3 }],
    });
  });
});
