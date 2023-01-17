import type { BodyData, FetchOptions } from 'models/custom_types';

const writeOptionsCSR = (method?: 'POST' | 'PUT' | 'DELETE', body?: BodyData, cookie?: boolean) => {
  const options: FetchOptions = {
    method: !method ? 'GET' : method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  // Adding accessToken in most cases, if stored
  // https://github.com/fastify/fastify-jwt#cookie -> Passing both Authorization and cookies leads to ignore cookies
  if (!cookie && localStorage.accessToken && options.headers) {
    options.headers['Authorization'] = 'Bearer ' + localStorage.accessToken;
  };
  // Adding existing body for POST / PUT requests
  if (body) {
    options.body = JSON.stringify(body);
  }
  return options;
};

export default writeOptionsCSR;
