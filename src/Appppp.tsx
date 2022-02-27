import React, { useState, useEffect } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { UserState } from './types/user';
import { addTomare } from './features/tomareSlice';
import Link from 'next/link';
import 'firebase/compat/firestore';
// import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase';
import dynamic from 'next/dynamic';
import {
  getDocs,
  collection,
  collectionGroup,
  query,
  orderBy,
  where,
  doc,
  setDoc,
  serverTimestamp,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { TomareState } from './types/tomare';
// import CustomerAccordion from '../components/CustomerAccordion';
import styles from '../styles/Home.module.css';
import PayAccordion from '../components/PayAccordion';
import MiPayAccordion from '../components/MiPayAccordion';
import { Provider } from 'react-redux';
import { store } from './app/store';

export default function Appppp() {
  const [uid, setUid] = useState<string>('Uda1c6a4e5b348c5ba3c95de639e32414');
  const [name, setName] = useState<string>('eriko orino');
  const [icon, setIcon] = useState<string | undefined>('');
  const [tomare, setTomare] = useState<any>([]);
  const [payment, setPayment] = useState<any>([]);
  const [pay, setPay] = useState<any>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const q = query(
        collection(db, 'users', uid, 'tomare'),
        where('yoyakuUid', '==', uid)
      );
      const snapshot = await getDocs(q);
      const tomareData = snapshot.docs.map(
        (doc: any) => ({ ...doc.data() } as TomareState)
      );
      console.log('payData_profile.userId:', tomareData);
      // dispatch(addUser(payData))
      setTomare(tomareData);

      const p = query(collection(db, 'yoyakuPay'), where('uid', '==', uid));
      const payData = snapshot.docs.map(
        (doc: any) => ({ ...doc.data() } as TomareState)
      );
      console.log('payData_profile.userId:', payData);
      console.log('payData:', payData);
      dispatch(addUser(payData));
      setPay(payData);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetchPay();
    fetchTomare();
    console.log('pey:', pay);
  }, []);

  const fetchPay = async () => {
    const p = query(collection(db, 'yoyakuPay'), where('uid', '==', uid));
    const snapshot = onSnapshot(p, (querySnapshot) => {
      const payData = querySnapshot.docs.map(
        (docP) => ({ ...docP.data() } as TomareState)
      );
      console.log('payData:', payData);
      dispatch(addUser(payData));
      setPay(payData);
    });
  };
  const fetchTomare = async () => {
    console.log('useEffect:::', `${uid}`);
    const q = query(
      collectionGroup(db, 'tomare'),
      where('yoyakuUid', '==', uid)
    );
    const snapshot = onSnapshot(q, (querySnapshot) => {
      const tomareData = querySnapshot.docs.map(
        (doc) => ({ ...doc.data() } as TomareState)
      );
      console.log('tomareData:', tomareData);
      dispatch(addTomare(tomareData));
      setTomare(tomareData);
    });
  };

  const toPageA = () => {
    router.push('./PageA');
  };
  const toPageB = () => {
    router.push('./PageB');
  };
  const toPageC = () => {
    router.push('./PageC');
  };
  const toPagePay = () => {
    router.push('./PagePay');
  };
  const registA = () => {
    dispatch(addUser({ name, uid, icon }));
    toPageA();
  };
  const registB = () => {
    dispatch(addUser({ name, uid, icon }));
    toPageB();
  };
  const registC = () => {
    dispatch(addUser({ name, uid, icon }));
    toPageC();
  };
  const registPay = () => {
    dispatch(addUser({ name, uid, icon }));
    toPagePay();
  };

  return (
    <main>
      <div>
        <button onClick={fetchPay}>
          <img
            src={`${icon}`}
            alt=""
            style={{ borderRadius: '50%', width: '60px', height: '60px' }}
          />
        </button>
        <h1 className="mb-4 text-green-500 text-3xl">{name}さま </h1>
        <br />

        {`${pay}`.length !== 0 && <h1>次の支払いを完了させてください</h1>}
        <React.StrictMode>
          <Provider store={store}>
            <br />
            {pay.map((pay: TomareState) => {
              console.log(pay.paymentIntent);
              return (
                <div key={pay.yoyakuId}>
                  <div className={styles.grid}>
                    <PayAccordion pay={pay} key={pay.yoyakuId} />
                  </div>
                </div>
              );
            })}
          </Provider>
        </React.StrictMode>
      </div>
      <br />
      {`${pay}`.length === 0 && (
        <div>
          {`${tomare}`.length !== 0 && <h1>未払い</h1>}
          <React.StrictMode>
            <Provider store={store}>
              <br />
              {tomare.map((tomare: TomareState) => {
                return (
                  <div key={tomare.tomareId}>
                    {/* {`${tomare.yoyakuMenu}` !== "" && */}
                    <div className={styles.grid}>
                      <MiPayAccordion pay={tomare} key={tomare.tomareId} />
                    </div>
                    {/* } */}
                  </div>
                );
              })}
            </Provider>
          </React.StrictMode>
        </div>
      )}
      <br />
      <div className="App">
        {uid === '' && (
          <div>
            <button>
              <h4 className="mb-4 text-green-500 text-3xl">ログイン</h4>
            </button>
          </div>
        )}
        {`${pay}`.length === 0 && (
          <div>
            <button onClick={registA}>
              <h3 className="mb-4 text-green-500 text-3xl">マイページ</h3>
            </button>

            <button onClick={registPay}>
              <h3 className="mb-4 text-green-500 text-3xl">履歴</h3>
            </button>

            <button onClick={registC}>
              <h3 className="mb-4 text-green-500 text-3xl">予約枠設定</h3>
            </button>

            <h3 className="mb-4  text-3xl">施術申込み</h3>
            <button onClick={registB}>
              <h3 className="mb-4 text-green-500 text-3xl">個人で申し込む</h3>
            </button>

            <button onClick={registB}>
              <h3 className="mb-4 text-green-500 text-3xl">施設で申し込む</h3>
            </button>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <a
          href="https://konoyubi.site"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className={styles.logo}>konoyubi</span>
        </a>
      </footer>
    </main>
  );
}
