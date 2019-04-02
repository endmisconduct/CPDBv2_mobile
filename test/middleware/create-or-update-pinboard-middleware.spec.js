import { Promise } from 'es6-promise';
import { stub } from 'sinon';

import createOrUpdatePinboardMiddleware from 'middleware/create-or-update-pinboard-middleware';
import { ADD_ITEM_TO_PINBOARD } from 'actions/pinboard';
import { createPinboard, updatePinboard } from 'actions/pinboard';
import { OwnedPinboardFactory } from 'utils/tests/factories/pinboard';


describe('create-or-update-pinboard-middleware', function () {
  const createStore = (pinboard) => ({
    getState: () => {
      return {
        pinboard
      };
    },
    dispatch: stub().usingPromise(Promise).resolves('abc')
  });

  const createAddItemToPinboardAction = (item) => ({
    type: ADD_ITEM_TO_PINBOARD,
    payload: {
      id: item.id,
      type: item.type,
      isPinned: item.isPinned,
    }
  });

  it('should not dispatch any action if action is not ADD_ITEM_TO_PINBOARD', function () {
    const action = {
      type: 'other action'
    };
    const store = createStore();
    let dispatched;

    createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.called.should.be.false();
  });

  it('should dispatch createPinboard action if a first CR item is added to pinboard', function () {
    const action = createAddItemToPinboardAction({
      id: '1',
      type: 'CR',
      isPinned: false,
    });
    const store = createStore(OwnedPinboardFactory.build());
    let dispatched;

    createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(createPinboard({
      id: null,
      title: '',
      officerIds: [],
      crids: ['1'],
      description: '',
      url: '',
      itemsCount: 0,
      ownedByCurrentUser: false,
    })).should.be.true();
  });

  it('should dispatch createPinboard action if a first OFFICER item is added to pinboard', function () {
    const action = createAddItemToPinboardAction({
      id: '1',
      type: 'OFFICER',
      isPinned: false,
    });
    const store = createStore(OwnedPinboardFactory.build());
    let dispatched;

    createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
    dispatched.should.eql(action);
    store.dispatch.calledWith(createPinboard({
      id: null,
      title: '',
      officerIds: ['1'],
      crids: [],
      description: '',
      url: '',
      itemsCount: 0,
      ownedByCurrentUser: false,
    })).should.be.true();
  });

  context('when an item is added', function () {
    it('should dispatch updatePinboard if user owns the pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'CR',
        isPinned: false,
      });
      const store = createStore(OwnedPinboardFactory.build({
        id: '99',
        crids: ['2'],
        ownedByCurrentUser: true,
      }));
      let dispatched;

      createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(updatePinboard({
        id: '99',
        title: '',
        crids: ['2', '1'],
        officerIds: [],
        description: '',
        url: '',
        itemsCount: 1,
        ownedByCurrentUser: true,
      })).should.be.true();
    });

    it('should dispatch createPinboard if user does not own the pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'OFFICER',
        isPinned: false,
      });
      const store = createStore(OwnedPinboardFactory.build({
        id: '99',
        'officer_ids': ['2'],
        ownedByCurrentUser: false,
      }));
      let dispatched;

      createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(createPinboard({
        id: '99',
        title: '',
        description: '',
        crids: [],
        officerIds: ['2', '1'],
        url: '',
        itemsCount: 1,
        ownedByCurrentUser: false,
      })).should.be.true();
    });
  });

  context('when an item is removed', function () {
    it('should dispatch updatePinboard if user owns the pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: '1',
        type: 'CR',
        isPinned: true,
      });
      const store = createStore(OwnedPinboardFactory.build({
        id: '99',
        crids: ['2', '1'],
        'officer_ids': ['a'],
        ownedByCurrentUser: true,
      }));
      let dispatched;

      createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(updatePinboard({
        id: '99',
        title: '',
        description: '',
        crids: ['2'],
        officerIds: ['a'],
        url: '',
        itemsCount: 3,
        ownedByCurrentUser: true,
      })).should.be.true();
    });

    it('should dispatch createPinboard if user does not own the pinboard', function () {
      const action = createAddItemToPinboardAction({
        id: 'b',
        type: 'OFFICER',
        isPinned: true,
      });
      const store = createStore(OwnedPinboardFactory.build({
        id: '99',
        crids: ['1'],
        'officer_ids': ['a'],
        ownedByCurrentUser: false,
      }));
      let dispatched;

      createOrUpdatePinboardMiddleware(store)(action => dispatched = action)(action);
      dispatched.should.eql(action);
      store.dispatch.calledWith(createPinboard({
        id: '99',
        title: '',
        description: '',
        crids: ['1'],
        officerIds: ['a'],
        url: '',
        itemsCount: 2,
        ownedByCurrentUser: false,
      })).should.be.true();
    });
  });
});
