import writeOptionsCSR from './writeOptionsCSR';
import handleResponse from './handleResponse';
import type { BodyData, FetchOptions } from 'models/custom_types';

const baseUrlCSR = process.env.NEXT_PUBLIC_API_BASE_URL_CSR;

/**
 * Generic function for get methods, specific to client side requests
 * Send accessToken for needed auth
 * @param endpoint string -> localhost:3005/dev-docs/static/index.htm
 * @returns data from API
 */
export const getRequestCSR = async (endpoint: string) => {
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
export const mutationRequestCSR = async (method: 'POST' | 'PUT' | 'DELETE', endpoint: string, body?: BodyData) => {
  const options = writeOptionsCSR(method, body);
  const res = await fetch(baseUrlCSR + endpoint, options);
  return handleResponse(res, endpoint, method, body);
};
