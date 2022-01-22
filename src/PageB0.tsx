import React, { useState, useEffect } from 'react';
import { addFormatdate, } from './features/formatDateSlice';
import { addTomare } from './features/tomareSlice';
import { addTargetTomare } from './features/targetTomareSlice';
import { addTarget, selectTarget } from './features/targetSlice';
import { addUsers, selectUsers, } from './features/usersSlice';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "./firebase";
import { getFirestore, getDocs, collection, collectionGroup, query, where, onSnapshot, doc, setDoc, Timestamp, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { TomareState } from "./types/tomare";
import { TargetTomareState } from "./types/targetTomare";
import { TargetState } from "./types/target";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { setUncaughtExceptionCaptureCallback } from 'process';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import { devNull } from 'os';
import liff from '@line/liff';


const PageB0 = () => {
    const [users, setUsers] = useState<any>([]);
    const [uid, setUid] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [area, setArea] = useState<string>("未登録");
    const [namae, setNamae] = useState<string>("");
    const [gappi, setGappi] = useState<string>('');
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const router = useRouter();
    const [tomare, setTomare] = useState<any>([]);
    const [target, setTarget] = useState<string>("");
    const [targetTomare, setTargetTomare] = useState<any>([])
    // const users = useSelector(selectUsers).users;

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
    const registYoyaku = () => {
        // const addRef = addDoc(collection(db, 'yoyaku', `${user.uid}`, 'ukeru', `${gappi}oo`), {
        //     sei,
        //     menu,
        //     uid: `${user.uid}`,
        //     namae: namae,
        //     tokoro,
        //     ukeruId: `${gappi}oo`,
        //     timestamp"",
        // })
        const setRef = setDoc(doc(db, 'users', `${user.uid}`, 'tomare', `${gappi}oo`), {
            gappi,
            uid: `${user.uid}`,
            namae: namae,
            timestamp: "",
        }, { merge: true }//←上書きされないおまじない
        )
        alert('登録しました。オファーを楽しみにお待ちください。')
    };

    useEffect(() => {
        // let users: any = []
        const fetchUsers = async () => {
            const q = query(collection(db, 'users'), where("uid", "==", user.uid));
            const snapshot = await getDocs(q)
            const usersData = snapshot.docs.map(
                (doc: any) => ({ ...doc.data().menu }))
            console.log('usersData:', usersData)
            dispatch(addUsers(usersData))
            setUsers(usersData)
            console.log('users:', users)
        }
        fetchUsers()
        console.log('users:', users)
    }, []);

    useEffect(() => {
        fetchTomare()
        console.log('tomare:', tomare)
    }, []);

    const getTileContent = (props: any) => {
        let year = props.date.getFullYear();
        let month = props.date.getMonth() + 1;
        let day = props.date.getDate();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        const formatDate = year + month + day;
        if (props.view !== "month") {
            return null;
        }
        return (
            <div >
                {
                    tomare
                        .map((data: any) => {
                            if (formatDate === data.gappi) {
                                return (
                                    <div key={data.id}>
                                        <div>
                                            {data.menu}
                                        </div>
                                    </div>
                                )
                            }
                        })}
                <div />
            </div>
        );
    };

    const clickDay = async (calendar: any) => {
        console.log('tomare:', tomare.uid)
        let year = calendar.getFullYear();
        let month = calendar.getMonth() + 1;
        let day = calendar.getDate();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        const formatDate = year + month + day;
        dispatch(addFormatdate(year + month + day))
        const q = query(collectionGroup(db, 'tomare'), where("gappi", "==", formatDate));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TargetTomareState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        toPageD();
    };
    const toPageD = () => {
        router.push('./PageD');
    };
    const toPageM = () => {
        router.push('./PageM');
    };

    const fetchTomare = async () => {
        const q = query(collectionGroup(db, 'tomare'));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState))
        dispatch(addTomare(tomareData))
        setTomare(tomareData)
    }
    const fetchTargetMake = async () => {
        const q = query(collectionGroup(db, 'tomare'), where("make", "==", true));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TargetTomareState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        toPageM()
    }
    const fetchTargetNail = async () => {
        const q = query(collectionGroup(db, 'tomare'), where("nail", "==", true));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TargetTomareState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        toPageM()
    }
    const fetchTargetEste = async () => {
        const q = query(collectionGroup(db, 'tomare'), where("este", "==", true));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TargetTomareState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        toPageM()
    }
    const fetchTargetSonota = async () => {
        const q = query(collectionGroup(db, 'tomare'), where("その他", "!=", ""));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TargetTomareState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        toPageM()
    }
    const fetchTarget = async () => {
        const q = query(collectionGroup(db, 'tomare'), where("その他", "!=", null));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TargetState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        toPageM()
    }

    const clickMenu1 = () => { dispatch(addTarget("make")), setTarget('make'), fetchTargetMake(); }
    const clickMenu2 = () => { dispatch(addTarget("nail")), setTarget('nail'); fetchTargetNail() }
    const clickMenu3 = () => { dispatch(addTarget("este")), setTarget('este'); fetchTargetEste(); }
    const clickMenu4 = () => {
        dispatch(addTarget("その他")), setTarget('その他'); fetchTargetSonota();
    }

    const img_make: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_make.png?alt=media&token=eeaf12cd-39be-4fda-8945-ec2bcb1b24dd", alt: "ケアメイク", style: { width: '60px', height: '45px' } }
    const img_nail: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_nail.png?alt=media&token=42117e21-66df-4049-a948-46840912645a", alt: "ケアネイル", style: { width: '60px', height: '45px' } }
    const img_este: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_este.png?alt=media&token=5fe75701-ec95-424a-8ba7-a547e313dd19", alt: "ケアエステ", style: { width: '60px', height: '45px' } }
    const img_sonota: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_hoka.png?alt=media&token=0d98a224-f460-4527-8208-209f6a52a55c", alt: "その他", style: { width: '60px', height: '45px' } }


    return (
        <div className={styles.main}>
            {user.uid === '' && (
                <div>
                    <button onClick={lineClick}>
                        <h4 className="mb-4 text-green-500 text-3xl">ログイン</h4>
                    </button>
                </div>
            )}
            {`${user.icon}`.length !== 0 &&
                <img
                    src={`${user.icon}`}
                    alt=""
                    style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                />
            }
            {`${user.icon}`.length !== 0 &&
                <h1 className="mb-4 text-green-500 text-3xl">{user.name}さま </h1>
            }
            <h1>氏名</h1>
            {users.name}
            {users.uid}
            {/* <input type="text" onChange={(e) => setNamae(e.target.value)} /> */}
            <br />
            <h1>エリア</h1>
            {/* {users.area} */}
            <input type="text" onChange={(e) => setArea(e.target.value)} />
            <br />
            <h1>メニュー</h1>
            {users.sonota}
            *********************************************************************
            <br />
            <h3 className="mb-4 text-green-500 text-3xl">
                カレンダーから選択
            </h3>
            <div >
                <Calendar
                    locale={"en-JP"}
                    value={new Date()}
                    tileContent={
                        getTileContent
                    }
                    calendarType={"US"}
                    prev2Label={null}
                    // next2Label={null}
                    onClickDay={clickDay}
                />
            </div>
            <br />
            <h3 className="mb-4 text-green-500 text-3xl">
                メニューから選択
            </h3>
            <p >menuをクリック
                <div className={styles.grid}>
                    <div >
                        <button onClick={clickMenu1}>
                            <img　{...img_make} />
                            ケアメイク
                        </button>
                    </div>
                    <div>
                        <button onClick={clickMenu2}>
                            <img {...img_nail} />
                            ケアネイル
                        </button>
                    </div>
                    <div>
                        <button onClick={clickMenu3}>
                            <img {...img_este} />
                            ケアエステ
                        </button>
                    </div>
                    <div>
                        <button onClick={clickMenu4}>
                            <img {...img_sonota} />
                            その他
                        </button>
                    </div>
                    <br />
                </div>
            </p>
            <br />
            <div>
            </div>
            <div>

            </div>
            {/* <button onClick={registYoyaku}>登録</button> */}
        </div >
    )
}

export default PageB0

