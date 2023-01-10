import { Html, Head, Main, NextScript } from 'next/document';

//Custom document serves a unique purpose : allow to use a dedicated portal div to modals creation
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#202029"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#393945"/>
        <meta name="keywords" content="cinéma, ciné, films, ciné-club, cinéclub, club, communauté, communautaire"/>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id='portal'></div>
      </body>
    </Html>
  );
}
