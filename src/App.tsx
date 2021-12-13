import React, { useState, useEffect } from 'react';
import 'firebase/compat/firestore';
import { db } from "./firebase"
import { getFirestore, collection, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import Link from 'next/link'
import PageAA from './PageAA'
import PageA from '../pages/PageA'
// import dynamic from 'next/dynamic'
import * as line from '@line/bot-sdk';
import liff from '@line/liff';
import { stringify } from 'querystring';
import useSWR from 'swr'
import Person from '../components/Person'
import User from '../components/User'
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

  const fetchAPI = async () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json())
    const { data, error } = useSWR('/api/users', fetcher)
    // const { data, error } = useSWR({ user }, fetcher)//umakuikimasenndesita
    console.log('user_App:', { data })
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    // const fetchAPI = async () => {
    // const { data, error } = useSWR('/api/users', fetcher)
    // console.log('user_App:', { data })
    // if (error) return <div>Failed to load</div>
    // if (!data) return <div>Loading...</div>
    // const res = await fetch(`/api/[${user.name}]`);
    // const data = await res.json();
    // console.log(data);
  }

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
      <Link href="/user/[id]" as={`/user/${user.uid}`}>
        <a>{user.name}さん</a>
      </Link>

      {/* <button onClick={fetchAPI}>
        fetchAPI
      </button> */}
      {/* {data.map((p: any, id: any) => (
        <User key={id} user={p} />
      ))} */}

    </div >
  );
}
