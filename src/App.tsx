import React, { useState, useEffect } from 'react';
import 'firebase/compat/firestore';
import { db } from "./firebase"
import { getFirestore, collection, query, where, onSnapshot, doc, setDoc, Timestamp, serverTimestamp, addDoc } from 'firebase/firestore'
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import Link from 'next/link'
import PageAA from './PageAA'
import PageA from '../pages/PageA'
import liff from '@line/liff';

export default function App() {
  const [uid, setUid] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<string | undefined>('');
  const [age, setAge] = useState<number>(0);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter()
  const toPageC = () => {
    router.push('./PageC')
  }
  const toPageB = () => {
    router.push('./PageB')
  }
  const registB = () => {
    dispatch(addUser({ name, uid, icon }))
    onload()
    // toPageA()
    toPageB()
  };
  const registC = () => {
    dispatch(addUser({ name, uid, icon }))
    onload()
    // toPageA()
    toPageC()
  };
  const loginUrl: string | undefined = process.env.NEXT_PUBLIC_LINE_LOGIN_URL
  const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID
  const lineClick = () => {
    setUid('')
    liff.init({ liffId: LINEID as string })
      .then(() => {
        if (!liff.isLoggedIn()) {
          setUid('k00000')
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
              timestamp: serverTimestamp(),
            }, { merge: true }//←上書きされないおまじない
            )
            // fetchAPI()
            console.log('user', setRef)
          }).catch(function (error) {
          });
      })
  }

  return (
    <div className="App">
      {/* <button onClick={pickImage} >画像</button> */}

      {`${user.uid}` === 'k11111' &&
        <div>
          <button onClick={lineClick}>
            <h4 className="mb-4 text-green-500 text-3xl">まずは友達追加</h4>
          </button>
        </div>
      }
      {/* {`${user.uid}` === 'k00000' && */}
      <div>
        <button onClick={onload}>
          <h3 className="mb-4 text-green-500 text-3xl">ログインはこちら</h3>
        </button>
      </div>
      {/* } */}
      {`${user.uid}` === '' &&
        <div>
          {/* <button onClick={registUser}> */}
          {/* // <button onClick={onload}> */}
          <h2 className="mb-4 text-green-500 text-3xl">ようこそ</h2>
          {/* </button> */}
        </div>
      }
      {`${user.uid}` === '' &&
        <div>
          <button onClick={registC}>
            {/* // <button onClick={onload}> */}
            <h3 className="mb-4 text-green-500 text-3xl">ケアビューティスト専用</h3>
          </button>
        </div>
      }
      {`${user.uid}` === '' &&
        <div>
          <button onClick={registB}>
            {/* // <button onClick={onload}> */}
            <h3 className="mb-4 text-green-500 text-3xl">個人で申し込む</h3>
          </button>
        </div>
      }
      {`${user.uid}` === '' &&
        <div>
          <button onClick={registB}>
            {/* // <button onClick={onload}> */}
            <h3 className="mb-4 text-green-500 text-3xl">施設で申し込む</h3>
          </button>
        </div>
      }
      {`${user.uid}` === '' &&
        <div>
          <button onClick={registB}>
            {/* // <button onClick={onload}> */}
            <h3 className="mb-4 text-green-500 text-3xl">プレゼントとして申し込む</h3>
          </button>
        </div>
      }

      <div>
        <br />
      </div>
    </div >

  );
}