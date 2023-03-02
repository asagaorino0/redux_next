import { store } from '@/app/store';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import { Provider } from 'react-redux';
import Copy from '../components/Copy';
import InputColor from '../components/InputColor';
import Layout from '../components/Layout';

import { siteConfig } from '../const/site.config';
import App from '../src/App';

const Home: NextPage = () => {
  const App = dynamic(() => import('@/App'), { ssr: false });
  return (
    <Layout>
      <div className="pt-12">
        <InputColor />
        <br />
        <Copy />
        {/* <React.StrictMode >
          <Provider store={store}>
            <div className="bg-blue-500 sticky top-0">
              <div className="grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12">
                <App />
              </div>
            </div>
          </Provider>
        </React.StrictMode> */}

      </div>
    </Layout>
  );
};

export default Home;
