import React, { useState, useEffect } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp, getApps } from "firebase/app"
import { getFirestore, collection, addDoc, doc, setDoc, Timestamp } from 'firebase/firestore'
// import { app } from "../firebase"
// import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore'
// import { initializeFirestore } from 'firebase/firestore'
// import { getFirestore } from "firebase/firestore"
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { getAuth, signInWithRedirect, signOut, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID
};

const app = getApps
if (!app.length) {
    initializeApp(firebaseConfig)
}
console.log('firebase', firebaseConfig)

const db = getFirestore()
const firebaseAuth = getAuth()
export { app, firebaseAuth, db, firebaseConfig }
