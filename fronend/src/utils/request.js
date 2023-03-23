import axios from 'axios';

const request = (method, api, config = {}) => (
  axios[method.toLowerCase()](api, config)
    .then(({ data }) => data))

export default request;