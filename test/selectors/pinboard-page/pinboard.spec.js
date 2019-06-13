import {
  getPinboard,
  pinboardItemsSelector,
  pinboardICRIDsSelector,
  isEmptyPinboardSelector,
} from 'selectors/pinboard-page/pinboard';
import { PinboardFactory } from 'utils/tests/factories/pinboard';


describe('Pinboard selectors', function () {
  describe('getPinboard', function () {
    it('should return correct format of null pinboard', function () {
      const state = { pinboardPage: { pinboard: null } };
      getPinboard(state).should.eql({
        id: null,
        title: '',
        officerIds: [],
        crids: [],
        trrIds: [],
        description: '',
        url: '',
        itemsCount: 0,
        ownedByCurrentUser: false,
        crItems: [],
        officerItems: [],
        trrItems: [],
        isPinboardRestored: false,
      });
    });

    it('should return pinboard with correct format', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            id: 1,
            title: 'Pinboard Title',
            'officer_ids': [12],
            crids: ['abc'],
            'trr_ids': [1],
            description: 'Description',
            ownedByCurrentUser: true,
            crItems: [{ crid: 'abc' }],
            officerItems: [{ id: 12 }],
            trrItems: [{ id: 1 }],
            isPinboardRestored: false,
          })
        },
      };

      getPinboard(state).should.eql({
        id: '1',
        title: 'Pinboard Title',
        officerIds: ['12'],
        crids: ['abc'],
        trrIds: ['1'],
        description: 'Description',
        url: '/pinboard/1/pinboard-title/',
        itemsCount: 3,
        ownedByCurrentUser: true,
        crItems: [{ crid: 'abc' }],
        officerItems: [{ id: 12 }],
        trrItems: [{ id: 1 }],
        isPinboardRestored: false,
      });
    });

    it('should return correct format of pinboard whose title is empty', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            id: 1,
            title: '',
            'officer_ids': [12],
            crids: ['abc'],
            'trr_ids': [1],
            description: 'Description',
            ownedByCurrentUser: true,
            crItems: [{ crid: 'abc' }],
            officerItems: [{ id: 12 }],
            trrItems: [{ id: 1 }],
            isPinboardRestored: false,
          })
        },
      };

      getPinboard(state).should.eql({
        id: '1',
        title: '',
        officerIds: ['12'],
        crids: ['abc'],
        trrIds: ['1'],
        description: 'Description',
        url: '/pinboard/1/untitled-pinboard/',
        itemsCount: 3,
        ownedByCurrentUser: true,
        crItems: [{ crid: 'abc' }],
        officerItems: [{ id: 12 }],
        trrItems: [{ id: 1 }],
        isPinboardRestored: false,
      });
    });
  });

  describe('pinboardItemsSelector', function () {
    it('should return ids of items by types', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [12],
            crids: ['abc'],
            'trr_ids': [1],
          })
        }
      };

      pinboardItemsSelector(state).should.eql({
        'OFFICER': ['12'],
        'CR': ['abc'],
        'TRR': ['1'],
      });
    });
  });

  describe('pinboardICRIDsSelector', function () {
    it('should return pined crids', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [12],
            crids: ['abc', 'def'],
            'trr_ids': [1],
          })
        }
      };

      pinboardICRIDsSelector(state).should.eql(['abc', 'def']);
    });
  });

  describe('isEmptyPinboardSelector', function () {
    it('should return false if there is some crid', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: ['abc'],
            'trr_ids': [],
          })
        }
      };

      isEmptyPinboardSelector(state).should.be.false();
    });

    it('should return false if there is some officer id', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [1],
            crids: [],
            'trr_ids': [],
          })
        }
      };

      isEmptyPinboardSelector(state).should.be.false();
    });

    it('should return false if there is some trr id', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: [],
            'trr_ids': [1],
          })
        }
      };

      isEmptyPinboardSelector(state).should.be.false();
    });

    it('should return true if there is no trr, cr or officer', function () {
      const state = {
        pinboardPage: {
          pinboard: PinboardFactory.build({
            'officer_ids': [],
            crids: [],
            'trr_ids': [],
          })
        }
      };

      isEmptyPinboardSelector(state).should.be.true();
    });
  });
});
