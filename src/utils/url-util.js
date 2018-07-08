import S from 'string';
import config from 'config';

import constants from 'constants';

export const v2Url = function (endpoint) {
  return S('{{baseUrl}}{{endpoint}}').template({
    'baseUrl': config.baseUrlV2V2,
    'endpoint': endpoint
  }).s;
};

export const officerUrl = (officerId) => officerId && `${constants.OFFICER_PATH}${officerId}/`;