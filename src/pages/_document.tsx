import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="Smoky Lake Cabinets" />

        <meta
          name="application-description"
          content="Book web design consultations."
        />
      </Head>
      <body className="min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
