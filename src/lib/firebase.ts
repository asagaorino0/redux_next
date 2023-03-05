import { ColorStateType } from "@/types/ColorStateType";
import { LoginUidStateType } from "@/types/LoginUidStateType";
import { TodoStateType } from "@/types/TodoStateType";
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
    alert(uid)
    await setDoc(doc(db, 'shopProf', uid), {
        shopUid: uid,///FK
        copyColorBase: color.base,
        copyColorMoji: color.moji,
        copyColorSub: color.sub,
    }, { merge: true })
}
export const setLoginUser = async (loginUid: LoginUidStateType, uid: string, name: string, icon: string | undefined) => {
    console.log(loginUid)
    await setDoc(doc(db, 'user', uid), {
        uid: uid,
        name: name,
        icon: icon,
        timestamp: serverTimestamp(),
    }, { merge: true })
}

export const setTodo = async (todo: TodoStateType, id: number) => {
    await setDoc(
        doc(db, 'todos', `${id}`), todo, { merge: true });
    console.log(todo)
}