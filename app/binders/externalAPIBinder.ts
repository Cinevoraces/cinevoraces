import handleResponse from './handleResponse';

/**
 * Generic function for get methods, specific to client side requests toward external APis
 * @param baseUrl string
 * @param apiKey string
 * @param endpoint string
 * @returns data from API
 */
export const externalGetRequest = async (baseUrl: string, endpoint: string, apiKey: string, options: string) => {
  const res = await fetch(baseUrl + endpoint + `?api_key=${apiKey}` + '&' + options, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(res, endpoint);
};
