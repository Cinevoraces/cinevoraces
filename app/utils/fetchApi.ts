import { EErrorMessages } from 'models/enums';

const baseUrlSSR = process.env.NEXT_PUBLIC_API_BASE_URL_SSR,
  baseUrlCSR = process.env.NEXT_PUBLIC_API_BASE_URL_CSR;

/**
 * Generic function for SSR & ISR data fetching
 * @param endpoint string
 * @returns response payload
 */
const getDataFromEndpointSSR = async (endpoint: string) => {
  if (baseUrlSSR) {
    const res = await fetch(baseUrlSSR + endpoint);
    return handleResponse(res, endpoint);
  }
};

interface BodyData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface FetchOptions extends RequestInit {
  headers: {
    [key: string]: string;
  }
}

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

/**
 * Generic function for get methods, specific to client side requests
 * Send accessToken for needed auth
 * @param endpoint string -> localhost:3005/dev-docs/static/index.htm
 * @returns data from API
 */
const getRequestCSR = async (endpoint: string) => {
  const options: FetchOptions = writeOptionsCSR();
  const res = await fetch(baseUrlCSR + endpoint, options);
  return handleResponse(res, endpoint);
};

/**
 * Generic function for mutation methods, specific to client side requests
 * Send accessToken for needed auth
 * @param method string 'POST' | 'PUT' | 'DELETE'
 * @param endpoint string -> localhost:3005/dev-docs/static/index.htm
 * @param body facultative payload
 * @returns 
 */
const mutationRequestCSR = async (method: 'POST' | 'PUT' | 'DELETE', endpoint: string, body?: BodyData) => {
  const options = writeOptionsCSR(method, body);
  const res = await fetch(baseUrlCSR + endpoint, options);
  return handleResponse(res, endpoint, method, body);
};

/**
 * Generic function for get methods, specific to client side requests toward external APis
 * @param baseUrl string
 * @param apiKey string
 * @param endpoint string
 * @returns data from API
 */
const externalGetRequest = async (baseUrl: string, endpoint: string, apiKey: string, options: string) => {
  const res = await fetch(baseUrl + endpoint + `?api_key=${apiKey}` + '&' + options, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(res, endpoint);
};

/**
 * Response Handler to be used with any requests emmitted
 * Deals with 204 status, rejected requests for token expiration reasons, any other errors
 * @param res string
 * @param endpoint string - original request endpoint
 * @param method string 'POST' | 'PUT' | 'DELETE' - original request method
 * @param body facultative payload - original request body
 * @returns valid response body from API fetched endpoint
 */
const handleResponse = async (res: Response, endpoint: string, method?: 'POST' | 'PUT' | 'DELETE', body?: BodyData) => {
  let response = res;
  // No body comes with 204 status
  if (res.status === 204 ) return;
  // For others status code, extract response body
  let responseBody = await response.json();
  // If accessToken expired
  if (res.status === 401 && responseBody.message === EErrorMessages.EXPIRED_ACCESS_TOKEN ) {
    // One attempt to refresh it
    const refreshTokenAttempt = await fetch(baseUrlCSR + '/refresh', writeOptionsCSR(undefined, undefined, true));
    const rTAResponseBody = await refreshTokenAttempt.json();
    // If it failed, send a permission error
    if (refreshTokenAttempt.status !== 200){
      throw new Error(rTAResponseBody.message);
    }
    // Save the renewed accessToken in the localStorage
    window.localStorage.setItem('accessToken', rTAResponseBody.token);
    // Do the initial call once more with refreshed accessToken and overwrite the failed first try
    response = await fetch(baseUrlCSR + endpoint, writeOptionsCSR(method, body));
    responseBody = await response.json();
  }
  if (!new RegExp(/[1-3]\d{2}/).test(response.status.toString())) {
    const { message } = responseBody;
    throw new Error(message);
  }
  return responseBody;
};

export { getDataFromEndpointSSR, getRequestCSR, mutationRequestCSR, externalGetRequest };
export type { BodyData };
