import React, { useState, useEffect } from 'react';
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
import * as line from '@line/bot-sdk';
import liff from '@line/liff';
import { stringify } from 'querystring';
export default function App() {
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
              fetchAPI()
              alert(`Name1: ${displayName}, userId: ${userId}`)
              onload()
            }).catch(function (error) {
              window.alert('Error sending message: ' + error);
            });
        }
      })
  }
  const fetchAPI = async () => {
    const name = 'HE';
    setName(name)
    dispatch(addUser({ name }))
    const response = await fetch(`/api/people/`);
    // const response = await fetch(`/api/people/${name}`);
    const data = await response.json();
    console.log(data);
  }

  // const config: any = {
  //   channelAccessToken: process.env.ACCESS_TOKEN,
  //   channelSecret: process.env.CHANNEL_SECRET
  // };
  // const lineClick = function () {
  // const client = new line.Client({
  //   channelAccessToken: 'u/gxNRim4lRdiZrvvPhus23nEgxtWFAo4Q3Ju/WWoqK/4Wk5WJ4KGitGYC7oQ4O+rUcofpkjVddvZ8667cbk76d0MaQ68MlZs4hPu3DHY0YmLzd1JRiaFX87bT9+18RmfxYr/8B4lUQg0SyL2Eux5QdB04t89/1O/w1cDnyilFU='
  // });
  // client.getProfile('622174c0ed8b54e0d14ff83058f7b1d7')
  //   .then((profile) => {
  //     console.log(profile.displayName);
  //     console.log(profile.userId);
  //     console.log(profile.pictureUrl);
  //     console.log(profile.statusMessage);
  //   })
  //   .catch((err) => {
  //   });
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
            fetchAPI()

            console.log('user', setRef)
          }).catch(function (error) {
          });
      })
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
      {`${user.uid}` === 'k11111' &&
        <div>
          <button onClick={onload}>
            <h3 className="mb-4 text-green-500 text-3xl">ログインはこちら</h3>
          </button>
        </div>
      }
      {`${user.uid}` === '' &&
        <div>
          <button onClick={onload}>
            <h3 className="mb-4 text-green-500 text-3xl">ようこそ</h3>
          </button>
        </div>
      }
      <button onClick={fetchAPI}>
        fetchAPI
      </button>
      {/* <a href=' https://access.line.me/oauth2/v2.1/authorize?app_id=1656149559-xXM4l4Gp&client_id=1656149559&scope=chat_message.write+openid+profile&state=MTSFhIGGxsff&bot_prompt=aggressive&response_type=code&code_challenge_method=S256&code_challenge=Hx-YFyPAvO9ZQIg5pQpaGQuMChsOE11Raf_3DHDGFgY&liff_sdk_version=2.11.1&type=L&redirect_uri=http://localhost:3000/'>
        <div>
          <h4 className="mb-4 text-green-500 text-3xl">ログインはここをタップ</h4>
        </div>
      </a> */}
    </div >
  );
}
