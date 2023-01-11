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
    return handleResponse(res);
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

/**
 * Generic function for get methods, specific to client side requests
 * Send accessToken for needed auth
 * @param endpoint string -> localhost:3005/dev-docs/static/index.htm
 * @returns data from API
 */
const getRequestCSR = async (endpoint: string) => {
  const options: FetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  if (localStorage.accessToken && options.headers) {
    options.headers['Authorization'] = 'Bearer ' + localStorage.accessToken;
  }

  const res = await fetch(baseUrlCSR + endpoint, options);
  return handleResponse(res);
};

/**
 * Generic function for mutation methods, specific to client side requests
 * Send accessToken for needed auth
 * @param method string 'POST' | 'PUT' | 'DELETE'
 * @param endpoint string -> localhost:3005/dev-docs/static/index.htm
 * @param data facultative request payload
 * @returns 
 */
const mutationRequestCSR = async (method: 'POST' | 'PUT' | 'DELETE', endpoint: string, body?: BodyData | FormData) => {
  console.log('typeof body is FormData: ', body instanceof FormData, 'body : ', body);
  const options: FetchOptions = {
    method,
    headers: {
      'Content-Type': (body instanceof FormData) ? 'multipart/form-data; boundary=???' : 'application/json',
    },
    credentials: 'include',
    body: (body instanceof FormData) ? body : JSON.stringify(body),
  };
  if (localStorage.accessToken && options.headers) {
    options.headers['Authorization'] = 'Bearer ' + localStorage.accessToken;
  }
  const res = await fetch(baseUrlCSR + endpoint, options);
  return handleResponse(res);
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
  return handleResponse(res);
};

const handleResponse = async (res: Response) => {
  // No body comes with 204 status
  if (res.status === 204 ) return;
  console.log(res);
  const responseBody = await res.json();
  console.log(responseBody);
  if (!new RegExp(/[1-3]\d{2}/).test(res.status.toString())) {
    const { message } = responseBody;
    throw new Error(message);
  }
  return responseBody;
};

export { getDataFromEndpointSSR, getRequestCSR, mutationRequestCSR, externalGetRequest };
export type { BodyData };
