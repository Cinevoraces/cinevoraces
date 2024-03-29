import handleResponse from './handleResponse';

const baseUrlSSR = process.env.NEXT_PUBLIC_API_BASE_URL_SSR;

/**
 * Generic function for SSR & ISR data fetching
 * @param endpoint string
 * @returns response payload
 */
export const getRequestSSR = async (endpoint: string) => {
  if (baseUrlSSR) {
    const res = await fetch(baseUrlSSR + endpoint);
    return handleResponse(res, endpoint);
  }
};
