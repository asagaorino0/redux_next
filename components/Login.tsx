import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import liff from '@line/liff';
import { setLoginUser } from '@/lib/firebase';
import Link from 'next/link';
import { addUser, selectUser } from '@/features/userSlice';
export const Logout = () => {
    const dispatch = useDispatch();
    console.log('login status : [', false, ']');
    return (
        <button
            onClick={() => {
                dispatch(
                    addUser({
                        name: '',
                        uid: '',
                        icon: '',
                    })
                );
                liff.logout()

            }}
        >
            <Link href="/" >
                ログアウト
            </Link>
        </button>
    )
}


export default function Login() {
    const [uid, setUid] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID;
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        user.uid === "" &&
            liff
                .init({ liffId: process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID as string })
                .then(async () => {
                    if (liff.isLoggedIn()) {
                        console.log('login status : [', true, ']');
                        const profile = await liff.getProfile();
                        console.log(
                            '🚀 ~ file: Login.tsx ~ line 49 ~ liff.init ~ profile',
                            profile
                        );
                        const displayName: string = profile.displayName;
                        const displayicon: string | undefined = profile.pictureUrl;
                        setName(profile.displayName);
                        setUid(profile.userId);
                        setName(displayName);
                        setIcon(displayicon);
                        setUid(profile.userId)
                        dispatch(
                            addUser({
                                name: profile.displayName,
                                uid: profile.userId,
                                icon: profile.pictureUrl,
                            })
                        );
                        await setLoginUser(
                            user,
                            profile.userId,
                            displayName,
                            displayicon,
                        );

                    } else {
                        console.log('login status : [', false, ']');
                    }
                });
    }, []);
    const lineClick = () => {
        liff.init({ liffId: LINEID as string }).then(async () => {
            liff.login(); // ログインしていなければ最初にログインする
        })
    };
    return (
        <>
            <div className="App">
                {uid === '' ? (
                    <button onClick={lineClick}>
                        ログイン
                    </button>
                ) : (
                    <>
                        <button onClick={lineClick}>
                            <img
                                src={`${icon}`}
                                alt=""
                                style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                            />
                        </button>
                    </>
                )
                }
            </div>
        </>
    );
}
