import React, { useState, useEffect, useLayoutEffect } from 'react';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { addTomare } from '../src/features/tomareSlice';
import 'firebase/compat/firestore';
import { db } from './firebase';
import liff from '@line/liff';
import { collection, collectionGroup, query, where, doc, setDoc, onSnapshot } from 'firebase/firestore'
import { TomareState } from "../src/types/tomare";

export default function App() {
  const [uid, setUid] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<string | undefined>('');
  const [tomare, setTomare] = useState<any>([]);
  const [pay, setPay] = useState<any>([]);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter();
  useEffect(() => {
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID as string })
      .then(async () => {
        if (liff.isLoggedIn()) {
          console.log('login status : [', true, ']');
          const profile = await liff.getProfile();
          console.log(
            '🚀 ~ file: Login.tsx ~ line 15 ~ liff.init ~ profile',
            profile
          );
          const displayName: string = profile.displayName;
          const displayicon: string | undefined = profile.pictureUrl;
          setName(profile.displayName);
          setUid(profile.userId);
          setName(displayName);
          setIcon(displayicon);


          const t = query(collectionGroup(db, 'tomare'), where("yoyakuUid", "==", profile.userId));
          const snapshotT = onSnapshot(t, (querySnapshot) => {
            const tomareData = querySnapshot.docs.map(
              (docT) => ({ ...docT.data() } as TomareState)
            );
            dispatch(addTomare(tomareData))
            setTomare(tomareData)
            console.log('tomare******', tomare, uid, tomare.uid);
          });
          dispatch(
            addUser({
              name: profile.displayName,
              uid: profile.userId,
              icon: profile.pictureUrl,
            })
          );
          setUid(profile.userId)
          const setRef = setDoc(
            doc(db, 'users', `${uid}`),
            {
              uid,
              name,
              icon,
              timestamp: '',
            },
            { merge: true });
          console.log(user)
        } else {
          console.log('login status : [', false, ']');
        }
      });
    // liff
    // }, [dispatch]);
  }, []);

  useLayoutEffect(() => {
    fetchTomare();
    // window.location.reload
  }, []);

  const fetchTomare = async () => {
    const q = query(collectionGroup(db, 'tomare'), where("yoyakuUid", "==", `${uid}`));
    const snapshot = onSnapshot(q, (querySnapshot) => {
      const tomareData = querySnapshot.docs.map(
        (doc) => ({ ...doc.data() } as TomareState))
      dispatch(addTomare(tomareData))
      setTomare(tomareData)
      console.log('tomare:::::', tomare, uid, pay.uid);
    });
  }

  const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID;
  const lineClick = () => {
    setUid('');
    liff.init({ liffId: LINEID as string }).then(() => {
      if (!liff.isLoggedIn()) {
        setUid('k00000');
        liff.login(); // ログインしていなければ最初にログイン
      } else if (liff.isInClient()) {
        console.log('hello world');
      }
    });
  };
  const toPageA = () => {
    router.push('./PageA');
  };
  const registA = () => {
    dispatch(addUser({ name, uid, icon }));
    toPageA()
  };

  return (
    <main>
      <button onClick={fetchTomare}>
        <img
          src={`${icon}`}
          alt=""
          style={{ borderRadius: '50%', width: '60px', height: '60px' }}
        />
      </button>
      <h1 className="mb-4 text-green-500 text-3xl">{name}さま </h1>
      <br />
      <div className="App">
        {uid === '' && (
          <div>
            <button onClick={lineClick}>
              <h4 className="mb-4 text-green-500 text-3xl">ログイン</h4>
            </button>
          </div>
        )}
        <div>
          <button onClick={registA}>
            <h3 className="mb-4 text-3xl">マイページ</h3>
          </button>
        </div>
      </div>
      <a
        href="https://konoyubi.site"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Powered by <span className={styles.logo}>konoyubi</span> */}
      </a>
      {/* </footer> */}
    </main >
  );
}
