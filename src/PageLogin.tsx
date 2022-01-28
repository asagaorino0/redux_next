import React, { useState, useEffect } from 'react';
// import { addFormatdate, } from './features/formatDateSlice';
import { addTomare } from './features/tomareSlice';
import { addTargetTomare } from './features/targetTomareSlice';
// import { addTargetChat, selectTargetChat } from './features/targetChatSlice';
import { addMenu } from './features/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "./firebase";
import { getDocs, collection, collectionGroup, query, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot } from 'firebase/firestore'
import { TomareState } from "./types/tomare";
// import { TargetTomareState } from "./types/targetTomare";
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/Home.module.css'
import { addUser, selectUser } from '../src/features/userSlice';
import liff from '@line/liff';
// import P_make from "./img/P_make.png"
// import { computeSegDraggable } from '@fullcalendar/common';
// import { truncate } from 'fs';
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
// import Chat from './chat'

const PageLogin = () => {
    const Chat = dynamic(() => import('../pages/srcChat'), { ssr: false });
    const [menus, setMenus] = useState<any>([]);
    const [make, setMake] = useState<boolean>(false);
    const [nail, setNail] = useState<boolean>(false);
    const [este, setEste] = useState<boolean>(false);
    const [sonota, setSonota] = useState<string>("");
    const [gappi, setGappi] = useState<string>('');
    const [am_pm, setAm_pm] = useState<string>('');
    const [yoyakuId, setYoyakuId] = useState<string>('');
    const [yoyakuIcon, setYoyakuIcon] = useState<string>('');
    const [tomareId, setTomareId] = useState<string>('');
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [tomare, setTomare] = useState<any>([]);
    const [formatDate, setFormatDate] = useState<any>([]);
    const [uid, setUid] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const router = useRouter();
    const [chat, setChat] = useState<any>([]);
    // const targetChat = useSelector(selectTargetChat);
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
                } else {
                    console.log('login status : [', false, ']');
                }
            });
        // }, []);
    }, [dispatch]);

    const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID;
    const lineClick = () => {
        setUid('');
        liff.init({ liffId: LINEID as string }).then(() => {
            if (!liff.isLoggedIn()) {
                setUid('k00000');
                liff.login(); // ログインしていなければ最初にログインする
            } else if (liff.isInClient()) {
                console.log('hello world');
            }
        });
    };

    useEffect(() => {
        const fetchMenus = async () => {
            const q = query(collection(db, 'users'), where("uid", "==", user.uid));
            const snapshot = await getDocs(q)
            const menuData = snapshot.docs.map(
                (doc: any) => ({ ...doc.data().menu }))
            console.log('usersData:', menuData)
            dispatch(addMenu(menuData))
            setMenus(menuData)
            console.log('menus:', menus)
        }
        fetchMenus()
        console.log('menus:', menus)
    }, []);

    useEffect(() => {
        fetchTomare()
        // console.log('tomare:', tomare)
        fetchChat(yoyakuId)
    }, []);

    const fetchChat = async (yoyakuId: string) => {
        console.log('targetChat:', targetTomare);
        const q = query(collectionGroup(db, 'chat'), where("yoyakuId", "==", `${yoyakuId}`));
        const snapshot = onSnapshot(q, (querySnapshot) => {
            setChat(
                querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            console.log('chat:', chat);
        });
        return snapshot;
    };
    const handleCreate = async () => {
        console.log(`${tomareId}`)
        setDoc(doc(db, 'users', user.uid, 'tomare', `${tomareId}`, 'chat', now), {
            message: `${message}`, timestamp: now, yoyakuId: yoyakuId, yoyakuIcon: `${user.icon}`
        })
        fetchChat(yoyakuId),
            setMessage("");
    }

    const fetchTomare = async () => {
        const q = query(collectionGroup(db, 'tomare'));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState))
        dispatch(addTomare(tomareData))
        setTomare(tomareData)
    }
    const fetchTargetTomare = async () => {
        const q = query(collection(db, "users", user.uid, 'tomare'), where("gappi", "==", formatDate));
        const snapshot = await getDocs(q)
        const tomareLength = snapshot.docs.length
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        console.log(`targetTomareLength`, tomareLength)
    }
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
    return (
        <div className={styles.main}>
            {user.uid === '' && (
                <div>
                    <button onClick={lineClick}>
                        <h4 className="mb-4 text-green-500 text-3xl">ログイン</h4>
                    </button>
                </div>
            )}
            <img
                src={`${user.icon}`}
                alt=""
                style={{ borderRadius: '50%', width: '60px', height: '60px' }}
            />
            <h1 className="mb-4 text-green-500 text-3xl">{user.name}さま </h1>

            ******************************************************


        </div>
    )
}

export default PageLogin
