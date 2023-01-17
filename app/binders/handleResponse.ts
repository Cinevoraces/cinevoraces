import writeOptionsCSR from './writeOptionsCSR';
import { EErrorMessages } from 'models/enums';
import type { BodyData, FetchOptions } from 'models/custom_types';

const baseUrlCSR = process.env.NEXT_PUBLIC_API_BASE_URL_CSR;

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

export default handleResponse;
