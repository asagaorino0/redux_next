import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import liff from '@line/liff';
import { setLoginUser } from '../src/lib/firebase';
import { addLoginUid, selectLoginUid } from '../src/features/loginUidSlice';
import { addUser } from '@/features/userSlice';



export default function Login() {
    const [uid, setUid] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID;
    const dispatch = useDispatch();
    const loginUid = useSelector(selectLoginUid);

    useEffect(() => {
        liff
            .init({ liffId: process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID as string })
            .then(async () => {
                if (liff.isLoggedIn()) {
                    console.log('login status : [', true, ']');
                    const profile = await liff.getProfile();
                    console.log(
                        '🚀 ~ file: Login.tsx ~ line 27 ~ liff.init ~ profile',
                        profile
                    );
                    // const userId: string = profile.userId
                    const displayName: string = profile.displayName;
                    const displayicon: string | undefined = profile.pictureUrl;
                    setName(profile.displayName);
                    setUid(profile.userId);
                    setName(displayName);
                    setIcon(displayicon);
                    setUid(profile.userId)
                    await setLoginUser(
                        loginUid,
                        profile.userId,
                        displayName,
                        displayicon,
                    );
                    dispatch(
                        addUser({
                            name: profile.displayName,
                            uid: profile.userId,
                            icon: profile.pictureUrl,
                        })
                    );
                } else {
                    console.log('login status : [', false, ']');
                }
            });
    }, []);
    const lineClick = () => {
        liff.init({ liffId: LINEID as string }).then(async () => {
            if (!liff.isLoggedIn()) {
                liff.login(); // ログインしていなければ最初にログインする
            } else if (liff.isInClient()) {
                console.log('hello world');
                const profile = await liff.getProfile();
                console.log(
                    '🚀 ~ file: Login.tsx ~ line 57 ~ liff.init ~ profile',
                    profile
                );
                const displayName: string = profile.displayName;
                const displayicon: string | undefined = profile.pictureUrl;
                setName(profile.displayName);
                setUid(profile.userId);
                setName(displayName);
                setIcon(displayicon);
                // dispatch(addUser({ name, uid, icon }));
                dispatch(
                    addLoginUid({
                        name: profile.displayName,
                        uid: profile.userId,
                        icon: profile.pictureUrl,
                    })
                );
                dispatch(
                    addUser({
                        name: profile.displayName,
                        uid: profile.userId,
                        icon: profile.pictureUrl,
                    })
                );
                await setLoginUser(
                    loginUid,
                    profile.userId,
                    displayName,
                    displayicon,
                );
            }
        })
    };
    return (
        <>
            <div className="App">
                {uid === '' ? (
                    <div>
                        <button onClick={lineClick}>
                            <h4 className="mb-4 text-green-500 text-3xl">ログイン</h4>
                        </button>
                    </div>
                ) : (
                    <button>
                        <img
                            src={`${icon}`}
                            alt=""
                            style={{ borderRadius: '50%', width: '60px', height: '60px' }} />
                    </button>
                )
                }
            </div>
        </>
    );
}
