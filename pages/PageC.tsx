import React, { useState } from 'react';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import dynamic from 'next/dynamic'
import liff from '@line/liff';
import { useEffect } from 'react';



const PageC = () => {
    const router = useRouter()
    const toPageB = () => {
        router.push('./PageB')
    }
    // const [uid, setUid] = useState<string>('');
    // const [name, setName] = useState<string>('');
    // const [icon, setIcon] = useState<string | undefined>('');
    // const user = useSelector(selectUser);
    // const dispatch = useDispatch();
    const PageC1 = dynamic(() => import('../src/PageC1'), { ssr: false });
    // useEffect(() => {
    //     liff
    //         .init({ liffId: process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID as string })
    //         .then(async () => {
    //             if (liff.isLoggedIn()) {
    //                 console.log('login status : [', true, ']');
    //                 const profile = await liff.getProfile();
    //                 console.log(
    //                     '🚀 ~ file: Login.tsx ~ line 15 ~ liff.init ~ profile',
    //                     profile
    //                 );
    //                 // const userId: string = profile.userId
    //                 const displayName: string = profile.displayName;
    //                 const displayicon: string | undefined = profile.pictureUrl;
    //                 setName(profile.displayName);
    //                 setUid(profile.userId);
    //                 setName(displayName);
    //                 setIcon(displayicon);
    //                 dispatch(
    //                     addUser({
    //                         name: profile.displayName,
    //                         uid: profile.userId,
    //                         icon: profile.pictureUrl,
    //                     })

    //                 );///先生
    //             } else {
    //                 console.log('login status : [', false, ']');
    //             }
    //         });
    // }, [dispatch]);

    // const loginUrl: string | undefined = process.env.NEXT_PUBLIC_LINE_LOGIN_URL;
    // const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID;
    // const lineClick = () => {
    //     setUid('');
    //     liff.init({ liffId: LINEID as string }).then(() => {
    //         if (!liff.isLoggedIn()) {
    //             setUid('k00000');
    //             liff.login(); // ログインしていなければ最初にログインする
    //         } else if (liff.isInClient()) {
    //             console.log('hello world');
    //         }
    //     });
    // };///先生
    return (
        <div className="App">
            <div>
                <button onClick={toPageB}>
                    {/* // <button onClick={onload}> */}
                    <h3 className="mb-4 text-green-500 text-3xl">予約枠の設定</h3>
                </button>
                {/* {user.uid === '' && (
                    <div>
                        <button onClick={lineClick}>
                            <h4 className="mb-4 text-green-500 text-3xl">ログイン</h4>
                        </button>
                    </div>
                )} */}
            </div>
            <br />
            <h1>
                <React.StrictMode >
                    <Provider store={store}>
                        <PageC1 />
                    </Provider>
                </React.StrictMode>
            </h1>
        </div >
    );
}

export default PageC