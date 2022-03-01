import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const App = dynamic(() => import('../src/App'), { ssr: false });
const Appppp = dynamic(() => import('../src/Appppp'), { ssr: false });
// const PagePay = dynamic(() => import('../src/PagePay'), { ssr: false });

const Home: NextPage = () => {
  const router = useRouter();
  // const toPageA = () => {
  //   router.push('./PageA');
  // };
  // const PageC = dynamic(() => import('./PageC'), { ssr: false });
  // const PageA = dynamic(() => import('./PageA'), { ssr: false });
  // const PagePay = dynamic(() => import('./PageA'), { ssr: false });
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>{/* konoyubi */}</h1>

        <section className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justify center flex-col">
          <Provider store={store}>
            <App />
            <Appppp />
          </Provider>
        </section>

        <div className={styles.grid}>
          {/* <p>Instantly deploy your Next.js site to a public URL with Vercel.</p> */}
        </div>
      </main>
    </div>
  );
};

export default Home;
