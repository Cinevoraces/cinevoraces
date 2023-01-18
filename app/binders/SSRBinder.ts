import handleResponse from './handleResponse';

const baseUrlSSR = process.env.NEXT_PUBLIC_API_BASE_URL_SSR || 'http://cinevoraces_api:3005' ;

/**
 * Generic function for SSR & ISR data fetching
 * @param endpoint string
 * @returns response payload
 */
export const getRequestSSR = async (endpoint: string) => {
  console.log(baseUrlSSR + endpoint);
  if (baseUrlSSR) {
    const res = await fetch(baseUrlSSR + endpoint);
    return handleResponse(res, endpoint);
  }
};
