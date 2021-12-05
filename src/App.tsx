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
              const userId: string = profile.userId
              const displayName: string = profile.displayName
              const displayicon: string | undefined = profile.pictureUrl
              setName(profile.displayName)
              setUid(userId)
              setName(displayName)
              setIcon(displayicon)
              dispatch(addUser({ name, uid, icon }))
              alert(`Name1: ${displayName}, userId: ${userId}`)
              onload()
            }).catch(function (error) {
              window.alert('Error sending message: ' + error);
            });
        }
      })
  }
  // const lineClick = function () {
  //   liff
  //     .init({ liffId: LINEID as string })
  //     .then(() => {
  //       liff.getProfile()  // ユーザ情報を取得する
  //         .then(profile => {
  //           const userId: string = profile.userId
  //           const displayName: string = profile.displayName
  //           const displayicon: string | undefined = profile.pictureUrl
  //           setName(profile.displayName)
  //           setUid(userId)
  //           setName(displayName)
  //           setIcon(displayicon)
  //           dispatch(addUser({ name, uid, icon }))
  //           // let result = window.confirm(`Name1: ${displayName}さん、ログインします。`);
  //           // // alert(`Name1: ${displayName}, userId: ${userId}`)
  //           // if (result) {
  //           // onload()
  //           // }
  //           // setName(profile.displayName)
  //           // setUid(userId)
  //           // setName(displayName)
  //           // setIcon(displayicon)
  //           // dispatch(addUser({ name, uid, icon }))
  //           // onload()
  //         }).catch(function (error) {
  //           // window.alert('Error sending message: ' + error);
  //         });
  //     })
  //   onload()
  // };
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
            // alert(`Name2: ${displayName}, userId: ${userId}`)
          }).catch(function (error) {
            // window.alert('Error sending message: ' + error);
          });
      })
  };
  const logout = function () {
    // ログアウト
    // if (liff.isLoggedIn()) {
    liff.logout()
    // }
  }

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

  return (
    <div className="App">
      {`${user.uid}` === '11111' &&
        <div>
          <button onClick={lineClick}>
            <h4 className="mb-4 text-green-500 text-3xl">ログインはここをタップ</h4>
          </button>
        </div>
      }
      {`${user.uid}` === '11111' &&
        <div>
          <button onClick={onload}>
            <h3 className="mb-4 text-green-500 text-3xl">次にこちらをタップ</h3>
          </button>
        </div>
      }
      {`${user.uid}` === '' &&
        <div>
          <button onClick={onload}>
            <h3 className="mb-4 text-green-500 text-3xl">もう一度タップ</h3>
          </button>
        </div>
      }

      {/* <a href=' https://access.line.me/oauth2/v2.1/authorize?app_id=1656149559-xXM4l4Gp&client_id=1656149559&scope=chat_message.write+openid+profile&state=MTSFhIGGxsff&bot_prompt=aggressive&response_type=code&code_challenge_method=S256&code_challenge=Hx-YFyPAvO9ZQIg5pQpaGQuMChsOE11Raf_3DHDGFgY&liff_sdk_version=2.11.1&type=L&redirect_uri=http://localhost:3000/'>
        <div>
          <h4 className="mb-4 text-green-500 text-3xl">ログインはここをタップ</h4>
        </div>
      </a> */}
    </div >
  );
}


export default App;
