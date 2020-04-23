import { LOCATION_CHANGE } from 'connected-react-router';

import { APP_CONFIG_FETCH_SUCCESS, fetchAppConfig } from 'actions/common/app-config';
import appConfig from 'utils/app-config';
import { APP_CONFIG_KEYS } from 'constants';


const appConfigTransform = config => ({
  ...config,
  [APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY]: parseInt(config[APP_CONFIG_KEYS.PINBOARD_INTRODUCTION_DELAY]),
});

const appConfigMiddleware = store => next => action => {
  if (action.type === LOCATION_CHANGE) {
    if (appConfig.isEmpty()) {
      store.dispatch(fetchAppConfig());
    }
  }
  if (action.type === APP_CONFIG_FETCH_SUCCESS) {
    appConfig.set(appConfigTransform(action.payload));
  }

  return next(action);
};

export default appConfigMiddleware;
