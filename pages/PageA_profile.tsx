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
import TomareAccordion from '../components/TomareAccordion';

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

const PageA_profile = () => {
    const Chat = dynamic(() => import('./srcChat'), { ssr: false });
    const PageLogin = dynamic(() => import('../src/PageLogin'), { ssr: false });
    const [make, setMake] = useState<boolean>(false);
    const [nail, setNail] = useState<boolean>(false);
    const [este, setEste] = useState<boolean>(false);
    const [sonota, setSonota] = useState<string>("");
    const [am_pm, setAm_pm] = useState<string>('');
    const [gappi, setGappi] = useState<string>('');
    const [userProfile, setUserProfile] = useState<any>([]);
    const [tomare, setTomare] = useState<any>([]);
    const [formatDate, setFormatDate] = useState<any>([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    // const [rogo, setRogo] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [menus, setMenus] = useState<any>([]);
    const [yoyakuId, setYoyakuId] = useState<string>('');
    const [yoyakuIcon, setYoyakuIcon] = useState<string>('');
    const [tomareId, setTomareId] = useState<string>('');
    const [uid, setUid] = useState<string>('');
    const [chat, setChat] = useState<any>([]);
    const [message, setMessage] = React.useState('');
    // const targetChat = useSelector(selectTargetChat);
    useEffect(() => {
        const fetchUser = async () => {
            const q = query(collection(db, 'users'), where("uid", "==", user.uid));
            const snapshot = await getDocs(q)
            const userData = snapshot.docs.map(
                (doc) => ({ ...doc.data() } as UserState))
            console.log('userData:', userData)
            dispatch(addUser(userData))
            setUserProfile(userData)
        }
        fetchUser()
        fetchTomare()
        console.log('User:', user)
        console.log('tomare:', tomare)
    }, []);
    const clickMenu4 = () => {
        setSonota("その他")
        fetchTomare()
        // fetchTargetTomare()
    }
    const fetchTomare = async () => {
        const q = query(collection(db, "users", user.uid, 'tomare'), where("uid", "==", user.uid));
        // const q = query(collection(db, "users", user.uid, 'tomare'), where("uid", "==", user.uid), orderBy("gappi"));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState))
        dispatch(addTomare(tomareData))
        setTomare(tomareData)
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
    const toHome = () => { router.push('./') }
    // const [text, setText] = useState<string>('');
    // const sendLine = async () => {
    //     const response = await fetch(`https://redux-next.vercel.app/api/${text}`);
    //     // const response = await fetch(`http://localhost:3000/api/${text}`);
    //     const data = await response.json();
    //     console.log('🚀 ~ file: index.tsx ~ line 11 ~ sendLine ~ data', data);
    // }

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
            <div className={styles.container}>
                {/* <h1>LINE message送信</h1>
                <br />
                <input type="text" onChange={(e) => setText(e.target.value)} />
                <button onClick={sendLine}>送信</button> */}
                {/* <input type="file" name="example" onChange={(e) => setLogo(e.target.value)} /> */}

            </div>
            {userProfile
                .map(
                    (user: any) => {
                        const toPageA_zisseki = () => {
                            router.push('./PageA_zisseki');
                        };
                        const registA_zisseki = () => {
                            dispatch(addUser(user));
                            toPageA_zisseki()
                        };
                        const [logo, setLogo] = useState<string>(user.rogo);
                        const handleFile = (e: any) => {
                            setLogo(e.target.value);
                            // setChecked([event.target.checked, checked[1]]);
                            console.log(e.target.value)
                            setDoc(doc(db, 'users', `${user.uid}`), {
                                logo: e.target.value,
                            }, { merge: true })
                        };
                        const img_rogo: any = { src: `${user.rogo}`, alt: "rogo", style: { height: '60px' } }
                        const img_img: any = { src: `${user.img}`, alt: "img", style: { width: '100%' } }
                        return (
                            <div key={user.uid}>
                                <input type="file" name="logo" onChange={handleFile} />
                                {`${user.rogo}` &&
                                    <img
                                        src={logo}
                                        alt=""
                                        style={{ width: '80px', height: '80px' }}
                                    />
                                }

                                <div className={styles.grid}>
                                    <img
                                        src={`${user.icon}`}
                                        alt=""
                                        style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                                    />
                                    <h1 className="mb-4  text-3xl">{user.name}さま </h1>
                                </div>
                                <br />
                                <div className={styles.grid}>
                                    {user.o_rogo !== 0 && <p><img {...img_rogo} /></p>}
                                    <div>
                                        <h1>表示名（屋号）</h1>
                                        <h1 className="mb-4 text-green-500 text-3xl">{user.namae} </h1>
                                    </div>
                                </div>

                                {user.o_copy !== 0 && <h1 className="mb-4  text-3xl">{user.copy} </h1>}
                                <div className={styles.grid}>
                                    {user.o_img !== 0 && <p><a href={user.url}><img {...img_img} /></a></p>}
                                </div>
                                <br />
                                {user.o_url !== 0 && <a href={user.url}>{user.url}</a>}
                                <br />

                                <h1 className="mb-4  text-3xl">主な活動地域：{user.area}</h1>
                                <br />
                                <h1>メニュー</h1>
                                <div className={styles.grid}>
                                    {user.make === true && <p><img {...img_make} /></p>}
                                    {user.nail === true && <p><img {...img_nail} /></p>}
                                    {user.este === true && <p><img {...img_este} /></p>}
                                    {`${user.sonota}`.length !== 0 && <img {...img_sonota} />}
                                    {`${user.sonota}`.length !== 0 && <p>{user.sonota}</p>}
                                </div>
                                {user.o_sikaku !== 0 && <h1 >{user.sikaku} </h1>}
                                <br />
                                <button onClick={registA_zisseki}>
                                    <h3 className="mb-4 text-green-500 text-3xl">施術実績はこちら</h3>
                                </button>

                                *************************************************
                                <br />
                                {
                                    tomare
                                        .map((tomare: TomareState) => {
                                            return (
                                                <div key={tomare.tomareId}>
                                                    {`${tomare.yoyakuMenu}` !== "" &&
                                                        <div className={styles.grid}>
                                                            <TomareAccordion tomare={tomare} key={tomare.tomareId} />
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        )
                    })
            }
            <br />
        </div>

    )
}
export default PageA_profile
