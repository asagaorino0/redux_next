import { ColorStateType } from "@/types/ColorStateType";
import { LoginUidStateType } from "@/types/LoginUidStateType";
import { UserStateType } from "@/types/UserStateType";
import { initializeApp } from "@firebase/app";
import { getAuth } from '@firebase/auth';
import {
    collection,
    deleteDoc, deleteField, doc, getDocs, getFirestore, query, serverTimestamp, setDoc, updateDoc, where
} from '@firebase/firestore';
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DBURL,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig)
const storage = getStorage();
const db = getFirestore()
const firebaseAuth = getAuth()

export { app, firebaseAuth, db, firebaseConfig, storage };

/////キャッチコピーの配色を設定する////
export const setCopyColor = async (uid: string, color: ColorStateType) => {
    await setDoc(doc(db, 'shopProf', uid), {
        shopUid: uid,///FK
        copyColorBase: color.base,
        copyColorMoji: color.moji,
        copyColorSub: color.sub,
        timestamp: serverTimestamp(),
    }, { merge: true })
}
export const setCopyColors = async (uid: string, color: ColorStateType) => {
    await setDoc(doc(db, 'colors', `service${color.base}`,), {
        chapter: "service",
        copyColorBase: color.base,
        copyColorMoji: color.moji,
        copyColorSub: color.sub,
        timestamp: serverTimestamp(),
    }, { merge: true })
}
export const setLoginUser = async (user: UserStateType, uid: string, name: string, icon: string | undefined) => {
    console.log(user)
    await setDoc(doc(db, 'user', uid), {
        uid: uid,
        name: name,
        icon: icon,
        timestamp: serverTimestamp(),
    }, { merge: true })
}
