export default async function getDataFromEndpoint(endpoint: string) {
  const baseUrlSSR = process.env.API_BASE_URL_SSR;
  if (baseUrlSSR) {
    const data = await fetch(baseUrlSSR + endpoint);
    const metrics = await data.json();
    return metrics;
  }
};
