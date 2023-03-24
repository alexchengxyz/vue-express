import axios from 'axios';

const request = (method, api, config = {}) => {
  const options = {
    method: method.toLowerCase(),
    url: api,
  };

  if (method === 'GET') {
    options.params = config;
  }

  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
    options.data = config;
  }

  return axios(options).then(({ data }) => data);
};

export default request;