import React, { useState, useEffect } from 'react';
import { addFormatdate, } from '../src/features/formatDateSlice';
import { addTomare } from '../src/features/tomareSlice';
import { addTargetTomare } from '../src/features/targetTomareSlice';
import { addTargetChat, selectTargetChat } from '../src/features/targetChatSlice';
import { addMenu } from '../src/features/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "../src/firebase";
import { getDocs, collection, collectionGroup, query, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot } from 'firebase/firestore'
import { TomareState } from "../src/types/tomare";
import { UserState } from "../src/types/user";
import { TargetTomareState } from "../src/types/targetTomare";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/Home.module.css'
import { addUser, selectUser } from '../src/features/userSlice';
import liff from '@line/liff';
import P_make from "./img/P_make.png"
import { computeSegDraggable } from '@fullcalendar/common';
import { truncate } from 'fs';
import { useRouter } from "next/router";
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import dynamic from 'next/dynamic'


const PageA_profile = () => {
    const Chat = dynamic(() => import('./srcChat'), { ssr: false });
    const PageLogin = dynamic(() => import('../src/PageLogin'), { ssr: false });
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
    const [userProfile, setUserProfile] = useState<any>([]);
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const router = useRouter();
    const [chat, setChat] = useState<any>([]);
    // const targetChat = useSelector(selectTargetChat);
    const [message, setMessage] = React.useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const q = query(collection(db, 'users'), where("uid", "==", user.uid));
            const snapshot = await getDocs(q)
            const userData = snapshot.docs.map(
                (doc) => ({ ...doc.data() } as UserState))
            console.log('userData:', userData)
            dispatch(addUser(userData))
            setUserProfile(userData)
            // console.log('menus:', user)
        }
        fetchUser()
        console.log('User:', user)
    }, []);

    const clickMenuAm = () => { setAm_pm("AM"); fetchTomare() }
    const clickMenuPm = () => { setAm_pm("PM"); fetchTomare() }
    const clickMenu1 = () => { setMake(true); fetchTargetTomare() }
    const clickMenu2 = () => { setNail(true); fetchTargetTomare() }
    const clickMenu3 = () => { setEste(true); fetchTargetTomare() }
    const clickMenu4 = () => {
        setSonota("その他")
        fetchTomare()
        fetchTargetTomare()
    }
    const clickMenu888 = () => {
        setDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}${am_pm}`), {
            make, nail, este, sonota, gappi, uid: user.uid, am_pm: am_pm, menu: am_pm, timestamp: "", tomareId: `${formatDate}${am_pm}`, yoyakuMenu: ""
        }, { merge: true })
        fetchTomare()
        fetchTargetTomare()
        setMake(false), setNail(false), setEste(false), setSonota(""), setAm_pm("")
    }
    const clickMenu9am = () => {
        deleteDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}AM`))
        fetchTomare()
        fetchTargetTomare()
        // setTargetTomare(0)
    }
    const clickMenu9pm = () => {
        deleteDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}PM`))
        fetchTomare()
        fetchTargetTomare()
        // setTargetTomare(0)
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
    const toHome = () => {
        router.push('./')
    }
    return (
        <div className={styles.main}>
            <button onClick={toHome}>
                <h3 className="mb-4 text-green-500 text-3xl">プロフィール登録内容</h3>
            </button>
            {user.uid === '' && (
                <div>
                    <button onClick={toHome}>
                        <h4 className="mb-4 text-green-500 text-3xl">ログイン</h4>
                    </button>
                </div>
            )}
            {/* <React.StrictMode >
                <Provider store={store}>
                    <PageLogin />
                </Provider>
            </React.StrictMode> */}

            {userProfile
                .map(
                    (user: any) => {
                        const img_rogo: any = { src: `${user.rogo}`, alt: "rogo", style: { width: '60px', height: '45px' } }

                        return (
                            <div key={user.uid}>
                                <img
                                    src={`${user.icon}`}
                                    alt=""
                                    style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                                />
                                <h1 className="mb-4  text-3xl">{user.name}さま </h1>
                                <br />
                                <h1>表示名（屋号）</h1>
                                <h1 className="mb-4 text-green-500 text-3xl">{user.namae} </h1>
                                <br />
                                {user.o_rogo !== 0 && <p><img {...img_rogo} /></p>}
                                <h1>エリア</h1>
                                {user.area}
                                <br />
                                <h1>メニュー</h1>
                                <div className={styles.grid}>
                                    {user.make === true && <p><img {...img_make} /></p>}
                                    {user.nail === true && <p><img {...img_nail} /></p>}
                                    {user.este === true && <p><img {...img_este} /></p>}
                                </div>
                                <br />
                                <div className={styles.grid}>
                                    {`${user.sonota}`.length !== 0 && <img {...img_sonota} />}
                                    {`${user.sonota}`.length !== 0 && <p>{user.sonota}</p>}
                                </div>
                            </div>
                        )
                    })}
            *************************************************
            <br />
            <br />


        </div>
    )
}

export default PageA_profile
