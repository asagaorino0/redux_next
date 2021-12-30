import React, { useState, useEffect } from 'react';
import 'firebase/compat/firestore';
import { db } from "../src/firebase"
import { getFirestore, collection, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import liff from '@line/liff';

const PageL = () => {
    const [uid, setUid] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const router = useRouter()
    const toPageA = () => {
        router.push('./PageA')
    }
    const toPageB = () => {
        router.push('./PageB')
    }
    const registUser = () => {
        // dispatch(addUser({ name, uid, icon }))
        onload()
        // toPageA()
        toPageB()
    };
    const loginUrl: string | undefined = process.env.NEXT_PUBLIC_LINE_LOGIN_URL
    const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID
    const lineClick = () => {
        setUid('')
        liff.init({ liffId: LINEID as string })
            .then(() => {
                if (!liff.isLoggedIn()) {
                    liff.login() // ログインしていなければ最初にログインする
                } else if (liff.isInClient()) {
                    liff.getProfile()  // ユーザ情報を取得する
                        .then(profile => {
                            // const userId: string = profile.userId
                            const displayName: string = profile.displayName
                            const displayicon: string | undefined = profile.pictureUrl
                            setName(profile.displayName)
                            setUid(profile.userId)
                            setName(displayName)
                            setIcon(displayicon)
                            dispatch(addUser({ name, uid, icon }))
                        })
                }
            })
    }

    const line = require('@line/bot-sdk');
    const config: any = {
        channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECRET,//チャンネルシークレット
        idToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN, //アクセストークン
    };
    const client = new line.Client({
        channelAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN
    });
    const message = {
        type: 'text',
        text: 'Hello World!'
    };
    const onload = function () {
        liff
            .init({ liffId: LINEID as string })
            .then(() => {
                liff.getProfile()  // ユーザ情報を取得する
                    .then(profile => {
                        const userId: string = profile.userId
                        const displayName: string = profile.displayName
                        const displayicon: string | undefined = profile.pictureUrl
                        setName(profile.displayName)
                        setUid(userId)
                        setName(displayName)
                        setIcon(displayicon)
                        dispatch(addUser({ name, uid, icon }))
                        console.log('uid', { uid })
                        const setRef = setDoc(doc(db, 'users', `${uid}`), {
                            uid,
                            name,
                            icon,
                            timestamp: Timestamp.fromDate(new Date()),
                        }, { merge: true }//←上書きされないおまじない
                        )
                        // fetchAPI()
                        console.log('user', setRef)
                    }).catch(function (error) {
                    });
            }).catch(

            )
    }
    const options = {
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.8,
        saveToPhotos: true,
    };

    return (
        <div className="App">
            {`${user.uid}` === 'k11111' &&
                <div>
                    <button onClick={lineClick}>
                        <h4 className="mb-4 text-green-500 text-3xl">まずは友達追加</h4>
                    </button>
                </div>
            }
            {`${user.uid}` === '' &&
                <div>
                    <button onClick={registUser}>
                        {/* // <button onClick={onload}> */}
                        <h3 className="mb-4 text-green-500 text-3xl">ようこそ</h3>
                    </button>
                </div>
            }
        </div >

    );
}

export default PageL