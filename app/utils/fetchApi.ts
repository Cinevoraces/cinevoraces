export const getDataFromEndpoint = async (baseUrl: string, endpoint: string) => {
  const data = await fetch(`${baseUrl + endpoint}`);
  const metrics = await data.json();
  return metrics;
};
