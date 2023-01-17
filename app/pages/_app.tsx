import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import store from '@store/store';
import { Provider } from 'react-redux';
import Layout from '@components/Layout';
import { SWRConfig } from 'swr';
import { getRequestCSR } from 'binders/fetchApi';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Provider store={store}>
        <SWRConfig value={{ fetcher: getRequestCSR }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </Provider>
    </>
  );
}

export default MyApp;
