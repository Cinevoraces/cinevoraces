import '../styles/globals.css';
import type { AppProps } from 'next/app';
import store from '@store/store';
import { Provider } from 'react-redux';
import Layout from '@components/Layout';
import { SWRConfig } from 'swr';
import { getRequestCSR } from '@utils/fetchApi';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SWRConfig value={{ fetcher: getRequestCSR }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
