import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import { useRouter } from "next/router";

import liff from '@line/liff';


const Login: NextPage = () => {
    const loginUrl = process.env.NEXT_PUBLIC_LINE_LOGIN_URL
    const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID
    // const LINEID = "1656149559-xXM4l4Gp"
    // const loginUrl = "https://access.line.me/oauth2/v2.1/authorize?app_id=1656650515-ENMoxvjb&client_id=1656650515&scope=chat_message.write+openid+profile&state=MTSFhIGGxsff&bot_prompt=aggressive&response_type=code&code_challenge_method=S256&code_challenge=Hx-YFyPAvO9ZQIg5pQpaGQuMChsOE11Raf_3DHDGFgY&liff_sdk_version=2.11.1&type=L&redirect_uri=http://localhost:3000/"
    console.log('LINEID', LINEID)
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [uid, setUid] = useState("");
    // if (process.browser) {
    //   document.getElementById('root')
    // }
    // const onload = function () {
    //     liff
    //         .init({ liffId: LINEID as string })
    //         .then(() => {
    //             // 初期化完了
    //             initializeApp();
    //             liff.getProfile()  // ユーザ情報を取得する
    //                 .then(profile => {
    //                     const userId: string = profile.userId
    //                     const displayName: string = profile.displayName
    //                     setName(profile.displayName)
    //                     setUid(profile.userId)
    //                     console.log("{login}", `${name}`, `${uid}`);
    //                     alert(`Name: ${displayName}, userId: ${userId}`)
    //                 }).catch(function (error) {
    //                     window.alert('Error sending message: ' + error);
    //                 });
    //         })
    // };
    // function initializeApp() {
    //     // ログインチェック
    //     if (liff.isLoggedIn()) {
    //         //ログイン済
    //         // onload()
    //         onload()
    //     } else {
    //         // 未ログイン
    //         // let result = window.confirm("LINE Loginしますか？新着情報を確認する場合はキャンセルしてください。");
    //         // if (result) {
    //         liff.login();
    //         // window.location.href = loginUrl;
    //         // }
    //     }
    // }
    // const lineClick = function () {
    //     onload()
    //     // liff.login();
    //     // window.location.href = loginUrl;
    // };

    const lineClick = () => {
        liff.init({ liffId: LINEID as string }) // LIFF IDをセットする
            .then(() => {
                if (!liff.isLoggedIn()) {
                    liff.login({}) // ログインしていなければ最初にログインする
                } else if (liff.isInClient()) { // LIFFので動いているのであれば
                    liff.sendMessages([{ // メッセージを送信する
                        'type': 'text',
                        'text': "You've successfully sent a message! Hooray!"
                    }]).then(function () {
                        window.alert('Message sent');
                    }).catch(function (error) {
                        window.alert('Error sending message: ' + error);
                    });
                }
            })
    }
    // /* 追加: UserProfileをAlertで表示 */
    const router = useRouter()
    const toPageA = () => {
        router.push('./PageA')
    }
    const onload = () => {
        console.log(process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID)
        liff.init({ liffId: process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID as string })
            .then(() => {
                if (!liff.isLoggedIn()) {
                    liff.login({}) // ログインしていなければ最初にログインする
                } else if (liff.isInClient()) {
                    liff.getProfile()  // ユーザ情報を取得する
                        .then(profile => {
                            const userId: string = profile.userId
                            const displayName: string = profile.displayName
                            setName(profile.displayName)
                            setUid(profile.userId)
                            console.log("{login}", `${name}`, `${uid}`);
                            alert(`Name: ${displayName}, userId: ${userId}`)
                            toPageA()
                        }).catch(function (error) {
                            window.alert('Error sending message: ' + error);
                        });
                }
            })
    }
    // const onload = function () {
    //   if (liff.isLoggedIn()) {
    //     liff.getProfile()
    //       .then(profile => {
    //         setName(profile.displayName)
    //         setUid(profile.userId)
    //         // setAvatar(profile.pictureUrl)
    //         console.log("{login}", `${name}`, `${uid}`);
    //         console.log('succes!')
    //       })
    //   }
    // }
    // // 現在ログインしているユーザーを取得する
    // useEffect(() => {
    //     liff.getProfile()
    //         .then(profile => {
    //             setName(profile.displayName)
    //             setUid(profile.userId)
    //             //   setAvatar(profile.pictureUrl)
    //             // myProfile()
    //         })
    // }, []
    // );
    return (
        <div className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justifycenter flex-col">
            <button onClick={lineClick}>
                <h3 className="mb-4 text-green-500 text-3xl">ログイン</h3></button>
            <a href="https://access.line.me/oauth2/v2.1/authorize?app_id=1656650515-ENMoxvjb&client_id=1656650515&scope=chat_message.write+openid+profile&state=MTSFhIGGxsff&bot_prompt=aggressive&response_type=code&code_challenge_method=S256&code_challenge=Hx-YFyPAvO9ZQIg5pQpaGQuMChsOE11Raf_3DHDGFgY&liff_sdk_version=2.11.1&type=L&redirect_uri=https://redux-next.vercel.app/">
                <div>
                    name: {name}
                </div>
            </a>
        </div>
    )
}

export default Login
