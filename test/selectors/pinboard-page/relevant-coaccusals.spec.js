import {
  relevantCoaccusalsSelector,
  relevantCoaccusalsNextParamsSelector,
  relevantCoaccusalsHasMoreSelector,
} from 'selectors/pinboard-page/relevant-coaccusals';


describe('RelevantCoaccusals selectors', function () {
  describe('relevantCoaccusalsSelector', function () {
    it('should return coaccusals data correctly', function () {
      const coaccusals = [{
        'id': 21992,
        'rank': 'Police Officer',
        'full_name': 'Johnny Patterson',
        'coaccusal_count': 24,
        'allegation_count': 42,
        'percentile_trr': '0.0000',
        'percentile_allegation': '88.9038',
        'percentile_allegation_civilian': '49.4652',
        'percentile_allegation_internal': '85.8654',
      },
      {
        'id': 2433,
        'rank': 'Police Officer',
        'full_name': 'Darren Borum',
        'coaccusal_count': 18,
        'allegation_count': 81,
        'percentile_trr': '38.9028',
        'percentile_allegation': '86.0456',
        'percentile_allegation_civilian': '81.8766',
        'percentile_allegation_internal': '88.3297',
      }];
      const state = {
        pinboardPage: {
          pinboard: {},
          relevantCoaccusals: {
            items: coaccusals,
            count: 444,
            pagination: {
              next: '/pinboards/66ef1560/relevant-coaccusals/?limit=20&offset=20',
              previous: null,
            },
          },
        },
      };

      relevantCoaccusalsSelector(state).should.eql([{
        id: 21992,
        rank: 'Police Officer',
        fullName: 'Johnny Patterson',
        coaccusalCount: 24,
        complaintCount: 42,
        percentile: {
          items: [
            { axis: 'Use of Force Reports', value: 0 },
            { axis: 'Internal Allegations', value: 85.8654 },
            { axis: 'Civilian Allegations', value: 49.4652 },
          ],
          visualTokenBackground: '#FF412C',
          textColor: '#231F20',
        },
      }, {
        id: 2433,
        rank: 'Police Officer',
        fullName: 'Darren Borum',
        coaccusalCount: 18,
        complaintCount: 81,
        percentile: {
          items: [
            { axis: 'Use of Force Reports', value: 38.9028 },
            { axis: 'Internal Allegations', value: 88.3297 },
            { axis: 'Civilian Allegations', value: 81.8766 },
          ],
          visualTokenBackground: '#FF412C',
          textColor: '#231F20',
        },
      }]);
    });
  });

  describe('relevantCoaccusalsNextParamsSelector', function () {
    it('should return next request params', function () {
      const state = {
        pinboardPage: {
          relevantCoaccusals: {
            items: [],
            count: 444,
            pagination: {
              next: '/pinboards/66ef1560/relevant-coaccusals/?limit=10&offset=20',
              previous: '/pinboards/66ef1560/relevant-coaccusals/?',
            },
          },
        },
      };

      relevantCoaccusalsNextParamsSelector(state).should.eql({ limit: '10', offset: '20' });
    });
  });

  describe('relevantCoaccusalsHasMoreSelector', function () {
    it('should return true if count is greater than number of current coaccusals', function () {
      const coaccusals = [{
        'id': 21992,
        'rank': 'Police Officer',
        'full_name': 'Johnny Patterson',
        'coaccusal_count': 24,
        'percentile_trr': '0.0000',
        'percentile_allegation': '88.9038',
        'percentile_allegation_civilian': '49.4652',
        'percentile_allegation_internal': '85.8654',
      },
      {
        'id': 2433,
        'rank': 'Police Officer',
        'full_name': 'Darren Borum',
        'coaccusal_count': 18,
        'percentile_trr': '38.9028',
        'percentile_allegation': '86.0456',
        'percentile_allegation_civilian': '81.8766',
        'percentile_allegation_internal': '88.3297',
      }];
      const state = {
        pinboardPage: {
          relevantCoaccusals: {
            items: coaccusals,
            count: 444,
            pagination: {
              next: '/pinboards/66ef1560/relevant-coaccusals/?limit=20&offset=20',
              previous: null,
            },
          },
        },
      };

      relevantCoaccusalsHasMoreSelector(state).should.be.true();
    });

    it('should return false if count is not greater than number of current coaccusals', function () {
      const coaccusals = [{
        'id': 21992,
        'rank': 'Police Officer',
        'full_name': 'Johnny Patterson',
        'coaccusal_count': 24,
        'percentile_trr': '0.0000',
        'percentile_allegation': '88.9038',
        'percentile_allegation_civilian': '49.4652',
        'percentile_allegation_internal': '85.8654',
      },
      {
        'id': 2433,
        'rank': 'Police Officer',
        'full_name': 'Darren Borum',
        'coaccusal_count': 18,
        'percentile_trr': '38.9028',
        'percentile_allegation': '86.0456',
        'percentile_allegation_civilian': '81.8766',
        'percentile_allegation_internal': '88.3297',
      }];
      const state = {
        pinboardPage: {
          relevantCoaccusals: {
            items: coaccusals,
            count: 2,
            pagination: {
              next: '/pinboards/66ef1560/relevant-coaccusals/?limit=20&offset=20',
              previous: null,
            },
          },
        },
      };

      relevantCoaccusalsHasMoreSelector(state).should.be.false();
    });
  });
});
