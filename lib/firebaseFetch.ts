import { ColorStateType } from "@/types/ColorStateType";
import { FormatDateStateType } from "@/types/FormatdateStateType";
import { ReservableDateStateType } from "@/types/ReservableDateStateType";
import { UserStateType } from "@/types/UserStateType";

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {
    collection,
    collectionGroup, getDocs, getFirestore, orderBy, query, where
} from 'firebase/firestore';
import { getStorage } from "firebase/storage";


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

////Login/DaCalendarBox/////
export const fetchUser = (userUid: string) => {
    // console.log(userUid)
    const p = query(
        collection(db, 'user'),
        where('uid', '==', userUid)
    );
    return new Promise(async (resolve, reject) => {
        try {
            const snapshot = await getDocs(p);
            const userData = snapshot.docs.map(
                (doc) => (doc.data() as UserStateType)
            );
            // console.log('userDate:::::', userData)
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}
export const fetchUsers = () => {
    // console.log(userUid)
    const p = query(
        collection(db, 'user'),
    );
    return new Promise(async (resolve, reject) => {
        try {
            const snapshot = await getDocs(p);
            const userData = snapshot.docs.map(
                (doc) => (doc.data() as UserStateType)
            );
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}
export const fetchReservableFav = async (shopUid: string) => {
    const q = query(collectionGroup(db, 'reservableDate'),
        where('shopUid', '==', shopUid),
    );
    return new Promise(async (resolve, reject) => {
        try {
            const snapshot = await getDocs(q)
            const reservableData = snapshot.docs.map(
                (doc) => ({ ...doc.data() } as ReservableDateStateType)
            );
            resolve(reservableData)
        } catch (e) {
            reject(e)
        }
    })
}
export const fetchReservable = async () => {
    // const q = query(collection(db, 'reservable'),//////データをfetchしてくれない
    const q = query(collectionGroup(db, 'reservableDate'),
    );
    return new Promise(async (resolve, reject) => {
        try {
            const snapshot = await getDocs(q)
            const reservableData = snapshot.docs.map(
                (doc) => ({ ...doc.data() } as ReservableDateStateType)
            );
            resolve(reservableData)
        } catch (e) {
            reject(e)
        }
    })
}
export const fetchReservationTimeList = (formatDate: FormatDateStateType, shopUid: string) => {
    const p = query(
        collection(db, 'reservation', `${shopUid}`, `${formatDate.formatDate}`),
        // where('shopUid', '==', shopUid),
        // where('reservationDate', '==', `${formatDate.formatDate}`),
    );
    return new Promise(async (resolve, reject) => {
        try {
            const snapshot = await getDocs(p);
            const colorData = snapshot.docs.map(
                (doc) => ({ ...doc.data() } as FormatDateStateType)
            );
            resolve(colorData)
        } catch (e) {
            reject(e)
        }
    })
}
export const fetchColorList = () => {
    const p = query(
        collection(db, 'colors'),
        // where('chapter', '==', "service"),
        orderBy("timestamp", "asc"),
    );
    return new Promise(async (resolve, reject) => {
        try {
            const snapshot = await getDocs(p);
            const colorData = snapshot.docs.map(
                (doc) => ({ ...doc.data() } as unknown as number)
            );
            resolve(colorData)
        } catch (e) {
            reject(e)
        }
    })
}
export const fetchSubColorList = (color: ColorStateType) => {
    const p = query(
        collection(db, 'colors'),
        // where('chapter', '==', "modern"),
        where('copyColorBase', '==', `${color.base}`),
    );
    return new Promise(async (resolve, reject) => {
        try {
            const snapshot = await getDocs(p);
            const colorData = snapshot.docs.map(
                (doc) => ({ ...doc.data() } as unknown as number)
            );
            resolve(colorData)
        } catch (e) {
            reject(e)
        }
    })
}

