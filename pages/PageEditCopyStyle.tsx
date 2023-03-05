import React, { } from 'react';
// import InputColor from '@/components/InputColor';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import Layout from '../components/Layout';
import CopyStyleExample from '../components/CopyStyleExample';
import dynamic from 'next/dynamic';

export default function PageEditCopyStyle() {
    const Login = dynamic(() => import('../components/Login'), { ssr: false });
    const InputColor = dynamic(() => import('../components/InputColor'), { ssr: false });
    return (
        <>
            <Layout>
                {/* <div className="pt-12"> */}
                <div className="grid md:gap-6 mt-10 md:grid-cols-2 w-full my-24">
                    <React.StrictMode >
                        <Provider store={store}>
                            <br />
                            <CopyStyleExample />
                            <br />
                            <InputColor />
                            <br />
                            {/* <Login /> */}
                        </Provider>
                    </React.StrictMode>
                </div>
            </Layout>

        </>
    );
}
