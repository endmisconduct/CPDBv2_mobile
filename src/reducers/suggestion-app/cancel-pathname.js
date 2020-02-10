import { handleActions } from 'redux-actions';

export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => {
    const { pathname } = action.payload.location;
    return pathname.startsWith('/search/') ? state : pathname;
  },
}, '/');
