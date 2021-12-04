import React, { useState, useEffect } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from "./firebase"
import { getFirestore, collection, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
// import { app } from "./firebase"
// import './App.css';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import PageAA from './PageAA'
import PageA from '../pages/PageA'
// import dynamic from 'next/dynamic'

import liff from '@line/liff';
import { stringify } from 'querystring';
function App() {
  // const PageA = dynamic(
  //   () => import('../pages/PageA'),
  //   { ssr: false }
  // )
  const [uid, setUid] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<string | undefined>('');
  const [age, setAge] = useState<number>(0);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter()
  const toPageA = () => {
    router.push('./PageA')
  }
  const registUser = () => {
    dispatch(addUser({ name, age, uid, icon }))
    // toPageA()
  };
  const loginUrl = process.env.NEXT_PUBLIC_LINE_LOGIN_URL
  const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID
  const lineClick = function () {
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
            let result = window.confirm(`Name1: ${displayName}さん、ログインします。`);
            // alert(`Name1: ${displayName}, userId: ${userId}`)
            if (result) {
              onload()
            }
          }).catch(function (error) {
            // window.alert('Error sending message: ' + error);
          });
      })
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

            const setRef = setDoc(doc(db, 'users', `${uid}`), {
              uid,
              name,
              icon,
              timestamp: Timestamp.fromDate(new Date()),
            }, { merge: true }//←上書きされないおまじない
            )
            console.log('user', setRef)
            // const docRef = addDoc(collection(db, 'tasks'), {
            //     uid: user.user.uid,
            //     id: '003',
            //     name: user.user.name
            // })
            // console.log("login:", profile);
            alert(`Name2: ${displayName}, userId: ${userId}`)
          }).catch(function (error) {
            // window.alert('Error sending message: ' + error);
          });
      })
  };

  // 現在ログインしているユーザーを取得する
  // useEffect(() => {
  //   if (liff.isLoggedIn()) {
  //     liff.getProfile()
  //       .then(profile => {
  //         setName(profile.displayName)
  //         setUid(profile.userId)
  //         console.log("{login}", `${name}`, `${uid}`);
  //         //   setAvatar(profile.pictureUrl)
  //         // myProfile()
  //       })
  //   }
  // }, []
  // );
  // function initializeApp() {
  //   // ログインチェック
  //   if (liff.isLoggedIn()) {
  //     //ログイン済
  //     // onload()
  //     onload()
  //   } else {
  //     // 未ログイン
  //     // let result = window.confirm("LINE Loginしますか？新着情報を確認する場合はキャンセルしてください。");
  //     // if (result) {
  //     liff.login();
  //     // window.location.href = loginUrl;
  //     // }
  //   }
  // }

  return (
    <div className="App">
      {/* <MemoryRouter>
        <Router>
          <header className="App-header">
            <PageAA />
          </header>
        </Router>
      </MemoryRouter> */}
      {/* <h1>name</h1>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <h1>age</h1>
      <input type="text" onChange={(e) => setAge(Number(e.target.value))} />
      <h1>登録</h1>
      <button onClick={registUser}>登録</button>
      <button onClick={onload}>ロード</button>
      <h1>
        {user.name}/{user.age}
      </h1> */}
      <PageA />
      <button onClick={lineClick}>
        <h3 className="mb-4 text-green-500 text-3xl">ログイン</h3></button>
      <a href="https://access.line.me/oauth2/v2.1/authorize?app_id=1656650515-ENMoxvjb&client_id=1656650515&scope=chat_message.write+openid+profile&state=MTSFhIGGxsff&bot_prompt=aggressive&response_type=code&code_challenge_method=S256&code_challenge=Hx-YFyPAvO9ZQIg5pQpaGQuMChsOE11Raf_3DHDGFgY&liff_sdk_version=2.11.1&type=L&redirect_uri=http://localhost:3000/">
        <div>
          localhost3000
        </div>
      </a>
    </div>
  );
}


export default App;
