import React, { useState, useEffect } from 'react';
import { addFormatdate, } from './features/formatDateSlice';
import { addTomare } from './features/tomareSlice';
import { addTargetTomare } from './features/targetTomareSlice';
import { addMenu } from './features/menuSlice';
import { selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "./firebase";
import { getDocs, collection, collectionGroup, query, where, doc, setDoc, Timestamp, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { TomareState } from "./types/tomare";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/Home.module.css'

import P_make from "./img/P_make.png"
import { computeSegDraggable } from '@fullcalendar/common';
import { truncate } from 'fs';

const PageC1 = () => {
    const [users, setUsers] = useState<any>([]);
    const [menus, setMenus] = useState<any>([]);
    const [make, setMake] = useState<boolean>(false);
    const [nail, setNail] = useState<boolean>(false);
    const [este, setEste] = useState<boolean>(false);
    const [sonota, setSonota] = useState<string>("");
    const [area, setArea] = useState<string>("未登録");
    const [gappi, setGappi] = useState<string>('');
    const [am_pm, setAm_pm] = useState<string>('');
    const [add, setAdd] = useState<number>(0);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [tomare, setTomare] = useState<any>([]);
    const [formatDate, setFormatDate] = useState<any>([]);
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
                        // .filter(() => tomare.uid === user.uid)//無効
                        .map((data: any) => {
                            if (formatDate === data.gappi && data.uid === user.uid) {
                                return (
                                    <div key={data.id}>
                                        <div>
                                            {data.menu}
                                        </div>
                                    </div>
                                )
                            }
                        })
                }
                <div />
            </div>
        );
    };

    const clickDay = async (calendar: any) => {
        // console.log('user:', user.uid)
        // console.log('tomare:', tomare.uid)
        let year = calendar.getFullYear();
        let month = calendar.getMonth() + 1;
        let day = calendar.getDate();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        const formatDate = year + month + day;
        dispatch(addFormatdate(formatDate))
        setFormatDate(formatDate)
        setGappi(formatDate)
        const q = query(collection(db, "users", user.uid, 'tomare'), where("gappi", "==", formatDate));
        const snapshot = await getDocs(q)
        const tomareLength = snapshot.docs.length
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        console.log(`targetTomareLength`, tomareLength)
    };

    const clickMenuAm = () => {
        setAm_pm("AM")
        // setDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}AM`), {
        //     gappi, uid: user.uid, am_pm: "AM",
        //     //  timestamp: serverTimestamp(),
        // }, { merge: true })
        fetchTomare()
    }
    const clickMenuPm = () => {
        setAm_pm("PM")
        // setDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}PM`), {
        //     gappi, uid: user.uid, am_pm: "PM",
        //     // timestamp: serverTimestamp(),
        // }, { merge: true })
        fetchTomare()
    }
    const clickMenu1 = () => {
        setMake(true)
        // setDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}${am_pm}`), {
        //     make:true
        //     // timestamp: serverTimestamp(),
        // }, { merge: true })
        // fetchTomare()
        fetchTargetTomare()
    }
    const clickMenu2 = () => {
        setNail(true)
        // setDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}${am_pm}`), {
        //     neil: true,
        //     // timestamp: serverTimestamp(),
        // }, { merge: true })
        // fetchTomare()
        fetchTargetTomare()
    }
    const clickMenu3 = () => {
        setEste(true)
        // setDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}${am_pm}`), {
        //     este: true, timestamp: serverTimestamp(),
        // }, { merge: true })
        // fetchTomare()
        fetchTargetTomare()
    }
    const clickMenu4 = () => {
        setSonota("その他")
        // setDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}${am_pm}`), {
        //     sonota: "その他",
        //     // timestamp: serverTimestamp(),
        // }, { merge: true })
        fetchTomare()
        fetchTargetTomare()
    }
    const clickMenu88 = () => {
        const am_pm = "AM"
        const gappi = 20220102
        setDoc(doc(db, 'users', user.uid, 'tomare', '20220102AM'), {
            menu: am_pm, timestamp: serverTimestamp(),
        }, { merge: true })
        fetchTomare()
        fetchTargetTomare()
    }
    const clickMenu888 = () => {
        setDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}${am_pm}`), {
            make, nail, este, sonota, gappi, uid: user.uid, am_pm: am_pm, menu: am_pm, timestamp: serverTimestamp(),
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
    const [targetTomare, setTargetTomare] = useState<any>([])
    const img_make: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_make.png?alt=media&token=eeaf12cd-39be-4fda-8945-ec2bcb1b24dd", alt: "ケアメイク", style: { width: '60px', height: '45px' } }
    const img_nail: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_nail.png?alt=media&token=42117e21-66df-4049-a948-46840912645a", alt: "ケアネイル", style: { width: '60px', height: '45px' } }
    const img_este: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_este.png?alt=media&token=5fe75701-ec95-424a-8ba7-a547e313dd19", alt: "ケアエステ", style: { width: '60px', height: '45px' } }
    const img_sonota: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_hoka.png?alt=media&token=0d98a224-f460-4527-8208-209f6a52a55c", alt: "その他", style: { width: '60px', height: '45px' } }
    return (
        <div className={styles.main}>
            <span >pageB2：枠登録</span>
            <br />
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
            {menus
                .map(
                    (doc: any) => {
                        return (
                            <div>
                                {doc.make === true && <p>めいく</p>}
                                {doc.nail === true && <p>ねいる</p>}
                                {doc.este === true && <p>えすて</p>}
                                {doc.sonota}
                            </div>)
                    })}
            ******************************************************
            <br />
            <div >
                <Calendar
                    locale={"en-JP"}
                    value={new Date()}
                    tileContent={
                        getTileContent
                    }
                    calendarType={"US"}
                    prev2Label={null}
                    next2Label={null}
                    onClickDay={clickDay}
                />
            </div>
            <br />
            {`${formatDate}`.length !== 0 &&
                <div>
                    <div className={styles.grid}>
                        <h3 className="mb-4  text-3xl">
                            {formatDate}＿
                        </h3>
                        <h3 className="mb-4 text-green-500 text-3xl">
                            <div className={styles.grid}>
                                {/* <h3 className="mb-4 text-green-500 text-3xl"> */}
                                <button onClick={clickMenuAm}>午前  </button>
                                {/* </h3> */}
                                ／
                                {/* <h3 className="mb-4 text-green-500 text-3xl"> */}
                                <button onClick={clickMenuPm}>   午後</button>

                            </div>
                        </h3>
                    </div>

                    {/* // {`${targetTomare.am_pm}`.length !== 0 && */}
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

                    <p>
                        <br />
                        ***現在の登録内容***

                        {targetTomare
                            .map(
                                (targetTomare: any) => {
                                    return (
                                        <div className={styles.grid}>
                                            <h3 className="mb-4  text-3xl">
                                                {/* {targetTomare.gappi} */}
                                                {targetTomare.am_pm}:
                                            </h3>
                                            <div className={styles.grid}>
                                                {targetTomare.make === true && <p><img {...img_make} /></p>}
                                                {targetTomare.nail === true && <p><img {...img_nail} /></p>}
                                                {targetTomare.este === true && <p><img {...img_este} /></p>}
                                                {`${targetTomare.sonota}`.length !== 0 &&
                                                    <img {...img_sonota} />
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                        }
                        <br />
                        {`${am_pm}`.length !== 0 &&
                            <div>
                                ***設定した内容*****

                                <h3 className="mb-4  text-3xl">
                                    {formatDate}{am_pm}
                                </h3>
                                <div className={styles.grid}>
                                    {make === true && <p><img {...img_make} /></p>}
                                    {nail === true && <p><img {...img_nail} /></p>}
                                    {este === true && <p><img {...img_este} /></p>}
                                    {sonota !== "" && <p><img {...img_sonota} /></p>}
                                </div>
                                <br />
                                <h3 className="mb-4 text-green-500 text-3xl">
                                    <button onClick={clickMenu888}>
                                        この内容で登録する
                                    </button>
                                </h3>
                            </div>
                        }
                        <div>
                            <br />
                            ***予約枠の取り消し***
                            <br />
                            <button onClick={clickMenu9am}>AM:午前　</button>
                            /
                            <button onClick={clickMenu9pm}>　PM：午後</button>
                        </div>

                    </p>

                </div>
            }

        </div>
    )
}

export default PageC1
