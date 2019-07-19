import { Promise } from 'es6-promise';
import { stub, useFakeTimers } from 'sinon';

import createOrUpdatePinboard from 'middleware/create-or-update-pinboard-middleware';
import {
  ADD_OR_REMOVE_ITEM_IN_PINBOARD,
  ADD_ITEM_IN_PINBOARD_PAGE,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
  SAVE_PINBOARD,
  UPDATE_PINBOARD_INFO,
  createPinboard,
  updatePinboard,
  orderPinboardState,
  savePinboard,
  addItemToPinboardState,
  removeItemFromPinboardState,
  fetchPinboardSocialGraph,
  fetchFirstPagePinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  updatePinboardInfoState,
  performFetchPinboardRelatedData
} from 'actions/pinboard';
import { showToast } from 'actions/toast';
import { PinboardFactory } from 'utils/tests/factories/pinboard';


describe('createOrUpdatePinboard middleware', function () {
  const createStore = (pinboard, pathname='') => ({
    getState: () => {
      return {
        pinboardPage: {
          pinboard
        },
        routing: { locationBeforeTransitions: { pathname } }
      };
    },
    dispatch: stub().usingPromise(Promise).resolves('abc')
  });

  it('should not dispatch any action if action is not adding or removing items', function () {
    const action = {
      type: 'other action'
    };
    const store = createStore();
    let dispatched;

    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.called.should.be.false();
  });

  it('should handle UPDATE_PINBOARD_INFO and dispatch updatePinboardInfoState', function (done) {
    const action = {
      type: UPDATE_PINBOARD_INFO,
      payload: {
        'title': 'Updated Title',
        'description': 'Updated Description',
        'unit_id': '123',
      }
    };
    const store = createStore(PinboardFactory.build());
    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(updatePinboardInfoState({
      'title': 'Updated Title',
      'description': 'Updated Description',
      'unit_id': '123',
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle ORDER_PINBOARD and dispatch orderPinboardState', function (done) {
    const action = {
      type: ORDER_PINBOARD,
      payload: {
        type: 'OFFICER',
        ids: ['123', '789', '456']
      }
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(orderPinboardState({
      type: 'OFFICER',
      ids: ['123', '789', '456']
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle ADD_OR_REMOVE_ITEM_IN_PINBOARD and dispatch addItemToPinboardState', function (done) {
    const action = {
      type: ADD_OR_REMOVE_ITEM_IN_PINBOARD,
      payload: {
        id: '123',
        type: 'CR',
        isPinned: false,
      }
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(addItemToPinboardState({
      id: '123',
      type: 'CR',
      isPinned: false,
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle ADD_OR_REMOVE_ITEM_IN_PINBOARD and dispatch removeItemFromPinboardState', function (done) {
    const action = {
      type: ADD_OR_REMOVE_ITEM_IN_PINBOARD,
      payload: {
        id: '123',
        type: 'CR',
        isPinned: true,
      }
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(removeItemFromPinboardState({
      id: '123',
      type: 'CR',
      isPinned: true,
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle ADD_ITEM_IN_PINBOARD_PAGE and dispatch addItemToPinboardState', function (done) {
    const action = {
      type: ADD_ITEM_IN_PINBOARD_PAGE,
      payload: {
        id: '123',
        type: 'CR',
      }
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(addItemToPinboardState({
      id: '123',
      type: 'CR',
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE and dispatch removeItemFromPinboardState', function (done) {
    const action = {
      type: REMOVE_ITEM_IN_PINBOARD_PAGE,
      payload: {
        id: '123',
        type: 'CR',
      }
    };
    const store = createStore(PinboardFactory.build());

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(removeItemFromPinboardState({
      id: '123',
      type: 'CR',
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  describe('handling SAVE_PINBOARD', function () {
    it('should dispatch createPinboard', function (done) {
      const action = {
        type: SAVE_PINBOARD,
        payload: null
      };
      const store = createStore(PinboardFactory.build({
        'id': null,
        'officer_ids': [123, 456],
        'trr_ids': [789],
        'crids': ['abc'],
        'saving': false,
      }));

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(createPinboard({
        id: null,
        title: '',
        description: '',
        officerIds: ['123', '456'],
        crids: ['abc'],
        trrIds: ['789'],
      }));

      setTimeout(
        () => {
          store.dispatch.should.be.calledWith(savePinboard());
          done();
        },
        50
      );
    });

    it('should dispatch updatePinboard', function (done) {
      const action = {
        type: SAVE_PINBOARD,
        payload: null
      };
      const store = createStore(PinboardFactory.build({
        'id': '66ef1560',
        'officer_ids': [123, 456],
        'saving': false,
      }));

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(updatePinboard({
        id: '66ef1560',
        title: '',
        description: '',
        officerIds: ['123', '456'],
        crids: [],
        trrIds: [],
      }));

      setTimeout(
        () => {
          store.dispatch.should.be.calledWith(savePinboard());
          done();
        },
        50
      );
    });

    it('should dispatch nothing when saving is true', function () {
      const action = {
        type: SAVE_PINBOARD,
        payload: null
      };
      const store = createStore(PinboardFactory.build({
        'id': '66ef1560',
        'officer_ids': [123, 456],
        'saving': true,
      }));

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.not.be.called();
    });

    it('should dispatch updatePinboard when not up to date', function (done) {
      const action = {
        type: SAVE_PINBOARD,
        payload: PinboardFactory.build({
          'id': '66ef1560',
          'officer_ids': [123],
        })
      };
      const store = createStore(PinboardFactory.build({
        'id': null,
        'officer_ids': [123, 456],
        'saving': false,
      }));

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(createPinboard({
        id: null,
        title: '',
        description: '',
        officerIds: ['123', '456'],
        crids: [],
        trrIds: [],
      }));

      setTimeout(
        () => {
          store.dispatch.should.be.calledWith(savePinboard());
          done();
        },
        50
      );
    });

    it('should stop the loop if nothing else to save', function () {
      const action = {
        type: SAVE_PINBOARD,
        payload: PinboardFactory.build({
          'id': '66ef1560',
          'officer_ids': [123, 456],
        })
      };
      const store = createStore(PinboardFactory.build({
        'id': '66ef1560',
        'officer_ids': [123, 456],
        'saving': false,
      }));

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.not.be.called();
    });

    it('should fetch data at end the loop when being on the pinboard page', function () {
      const action = {
        type: SAVE_PINBOARD,
        payload: PinboardFactory.build({
          'id': '66ef1560',
          'officer_ids': [123, 456],
        })
      };
      const store = createStore(
        PinboardFactory.build({
          'id': '66ef1560',
          'officer_ids': [123, 456],
          'saving': false,
          'needRefreshData': true,
        }),
        '/pinboard/66ef1560/'
      );

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('66ef1560'));
      store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '66ef1560' }));
      store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '66ef1560' }));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('66ef1560'));
      store.dispatch.should.be.calledWith(performFetchPinboardRelatedData());
    });

    it('should retry saving on failure after 1 second', function (done) {
      const action = {
        type: SAVE_PINBOARD,
        payload: PinboardFactory.build({ 'id': '66ef1560' })
      };
      const store = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
                'saving': false,
              })
            },
          };
        },
        dispatch: stub().usingPromise(Promise).rejects(new Error('abc'))
      };

      const realSetTimeout = setTimeout;
      const clock = useFakeTimers();

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledOnce();
      store.dispatch.should.be.calledWith(updatePinboard({
        id: '66ef1560',
        title: '',
        description: '',
        officerIds: ['123', '456'],
        crids: [],
        trrIds: [],
      }));

      realSetTimeout(
        () => {
          clock.tick(1500);

          store.dispatch.should.be.calledTwice();
          store.dispatch.should.be.calledWith(savePinboard());

          clock.restore();
          done();
        },
        50,
      );
    });

    it('should retry maximum 60 times', function (done) {
      const action = {
        type: SAVE_PINBOARD,
        payload: null
      };
      const store = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
                'saving': false,
              })
            },
          };
        },
        dispatch: stub().usingPromise(Promise).resolves('abc')
      };

      createOrUpdatePinboard(store)(action => action)(action);

      const failingStore = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
                'saving': false,
              })
            },
          };
        },
        dispatch: stub().usingPromise(Promise).rejects(new Error('abc'))
      };

      const realSetTimeout = setTimeout;
      const clock = useFakeTimers();

      function repeatSave(count) {
        if (count < 61) {
          createOrUpdatePinboard(failingStore)(action => action)(action);
          realSetTimeout(
            () => {
              clock.tick(2000);
              repeatSave(count + 1);
            },
            10
          );
        } else {
          failingStore.dispatch.callCount.should.equal(121);
          clock.restore();
          done();
        }
      }

      repeatSave(0);
    });
  });

  it('should handle @@router/LOCATION_CHANGE and dispatch createPinboard', function (done) {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: null
    };
    const store = createStore(PinboardFactory.build({
      'id': null,
      'officer_ids': [123, 456],
      'saving': true,
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(createPinboard({
      id: null,
      title: '',
      description: '',
      officerIds: ['123', '456'],
      crids: [],
      trrIds: [],
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle @@router/LOCATION_CHANGE and dispatch updatePinboard', function (done) {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: null
    };
    const store = createStore(PinboardFactory.build({
      'id': '66ef1560',
      'officer_ids': [123, 456],
      'saving': true,
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.be.calledWith(updatePinboard({
      id: '66ef1560',
      title: '',
      description: '',
      officerIds: ['123', '456'],
      crids: [],
      trrIds: [],
    }));

    setTimeout(
      () => {
        store.dispatch.should.be.calledWith(savePinboard());
        done();
      },
      50
    );
  });

  it('should handle @@router/LOCATION_CHANGE and do nothing if not saving', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: null
    };
    const store = createStore(PinboardFactory.build({
      'id': '66ef1560',
      'officer_ids': [123, 456],
      'saving': false,
    }));

    let dispatched;
    createOrUpdatePinboard(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);

    store.dispatch.should.not.be.called();
  });

  describe('toast', function () {
    it('should show toast on ADD_OR_REMOVE_ITEM_IN_PINBOARD', function (done) {
      const action = {
        type: ADD_OR_REMOVE_ITEM_IN_PINBOARD,
        payload: {
          id: '123',
          type: 'CR',
          isPinned: false,
        }
      };
      const store = createStore(PinboardFactory.build());

      let dispatched;
      createOrUpdatePinboard(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);

      store.dispatch.should.be.calledWith(addItemToPinboardState({
        id: '123',
        type: 'CR',
        isPinned: false,
      }));

      store.dispatch.should.be.calledWith(showToast({
        id: '123',
        type: 'CR',
        isPinned: false,
      }));

      setTimeout(
        () => {
          store.dispatch.should.be.calledWith(savePinboard());
          done();
        },
        50
      );
    });
  });
});
