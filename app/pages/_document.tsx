import { Html, Head, Main, NextScript } from 'next/document';

//Custom document serves a unique purpose : allow to use a dedicated portal div to modals creation
export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id='portal'></div>
      </body>
    </Html>
  );
}
