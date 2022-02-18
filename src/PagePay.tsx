import React, { useState, useEffect } from 'react';
import { addTomare } from '../src/features/tomareSlice';
import { addTargetTomare } from '../src/features/targetTomareSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "../src/firebase";
import { getDocs, collection, collectionGroup, query, orderBy, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot } from 'firebase/firestore'
import { TomareState } from "../src/types/tomare";
import { UserState } from "../src/types/user";
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/Home.module.css'
import { addUser, selectUser } from '../src/features/userSlice';
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
import CustomerAccordion from '../components/CustomerAccordion';
import PayAccordion from '../components/PayAccordion';
import liff from '@line/liff';
import P_make from "./img/P_make.png"
import { computeSegDraggable } from '@fullcalendar/common';
import { truncate } from 'fs';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import { TargetTomareState } from "../src/types/targetTomare";
import Calendar from 'react-calendar';
import { addTargetChat, selectTargetChat } from '../src/features/targetChatSlice';
import { addMenu } from '../src/features/menuSlice';
import { addFormatdate, } from '../src/features/formatDateSlice';

const PagePay = () => {
    const PageLogin = dynamic(() => import('../src/PageLogin'), { ssr: false });
    // const CustomerAccordion = dynamic(() => import('../components/CustomerAccordion'), { ssr: false }); const [make, setMake] = useState<boolean>(false);
    const [nail, setNail] = useState<boolean>(false);
    const [este, setEste] = useState<boolean>(false);
    const [sonota, setSonota] = useState<string>("");
    const [am_pm, setAm_pm] = useState<string>('');
    const [gappi, setGappi] = useState<string>('');
    const [userProfile, setUserProfile] = useState();
    // const [user, setUser] = useState();
    const user = useSelector(selectUser);
    const [tomare, setTomare] = useState<any>([]);
    const [formatDate, setFormatDate] = useState<any>([]);
    const router = useRouter();
    const dispatch = useDispatch();
    // const user = useSelector(selectUser);
    // const [rogo, setRogo] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [pay, setPay] = useState<any>([]);
    const [menus, setMenus] = useState<any>([]);
    const [yoyakuId, setYoyakuId] = useState<string>('');
    const [yoyakuIcon, setYoyakuIcon] = useState<string>('');
    const [tomareId, setTomareId] = useState<string>('');
    const [uid, setUid] = useState<string>('');
    const [chat, setChat] = useState<any>([]);
    const [message, setMessage] = React.useState('');

    useEffect(() => {
        liff
            .init({ liffId: process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID as string })
            .then(async () => {
                if (liff.isLoggedIn()) {
                    console.log('login status : [', true, ']');
                    const profile = await liff.getProfile();
                    console.log(
                        '🚀 ~ file: Login.tsx ~ line 15 ~ liff.init ~ profile',
                        profile
                    );
                    // const userId: string = profile.userId
                    const displayName: string = profile.displayName;
                    const displayicon: string | undefined = profile.pictureUrl;
                    setName(profile.displayName);
                    setUid(profile.userId);
                    setName(displayName);
                    setIcon(displayicon);
                    dispatch(
                        addUser({
                            name: profile.displayName,
                            uid: profile.userId,
                            icon: profile.pictureUrl,
                        })
                    );
                    const setRef = setDoc(
                        doc(db, 'users', `${uid}`),
                        {
                            uid,
                            name,
                            icon,
                            timestamp: '',
                        },
                        { merge: true });

                    fetchTomare(profile.userId)
                    fetchPay(uid)
                    console.log('tomare:', tomare)
                } else {
                    console.log('login status : [', false, ']');
                }
            });
    }, [dispatch]);

    // fetchUser()
    // fetchTomare()
    // console.log('User:', user)
    // console.log('tomare:', tomare)
    // }, []);

    const fetchPay = async (uid: string) => {
        const q = query(collection(db, 'yoyakuPay'), where("yoyakuUid", "==", uid));
        const snapshot = onSnapshot(q, (querySnapshot) => {
            const payData = querySnapshot.docs.map(
                (doc) => ({ ...doc.data() } as TomareState))
            console.log('payData:', payData)
            dispatch(addUser(payData))
            setPay(payData)
        });
    }

    const fetchTomare = async (uid: string) => {
        const q = query(collectionGroup(db, 'tomare'), where("yoyakuUid", "==", uid));
        const snapshot = onSnapshot(q, (querySnapshot) => {
            const tomareData = querySnapshot.docs.map(
                (doc) => ({ ...doc.data() } as TomareState))
            dispatch(addTomare(tomareData))
            setTomare(tomareData)
        });
    }
    const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID;
    const lineClick = () => {
        setUid('');
        liff.init({ liffId: LINEID as string }).then(() => {
            if (!liff.isLoggedIn()) {
                // setUid('k00000');
                liff.login(); // ログインしていなければ最初にログインする
            } else if (liff.isInClient()) {
                console.log('hello world');
            }
        });
    }; ///先生

    const date = new Date()
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth() + 1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)
    const h = ("00" + date.getHours()).slice(-2)
    const m = ("00" + date.getMinutes()).slice(-2)
    const s = ("00" + date.getSeconds()).slice(-2)
    const now = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s

    const [targetTomare, setTargetTomare] = useState<any>([])
    const img_make: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_make.png?alt=media&token=eeaf12cd-39be-4fda-8945-ec2bcb1b24dd", alt: "ケアメイク", style: { width: '60px', height: '45px' } }
    const img_nail: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_nail.png?alt=media&token=42117e21-66df-4049-a948-46840912645a", alt: "ケアネイル", style: { width: '60px', height: '45px' } }
    const img_este: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_este.png?alt=media&token=5fe75701-ec95-424a-8ba7-a547e313dd19", alt: "ケアエステ", style: { width: '60px', height: '45px' } }
    const img_sonota: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_hoka.png?alt=media&token=0d98a224-f460-4527-8208-209f6a52a55c", alt: "その他", style: { width: '60px', height: '45px' } }
    const img_icon: any = { src: targetTomare.yoyakuIcon, alt: "icon", style: { width: '60px', height: '45px' } }
    const toHome = () => { router.push('./') }
    return (
        <div className="App">
            <span>pagePay:お支払い</span>
            <br />
            {uid}
            <img
                src={icon}
                alt=""
                style={{ borderRadius: '50%', width: '60px', height: '60px' }}
            />
            <img
                src={`${icon}`}
                alt=""
                style={{ borderRadius: '50%', width: '60px', height: '60px' }}
            />
            <h1>
                <React.StrictMode>
                    <Provider store={store}>
                        <br />
                        {uid === '' && (
                            <div>
                                <button onClick={lineClick}>
                                    <h4 className="mb-4 text-green-500 text-3xl">ログイン</h4>
                                </button>
                            </div>
                        )}
                        <br />
                        {pay
                            .map((pay: TomareState) => {
                                return (
                                    <div key={pay.tomareId}>
                                        {/* {`${tomare.yoyakuMenu}` !== "" && */}
                                        <div className={styles.grid}>
                                            <PayAccordion pay={pay} key={pay.tomareId} />
                                        </div>
                                        {/* } */}
                                    </div>
                                )
                            })}
                        <br />
                        <br />
                        *************************************************
                        <br />
                        {
                            tomare
                                .map((tomare: TomareState) => {
                                    return (
                                        <div key={tomare.tomareId}>
                                            {`${tomare.yoyakuMenu}` !== "" &&
                                                <div className={styles.grid}>
                                                    <CustomerAccordion tomare={tomare} key={tomare.tomareId} />
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                        }
                    </Provider>
                </React.StrictMode>
            </h1>
        </div>
    );
};
export default PagePay;

