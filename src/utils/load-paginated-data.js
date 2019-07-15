import { merge } from 'lodash';

const storeDispatch = (actionCall, store) => {
  return store ? store.dispatch(actionCall) : actionCall;
};

export default (requestParams, firstRequestFunc, otherRequestFunc, store) => {
  storeDispatch(firstRequestFunc(requestParams), store).then((response) => {
    if (response && response.payload) {
      const totalCount = response.payload['count'];
      const limit = response.payload['limit'];
      for (let offset = limit; offset < totalCount; offset = offset + limit) {
        storeDispatch(otherRequestFunc(merge({ limit: limit, offset: offset }, requestParams)), store);
      }
    }
  });
};
