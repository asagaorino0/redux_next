import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

export default MyApp;
