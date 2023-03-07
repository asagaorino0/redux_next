import { ColorStateType } from "@/types/ColorStateType";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {
    collection,
    collectionGroup, getDocs, getFirestore, orderBy, query, where
} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { UserStateType } from '../types/UserStateType';

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
        collection(db, 'users'),
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
export const fetchShopProf = (uid: string) => {
    const p = query(
        collection(db, 'shopProf'),
        where('shopUid', '==', uid),
        // orderBy("timestamp", "asc"),
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
export const fetchColorList = (copy: string) => {
    const p = query(
        collection(db, 'colors'),
        where('chapter', '==', copy),
        orderBy("timestamp", "asc"),
    );
    return new Promise(async (resolve, reject) => {
        try {
            const snapshot = await getDocs(p);
            const colorData = snapshot.docs.map(
                (doc) => ({ ...doc.data() })
            );
            resolve(colorData)
        } catch (e) {
            reject(e)
        }
    })
}
export const fetchSubColorList = (copy: string, color: ColorStateType) => {
    const p = query(
        collection(db, 'colors'),
        where('chapter', '==', copy),
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

export const fetchColorAll = () => {
    const p = query(
        collection(db, 'colors'),
        // where('chapter', '==', copy),
        orderBy("timestamp", "asc"),
    );
    return new Promise(async (resolve, reject) => {
        try {
            const snapshot = await getDocs(p);
            const colorData = snapshot.docs.map(
                (doc) => ({ ...doc.data() })
            );
            resolve(colorData)
        } catch (e) {
            reject(e)
        }
    })
}
export const fetchSubColorAll = (color: ColorStateType) => {
    const p = query(
        collection(db, 'colors'),
        // where('chapter', '==', copy),
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