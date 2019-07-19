import {
  mapLegendSelector,
  mapMarkersSelector,
  crMapMarkersTransform,
  trrMapMarkerTransform,
  hasMapMarkersSelector,
  getCurrentTab,
  getGeographicDataRequesting,
} from 'selectors/pinboard-page/geographic-data';


describe('GeographicData selectors', function () {
  describe('crMapMarkersTransform', function () {
    it('should return correct item', function () {
      const crItem = {
        category: 'Conduct Unbecoming (Off-Duty)',
        kind: 'CR',
        point: {
          lat: 41.887673,
          lon: -87.62355
        },
        crid: '1002787',
        date: '2007-01-18',
      };
      crMapMarkersTransform(crItem).should.eql({
        point: {
          lat: 41.887673,
          lon: -87.62355
        },
        kind: 'CR',
        id: '1002787',
        category: 'Conduct Unbecoming (Off-Duty)',
        date: '2007-01-18',
      });
    });
  });

  describe('trrMapMarkersTransform', function () {
    it('should return correct item', function () {
      const trrItem = {
        'trr_id': '56789',
        kind: 'FORCE',
        taser: true,
        'firearm_used': false,
        point: {
          lat: 50,
          lon: -87
        },
        date: '2007-01-18',
      };
      trrMapMarkerTransform(trrItem).should.eql({
        point: {
          lat: 50,
          lon: -87
        },
        kind: 'FORCE',
        id: '56789',
        category: 'Taser',
        date: '2007-01-18',
      });
    });
  });

  describe('mapLegendSelector', function () {
    it('should return correct legend info', function () {
      const state = {
        pinboardPage: {
          geographicData: {
            requesting: false,
            data: [
              {
                category: 'Illegal Search',
                kind: 'CR',

                crid: '294619',
                'coaccused_count': 9,
              },
              {
                category: 'Illegal Search',
                kind: 'CR',

                crid: '294620',
                'coaccused_count': 10,
              },
              {
                category: 'Illegal Search',
                kind: 'CR',

                crid: '294621',
                'coaccused_count': 11,
              },
              {
                'trr_id': '123456',
                kind: 'FORCE',
                taser: false,
                'firearm_used': true,
              },
              {
                'trr_id': '654321',
                kind: 'FORCE',
                taser: true,
                'firearm_used': false,
              }
            ]
          }
        }
      };
      mapLegendSelector(state).should.eql({
        allegationCount: 3,
        useOfForceCount: 2,
      });
    });
  });

  describe('mapMarkersSelector', function () {
    it('should return correct marker', function () {
      const firstCr = {
        category: 'Illegal Search',
        kind: 'CR',
        point: {
          lat: 41.918008,
          lon: -87.73173299999999
        },
        crid: '1045343',
        date: '2007-01-18',
      };
      const secondCr = {
        category: 'Illegal Search',
        kind: 'CR',
        point: {
          lat: 41.7630623832,
          lon: -87.67122688239999
        },
        crid: '294619',
        date: '2008-01-18',
      };
      const trr = {
        'trr_id': '123456',
        kind: 'FORCE',
        taser: false,
        'firearm_used': true,
        point: {
          lat: 35.3,
          lon: 50.5
        },
        date: '2009-01-18',
      };
      const state = {
        pinboardPage: {
          geographicData: { requesting: false, data: [firstCr, secondCr, trr] }
        }
      };
      mapMarkersSelector(state).should.eql([{
        point: {
          lat: 41.918008,
          lon: -87.73173299999999
        },
        kind: 'CR',
        id: '1045343',
        category: 'Illegal Search',
        date: '2007-01-18',
      }, {
        category: 'Illegal Search',
        kind: 'CR',
        point: {
          lat: 41.7630623832,
          lon: -87.67122688239999
        },
        id: '294619',
        date: '2008-01-18',
      }, {
        point: {
          lat: 35.3,
          lon: 50.5
        },
        kind: 'FORCE',
        id: '123456',
        category: 'Firearm',
        date: '2009-01-18',
      }]);
    });
  });

  describe('hasMapMarkersSelector', function () {
    it('should return false if there is no marker', function () {
      const state = {
        pinboardPage: {
          geographicData: { requesting: false, data: [] }
        }
      };
      hasMapMarkersSelector(state).should.be.false();
    });

    it('should return true if have marker', function () {
      const state = {
        pinboardPage: {
          geographicData: {
            requesting: false,
            data: [{
              category: 'Illegal Search',
              kind: 'CR',
              crid: '1045343',
              'coaccused_count': 6,
            }]
          }
        }
      };
      hasMapMarkersSelector(state).should.be.true();
    });
  });

  describe('getGeographicDataRequesting', function () {
    it('should return requesting status', function () {
      getGeographicDataRequesting({
        pinboardPage: {
          geographicData: { requesting: false, data: [] },
        }
      }).should.be.false();
      getGeographicDataRequesting({
        pinboardPage: {
          geographicData: { requesting: true, data: [] },
        }
      }).should.be.true();
    });
  });

  describe('getCurrentTab', function () {
    it('should return current tab', function () {
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              'coaccused_data': [{
                'officer_id_1': 1,
                'officer_id_2': 2,
                'incident_date': '1988-10-03T00:00:00Z',
                'accussed_count': 1
              }]
            },
          },
          geographicData: {
            requesting: false,
            data: [{
              'date': '2006-09-26',
              'crid': '1000018',
              'category': 'Operation/Personnel Violations',
              'coaccused_count': 1,
              'kind': 'CR'
            }],
          },
          currentTab: 'GEOGRAPHIC'
        }
      };
      getCurrentTab(state).should.eql('GEOGRAPHIC');
    });

    it('should return NETWORK if both coaccused_data and geographic data are empty', function () {
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              'coaccused_data': []
            },
          },
          geographicData: {
            requesting: false,
            data: [],
          },
          currentTab: undefined
        }
      };
      getCurrentTab(state).should.eql('NETWORK');
    });

    it('should return GEOGRAPHIC if both coaccused_data are empty', function () {
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              'coaccused_data': []
            },
          },
          geographicData: {
            requesting: false,
            data: [{
              'date': '2006-09-26',
              'crid': '1000018',
              'category': 'Operation/Personnel Violations',
              'coaccused_count': 1,
              'kind': 'CR'
            }],
          },
          currentTab: undefined
        }
      };
      getCurrentTab(state).should.eql('GEOGRAPHIC');
    });
  });
});
