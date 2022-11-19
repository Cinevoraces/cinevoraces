import useSWR from 'swr';

const baseUrlCSR = process.env.API_BASE_URL_CSR;
const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json());

// export const useMovies = () => {
//   const { data, mutate, error } = useSWR(baseUrlCSR + '/register', fetcher);
//   const loading = !data && !error;

//   return {
//     loading, user: data, error, mutate,
//   };
// };
