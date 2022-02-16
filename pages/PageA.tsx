import React, { useState, useEffect } from "react";
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { TomareState } from "../src/types/tomare";
import { addTomare } from '../src/features/tomareSlice';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { storage } from "../src/firebase";
import { db } from "../src/firebase";
import { getDocs, collection, collectionGroup, query, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot } from 'firebase/firestore'
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';
import FileUpload from '../components/FileUpload';
const PageA = () => {
  const PagePey = dynamic(() => import('./PagePey'), { ssr: false });
  const PageAA = dynamic(() => import('../src/PageAA'), { ssr: false });
  const PageA_profile = dynamic(() => import('./PageA_profile'), { ssr: false });
  const user = useSelector(selectUser);
  const router = useRouter()
  const [menus, setMenus] = useState<any>([]);
  const [tomare, setTomare] = useState<any>([]);
  const dispatch = useDispatch();
  const toHome = () => { router.push('./') }
  const toPagePey = () => {
    router.push('./PagePey')
  }
  useEffect(() => {
    const fetchMenus = async () => {
      const q = query(collection(db, 'users'), where("uid", "==", user.uid));
      const snapshot = await getDocs(q)
      const menuData = snapshot.docs.map(
        (doc: any) => ({ ...doc.data().menu }))
      console.log('usersData:', menuData)
      // dispatch(addMenu(menuData))
      setMenus(menuData)
      console.log('menus:', menus)
    }
    fetchMenus()
    console.log('menus:', menus)
  }, []);

  useEffect(() => {
    fetchTomare()
    console.log('tomare:', tomare)
    // fetchChat(yoyakuId)
  }, []);
  const fetchTomare = async () => {
    const q = query(collectionGroup(db, 'tomare'));
    const snapshot = await getDocs(q)
    const tomareData = snapshot.docs.map(
      (docT: any) => ({ ...docT.data() } as TomareState))
    dispatch(addTomare(tomareData))
    setTomare(tomareData)
  }
  const uid = `${user.uid}`
  return (
    // <div className="App">
    <div className={styles.main}>
      <button onClick={toHome}>
        <h3 className="mb-4 text-green-500 text-3xl">施術履歴</h3>
      </button>
      {user.uid === '' && (
        <div>
          <button onClick={toHome}>
            <h4 className="mb-4 text-green-500 text-3xl">ログイン</h4>
          </button>
        </div>
      )}
      <br />
      {/* {user.uid}
      <button onClick={toPagePey}>PagePey </button> */}
      <h1>
        {/* <React.StrictMode>
          <Provider store={store}> */}
        {/* <PageA_profile /> */}
        {/* <PagePey /> */}
        <br />
        <form action={`/api/checkin/${uid}/card`} method="POST">
          <section>
            <h2>お客さまメニュー</h2>
            <button type="submit" role="link" className={styles.card} >
              クレジットカードの登録
            </button>
          </section>
        </form>
        <form action={`/api/checkin/${uid}/setup`} method="POST">
          <section>
            {/* <h2>お客さまメニュー</h2> */}
            <button type="submit" role="link" className={styles.card} >
              300
            </button>
          </section>
        </form>
        {/* <form action={`https://buy.stripe.com/test_dR628mfhs1ZLaGIaEE`} method="POST"> */}
        <section>
          {/* <h2>お客さまメニュー</h2> */}
          <button type="submit" role="link" className={styles.card} >
            <a href="https://buy.stripe.com/test_dR628mfhs1ZLaGIaEE" >
              サブスク
            </a>
          </button>
        </section>
        {/* </form> */}
        <form action={`/component/CheckoutForm`} method="POST">
          <section>
            <button type="submit" role="link">
              Checkout:buy
            </button>
          </section>
        </form>
        <form action="/api/checkout_payment" method="POST">
          <section>
            <button type="submit" role="link">
              Checkout:pey
            </button>
          </section>
        </form>
        <form action="/api/checkout_sessions" method="POST">
          <section>
            <button type="submit" role="link">
              Checkout
            </button>
          </section>
        </form>
        <form action='/api/create-connect-account' method="POST">
          <section>
            <h2>店舗メニュー</h2>
            <button type="submit" role="link" className={styles.card} >
              銀行口座を登録する
            </button>
          </section>
        </form>
        <br />
        <br />
      </h1>
    </div>
  );
};
export default PageA;

