import mapCrsData from 'reducers/pinboard-page/geographic-data/map-crs-data';
import {
  PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START,
  FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
  PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
} from 'actions/pinboard';


describe('mapCrsData reducer', function () {
  it('should have initial state', function () {
    mapCrsData(undefined, {}).should.eql([]);
  });

  it('should handle PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START', function () {
    mapCrsData({
      results: [
        {
          'date': '2007-04-25',
          'crid': '123456',
          'category': 'Award',
          'coaccused': 3,
          'kind': 'CR',
          'point': {
            'lon': -87,
            'lat': 35,
          },
        },
      ],
    }, {
      type: PINBOARD_GEOGRAPHIC_FETCH_REQUEST_START,
      payload: {
        results: [
          {
            'date': '2008-04-25',
            'crid': '654321',
            'category': 'Award',
            'coaccused': 5,
            'kind': 'CR',
            'point': {
              'lon': -87,
              'lat': 35,
            },
          },
        ],
      },
    }).should.eql([]);
  });

  it('should handle FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS', function () {
    mapCrsData([], {
      type: FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'crid': '123456',
            'category': 'Award',
            'coaccused': 3,
            'kind': 'CR',
            'point': {
              'lon': -87,
              'lat': 35,
            },
          },
        ],
      },
    }).should.eql([
      {
        'date': '2007-04-25',
        'crid': '123456',
        'category': 'Award',
        'coaccused': 3,
        'kind': 'CR',
        'point': {
          'lon': -87,
          'lat': 35,
        },
      },
    ]);
  });

  it('should handle PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS', function () {
    mapCrsData([], {
      type: PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
      payload: {
        results: [
          {
            'date': '2007-04-25',
            'crid': '123456',
            'category': 'Award',
            'coaccused': 3,
            'kind': 'CR',
            'point': {
              'lon': -87,
              'lat': 35,
            },
          },
        ],
      },
    }).should.eql([
      {
        'date': '2007-04-25',
        'crid': '123456',
        'category': 'Award',
        'coaccused': 3,
        'kind': 'CR',
        'point': {
          'lon': -87,
          'lat': 35,
        },
      },
    ]);
  });
});
