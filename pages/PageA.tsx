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
        {/* <React.StrictMode>
          <Provider store={store}> */}
        <PageA_profile />
        {/* <PageAA /> */}
        <br />

      </h1>
    </div>
  );
};
export default PageA;
