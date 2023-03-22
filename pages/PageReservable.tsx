import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

import dynamic from 'next/dynamic';
import Layout from 'components/Layout';

export default function PageReservable() {
    const Form_Zikoku = dynamic(() => import('../lib/Form_Zikoku'), { ssr: false });
    const Form_Calendar = dynamic(() => import('../lib/Form_Calendar'), { ssr: false });
    return (
        <>
            <React.StrictMode >
                <Provider store={store}>
                    <Layout>
                        <div className="pt-12">
                            <div className="grid md:gap-6 mt-0 md:grid-cols-2 w-full mb-6">
                                <div>
                                    <Form_Calendar />
                                    <br />
                                    <Form_Zikoku />
                                    <br />
                                </div>
                            </div>
                        </div>
                    </Layout>
                </Provider>
            </React.StrictMode>
        </>
    );
}
