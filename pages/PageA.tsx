import React, { useState, useCallback } from "react";
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { storage } from "../src/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage";
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';
import FileUpload from '../components/FileUpload';
const PageA = () => {
  const PageLogin = dynamic(() => import('../src/PageLogin'), { ssr: false });
  const PageAA = dynamic(() => import('../src/PageAA'), { ssr: false });
  const PageA_profile = dynamic(() => import('./PageA_profile'), { ssr: false });
  const user = useSelector(selectUser);
  const router = useRouter()
  const filename =
    'https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/konoyubi.jpg?alt=media&token=99cf4f45-ea84-45cd-af83-0052a86f04adhttps://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/konoyubi.jpg?alt=media&token=99cf4f45-ea84-45cd-af83-0052a86f04ad';
  const detectText = async (fileName: any) => {
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach((text: any) => {
      console.log(text);
    });
  };
  const toPagePey = () => {
    router.push('./PagePey')
  }
  // // id tokenの有効性を検証する
  // const response = async fetch('https://api.line.me/oauth2/v2.1/verify', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: `id_token=${idToken}&client_id=${process.env.CHANNEL_SECRET!}`,
  // });
  // const data = await res.json();
  // if (response.status !== 200) {
  //     // IDトークンが有効ではない場合
  //     res.status(400).send(data.error);
  //     return;
  // }
  // res.json({ message: "Hello world" })
  const uid = `${user.uid}`
  return (
    <div className="App">
      <span>pageA:プロフィール登録</span>
      <br />
      {user.uid}
      <button onClick={toPagePey}>PagePey </button>
      <h1>
        <React.StrictMode>
          <Provider store={store}>
            {/* <PageA_profile /> */}
            {/* <PageAA /> */}
            <br />
            <form action={`/api/checkout/${uid}/card`} method="POST">
              <section>
                <h2>お客さまメニュー</h2>
                <button type="submit" role="link" className={styles.card} >
                  クレジットカードの登録
                </button>
              </section>
            </form>
            <form action={`/api/checkout/${uid}/setup`} method="POST">
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

            <button onClick={detectText}>quickstart</button>            {/* } */}
          </Provider>
        </React.StrictMode>
      </h1>
    </div>
  );
};
export default PageA;
