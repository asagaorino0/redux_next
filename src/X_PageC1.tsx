import React, { useState, useEffect } from 'react';
import { addFormatdate, } from './features/formatDateSlice';
import { addTomare } from './features/tomareSlice';
import { addTargetTomare } from './features/targetTomareSlice';
import { addMenu } from './features/menuSlice';
import { addUser, selectUser } from '../src/features/userSlice';
// import { selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "./firebase";
import { getDocs, collection, collectionGroup, query, where, doc, setDoc, Timestamp, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { TomareState } from "./types/tomare";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import liff from '@line/liff';
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
    // const [uid, setUid] = useState<string>('');
    // const [name, setName] = useState<string>('');
    // const [icon, setIcon] = useState<string | undefined>('');
    // const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID

    useEffect(() => {
        // liff.init({ liffId: LINEID as string })
        //     .then(() => {
        //         if (!liff.isLoggedIn()) {
        //             setUid('k00000')
        //             liff.login() // ログインしていなければ最初にログインする
        //         } else if (liff.isInClient()) {
        //             liff.getProfile()  // ユーザ情報を取得する
        //                 .then(profile => {
        //                     // const userId: string = profile.userId
        //                     const displayName: string = profile.displayName
        //                     const displayicon: string | undefined = profile.pictureUrl
        //                     setName(profile.displayName)
        //                     setUid(profile.userId)
        //                     setName(displayName)
        //                     setIcon(displayicon)
        //                     dispatch(addUser({ name, uid, icon }))
        //                 })
        //         }
        //     })
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
        // setMake(false), setNail(false), setEste(false), setSonota(""), setAm_pm("")
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
        setDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}AM`), {
            gappi, uid: user.uid, am_pm: "AM",
            //  timestamp: serverTimestamp(),
        }, { merge: true })
        fetchTomare()
        fetchTargetTomare()
        setMake(targetTomare.make), setNail(targetTomare.nail), setEste(targetTomare.este), setSonota(targetTomare.sonota)
    }
    const clickMenuPm = () => {
        setAm_pm("PM")
        setDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}PM`), {
            gappi, uid: user.uid, am_pm: "PM",
            // timestamp: serverTimestamp(),
        }, { merge: true })
        fetchTomare()
        fetchTargetTomare()
        setMake(targetTomare.make), setNail(targetTomare.nail), setEste(targetTomare.este), setSonota(targetTomare.sonota)
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
        fetchTargetTomare()
        // setTargetTomare(0)
    }
    const clickMenu9pm = () => {
        deleteDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}PM`))
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
        const targetDate = `${formatDate}${am_pm}`
        // const q = query(collection(db, "users", user.uid, 'tomare'), where("gappi", "==", formatDate));
        const q = query(collection(db, "users", user.uid, 'tomare', targetDate))
        const snapshot = await getDocs(q)
        const tomareLength = snapshot.docs.length
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        console.log(`targetTomareLength`, tomareLength)
    }
    const fetchTargetTomareAM = async () => {
        const q = query(collection(db, "users", user.uid, 'tomare'), where("gappi", "==", formatDate));
        // const q = query(collection(db, "users", user.uid, 'tomare', `${formatDate}AM`))
        const snapshot = await getDocs(q)
        const tomareLength = snapshot.docs.length
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        console.log(`targetTomareLength`, tomareLength)
    }
    const fetchTargetTomarePM = async () => {
        // const q = query(collection(db, "users", user.uid, 'tomare'), where("gappi", "==", formatDate));
        const q = query(collection(db, "users", user.uid, 'tomare', `${formatDate}PM`))
        const snapshot = await getDocs(q)
        const tomareLength = snapshot.docs.length
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        console.log(`targetTomareLength`, tomareLength)
    }
    const [targetTomare, setTargetTomare] = useState<any>([])

    return (
        <div className="App">
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
                    <p>
                        {
                            `${formatDate}`
                        }
                        <br />
                        <button onClick={clickMenuAm}>AM:午前　</button>
                        /
                        <button onClick={clickMenuPm}>　PM:午後</button>
                    </p>

                    {/* // {`${targetTomare.am_pm}`.length !== 0 && */}
                    <p >

                        <br />
                        <button onClick={clickMenu1}>
                            ケアメイク
                        </button>
                        <br />
                        <button onClick={clickMenu2}>
                            ケアネイル
                        </button>
                        <br />
                        <button onClick={clickMenu3}>
                            ケアエステ
                        </button>
                        <br />
                        <button onClick={clickMenu4}>
                            その他
                        </button>
                        <br />
                    </p>

                    <p>
                        <br />
                        ***登録内容***
                        {targetTomare
                            .map(
                                (targetTomare: any) => {
                                    return (
                                        <div>
                                            {targetTomare.gappi}{targetTomare.am_pm}
                                            <br />
                                            {targetTomare.make === true && <p>めいく</p>}
                                            {targetTomare.nail === true && <p>ねいる</p>}
                                            {targetTomare.este === true && <p>えすて</p>}
                                            {targetTomare.sonota}

                                        </div>
                                    )
                                })
                        }
                        <br />
                        {formatDate}{am_pm}
                        {make === true && <p>ケアメイク</p>}
                        {nail === true && <p>ケアネイル</p>}
                        {este === true && <p>ケアエステ</p>}
                        {sonota !== "" && <p>その他</p>}
                        <br />
                        <button onClick={clickMenu888}>
                            この内容で登録する
                        </button>
                        {/* /* {                    targetTomare.length !== 0 && */}
                        <div>
                            <br />
                            予約枠の取り消し
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
