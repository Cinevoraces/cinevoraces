const baseUrlSSR = process.env.NEXT_PUBLIC_API_BASE_URL_SSR,
  baseUrlCSR = process.env.NEXT_PUBLIC_API_BASE_URL_CSR;
console.log('CSR: ', baseUrlCSR, 'SSR: ', baseUrlSSR);

const getDataFromEndpointSSR = async (endpoint: string) => {
  if (baseUrlSSR) {
    const data = await fetch(baseUrlSSR + endpoint);
    const metrics = await data.json();
    return metrics;
  }
};

interface BodyData {
  [key: string]: string | number | boolean;
}

const postRequestCSR = async (endpoint: string, data: BodyData) => {
  try {
    fetch(baseUrlCSR + endpoint, {
      method: 'POST',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  } catch (err) {
    console.error(err);
  }
};

export { getDataFromEndpointSSR, postRequestCSR };
