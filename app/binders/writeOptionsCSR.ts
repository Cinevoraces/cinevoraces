import type { BodyData, FetchOptions } from 'models/custom_types';

const writeOptionsCSR = (method?: 'POST' | 'PUT' | 'DELETE', body?: BodyData | FormData, cookie?: boolean) => {
  const options: FetchOptions = {
    method: !method ? 'GET' : method,
    headers: {
      // 'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: (body instanceof FormData) ? body : JSON.stringify(body),
  };
  // Adding accessToken in most cases, if stored
  // https://github.com/fastify/fastify-jwt#cookie -> Passing both Authorization and cookies leads to ignore cookies
  if (!cookie && localStorage.accessToken && options.headers) {
    options.headers['Authorization'] = 'Bearer ' + localStorage.accessToken;
  };
  // Adding existing body for POST / PUT requests
  if (!(body instanceof FormData)) {
    options.headers['Content-type'] = 'application/json';
  }
  return options;
};

export default writeOptionsCSR;
