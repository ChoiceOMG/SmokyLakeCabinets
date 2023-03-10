import Head from 'next/head';
import Image from 'next/image';

import Header from '@components/layout/header';

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <h1>About</h1>
    </>
  );
}
