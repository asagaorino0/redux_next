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
  const App: any = dynamic(() => import('../src/App'), { ssr: false });
  const Login: any = dynamic(() => import('../components/Login'), { ssr: false });
  return (
    <Layout>
      <div className="pt-12">
        <h1 className="text-3xl mb-4">{siteConfig.title}</h1>
        <div className="grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12">
          {/* Card */}
          <InputColor />
          <br />
          <Copy />
          <React.StrictMode >
            <Provider store={store}>
              <App />
            </Provider>
          </React.StrictMode>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
