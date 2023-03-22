import { ColorStateType } from "@/types/ColorStateType";
import { FormatDateStateType } from "@/types/FormatdateStateType";
// import { LoginUidStateType } from "@/types/LoginUidStateType";
import { TodoStateType } from "@/types/TodoStateType";
import { UserStateType } from "@/types/UserStateType";
import { initializeApp } from "@firebase/app";
import { getAuth } from '@firebase/auth';
import {
    collection,
    deleteDoc, deleteField, doc, getDocs, getFirestore, query, serverTimestamp, setDoc, updateDoc, where
} from '@firebase/firestore';
import { getStorage } from "@firebase/storage";
import { addDoc } from "firebase/firestore";

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
export const setCopyColor = async (uid: string, copy: string, pattern: string, color: ColorStateType) => {
    await setDoc(doc(db, 'shopProf', uid), {
        shopUid: uid,///FK
        copy: copy,
        pattern: pattern,
        copyColorBase: color.base,
        copyColorMoji: color.moji,
        copyColorSub: color.sub,
        timestamp: serverTimestamp(),
    }, { merge: true })
}
export const setCopyColors = async (copy: string, color: ColorStateType) => {
    await setDoc(doc(db, 'colors', `${copy}${color.base}`,), {
        id: `${copy}${color.base}`,
        chapter: copy,
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

export const setTodo = async (todo: TodoStateType, id: number) => {
    await setDoc(
        doc(db, 'todos', `${id}`), todo, { merge: true });
    console.log(todo)
}
////////////////////////////////////////////////////
export const setReservableDateToReservable = async (formatDate: FormatDateStateType, shopUid: string) => {
    await setDoc(doc(db, 'reservable', `${shopUid}`, `reservableDate`, `${formatDate.formatDate}`), {
        shopUid: `${shopUid}`,
        reservableDate: `${formatDate.formatDate}`,
        startTime: `${formatDate.formatDate}T${formatDate.start}`,
        endTime: `${formatDate.formatDate}T${formatDate.end}`,
        reservableDateId: `${formatDate.formatDate}${shopUid}`,
        updatedAt: serverTimestamp(),
    }, { merge: true })
}
export const setReservationDateToReservation = async (formatDate: FormatDateStateType, shopUid: string, uid: string) => {
    await addDoc(collection(db, 'reservation', `${shopUid}`, `${formatDate.formatDate}`), {
        shopUid,
        uid,
        startTime: formatDate.start,
        endTime: formatDate.end,
        reservationDateId: `${formatDate.formatDate}${shopUid}${uid}`,
        updatedAt: serverTimestamp(),
    },)
}
// export const setReservationDateToReservation = async (formatDate: FormatDateStateType, shopUid: string, uid: string) => {
//     await setDoc(doc(db, 'reservation', `${shopUid}`, `${formatDate.formatDate}`, `${formatDate.formatDate}${uid}`), {
//         shopUid,
//         uid,
//         startTime: formatDate.start,
//         endTime: formatDate.end,
//         reservationDateId: `${formatDate.formatDate}${shopUid}${uid}`,
//         updatedAt: serverTimestamp(),
//     }, { merge: true })
// }