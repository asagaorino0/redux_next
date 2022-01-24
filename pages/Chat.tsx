import React, { useState } from 'react';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import dynamic from 'next/dynamic'
import liff from '@line/liff';
import { useEffect } from 'react';
import Chat from '../src/chat'

const PageC = () => {
    const router = useRouter()
    const toHome = () => {
        router.push('./')
    }
    const PageC1 = dynamic(() => import('../src/PageC1'), { ssr: false });

    return (
        <div className="App">
            <div>
                <button onClick={toHome}>
                    <h3 className="mb-4 text-green-500 text-3xl">予約枠の設定</h3>
                </button>
            </div>
            <br />
            <h1>
                <React.StrictMode >
                    <Provider store={store}>
                        <PageC1 />
                        <Chat />
                    </Provider>
                </React.StrictMode>
            </h1>
        </div >
    );
}

export default PageC