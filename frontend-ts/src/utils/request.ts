import axios from 'axios';

const request = (method: string, api: string, config = {}): object => {
  interface OptType {
    method: string;
    url: string;
    params?: object;
    data?: object;
  }
  const options: OptType = {
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
