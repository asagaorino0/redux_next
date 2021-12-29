"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = exports.db = exports.firebaseAuth = exports.app = void 0;
require("firebase/compat/auth");
require("firebase/compat/firestore");
const auth_1 = require("firebase/auth");
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
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
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
};
exports.firebaseConfig = firebaseConfig;
const app = app_1.getApps;
exports.app = app;
if (!app.length) {
    (0, app_1.initializeApp)(firebaseConfig);
}
// console.log('firebase', firebaseConfig)
const db = (0, firestore_1.getFirestore)();
exports.db = db;
const firebaseAuth = (0, auth_1.getAuth)();
exports.firebaseAuth = firebaseAuth;
//# sourceMappingURL=firebase.js.map