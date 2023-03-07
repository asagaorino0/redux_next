import { store } from '@/app/store';
import React from 'react';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { LayoutProps } from '../types/types';
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (

    <div className="flex flex-col h-screen z-50">
      <React.StrictMode >
        <Provider store={store}>
          <div className="bg-blue-500 sticky top-0 z-auto">
            <Navbar />
          </div>
          <main className="flex-grow w-full pb-12 px-4">
            {children}
          </main>
          <div className="bg-blue-500 sticky bottom-0">
            {/* <Footer /> */}
          </div>
        </Provider>
      </React.StrictMode>
    </div>
  );
};

export default Layout;
