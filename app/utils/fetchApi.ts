const baseUrlSSR = process.env.NEXT_PUBLIC_API_BASE_URL_SSR,
  baseUrlCSR = process.env.NEXT_PUBLIC_API_BASE_URL_CSR;

/**
 * Generic function for SSR & ISR data fetching
 * @param endpoint string
 * @returns response payload
 */
const getDataFromEndpointSSR = async (endpoint: string) => {
  if (baseUrlSSR) {
    return fetch(baseUrlSSR + endpoint)
      .then(res => res.json());
  }
};

interface BodyData {
  [key: string]: string | number | boolean;
}

/**
 * Generic function for get methods, specific to client side requests
 * @param endpoint string -> localhost:3005/dev-docs/static/index.htm
 * @returns data from API
 */
const getRequestCSR = async (endpoint: string) => {
  const res = await fetch(baseUrlCSR + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const responsePayload = await res.json();
  if (responsePayload.error){
    const { message } = responsePayload;
    throw new Error(message);
  }
  return responsePayload;
};

/**
 * Generic function for mutation methods, specific to client side requests
 * @param method string 'POST' | 'PUT' | 'DELETE'
 * @param endpoint string -> localhost:3005/dev-docs/static/index.htm
 * @param data facultative request payload
 * @returns 
 */
const postRequestCSR = async (method: 'POST' | 'PUT' | 'DELETE', endpoint: string, data?: BodyData) => {
  const res = await fetch(baseUrlCSR + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  const responsePayload = await res.json();
  if (responsePayload.error){
    const { message } = responsePayload;
    throw new Error(message);
  }
  return responsePayload;
};

export { getDataFromEndpointSSR, getRequestCSR, postRequestCSR };
export type { BodyData };
