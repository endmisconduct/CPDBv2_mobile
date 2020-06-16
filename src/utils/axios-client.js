import axios from 'axios';

export const REQUEST_CANCEL_MESSAGE = 'Cancelled by user';

const httpAdapter = require('axios/lib/adapters/http');

export const clientConfig = {
  responseType: 'json',
  withCredentials: true,
  adapter: httpAdapter
};

const client = axios.create(clientConfig);
export default client;
