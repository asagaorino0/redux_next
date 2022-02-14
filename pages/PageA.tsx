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
  const PageLogin = dynamic(() => import('../src/PageLogin'), { ssr: false });
  const PageAA = dynamic(() => import('../src/PageAA'), { ssr: false });
  const PageA_profile = dynamic(() => import('./PageA_profile'), { ssr: false });
  const user = useSelector(selectUser);
  const router = useRouter()
  const [menus, setMenus] = useState<any>([]);
  const [tomare, setTomare] = useState<any>([]);
  const dispatch = useDispatch();
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
    <div className="App">
      <span>pageA:プロフィール登録</span>
      <br />
      {user.uid}
      <button onClick={toPagePey}>PagePey </button>
      <h1>
        {/* <React.StrictMode>
          <Provider store={store}> */}
        {/* <PageA_profile /> */}
        {/* <PageAA /> */}
        <br />

      </h1>
    </div>
  );
};
export default PageA;
