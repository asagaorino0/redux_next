import React, { useState, useEffect } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers, selectUsers } from './features/usersSlice';
import { addTomare, selectTomare, tomareSlice } from './features/tomareSlice';
import { addTargetChat, selectTargetChat } from './features/targetChatSlice';
import { addTargetUid } from './features/targetUidSlice';
import { addTargetYoyaku } from './features/targetYoyakuSlice';
import { useRouter } from "next/router";
import { db, setRefMenu } from "./firebase";
import { getFirestore, getDocs, collection, collectionGroup, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import CalendarPage from "./Calendar";
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { UsersState } from "../src/types/users";
import { TomareState } from "../src/types/tomare";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/Home.module.css'
import { addFormatdate, selectFormatdate } from './features/formatDateSlice';
import { addTargetTomare, selectTargetTomare } from './features/targetTomareSlice';
import { TargetTomareState } from "./types/targetTomare";


const PageB3 = () => {
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [age, setAge] = useState<number>(0);
    const [yoyakuName, setYoyakuName] = useState<string>("");
    const [sei, setSei] = useState<string>("");
    const [tokoro, setTokoro] = useState<string>('');
    const [star, setStar] = useState<number>(0);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [users, setUsers] = useState<any>([]);
    const [tomare, setTomare] = useState<any>([]);
    const [newT, setNewT] = useState<any>([])
    const [setTargetTomare] = useState<any>([])
    const [targetYoyaku, setTargetYoyaku] = useState<any>([])
    const [uid, setTargetUid] = useState<string>("")
    const [menu, setMenu] = useState<string>("")
    const [gappi, setTargetGappi] = useState<string>("")
    const formatdate = useSelector(selectFormatdate);
    const targetTomare = useSelector(selectTargetTomare);
    const [yoyakuId, setYoyakuId] = useState<string>('');
    const [tomareId, setTomareId] = useState<string>('');
    const router = useRouter();
    const [chat, setChat] = useState<any>([]);
    const date = new Date()
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth() + 1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)
    const h = ("00" + date.getHours()).slice(-2)
    const m = ("00" + date.getMinutes()).slice(-2)
    const s = ("00" + date.getSeconds()).slice(-2)
    const now = Y + '年' + M + '月' + D + '日 ' + h + ':' + m
    // const targetChat = useSelector(selectTargetChat);
    const [message, setMessage] = React.useState('');
    const fetchUsers = async () => {
        const q = query(collection(db, 'users'));
        const snapshot = await getDocs(q)
        const usersData = snapshot.docs.map(
            (doc: any) => ({ ...doc.data() } as UsersState))
        dispatch(addUsers({ usersData }))
        setUsers(usersData)
        console.log('usersData:', usersData)
        console.log('users:', users)
    }
    const fetchTomare = async () => {
        console.log(formatdate)
        const q = query(collectionGroup(db, 'tomare'));
        // const q = query(collectionGroup(db, 'tomare'), where("gappi", "==", formatdate));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState))
        // setTomare(tomareData)
        dispatch(addTomare(tomareData))
        setTomare(tomareData)
        console.log('tomareData:', tomareData)
        console.log('tomare:', tomare)
    }
    useEffect(() => {
        fetchUsers()
        fetchTomare()
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

    const clickDay = (calendar: any) => {
        let year = calendar.getFullYear();
        let month = calendar.getMonth() + 1;
        let day = calendar.getDate();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        const formatDate = year + month + day;
        // setGappi(formatDate)
        // alert(gappi)
    }
    const toPageB = () => {
        router.push('./PageB');
    };


    return (
        <div className={styles.main}>
            <span >pageB3：登録</span>

            {/* {`${user.icon}`.length !== 0 && */}
            <img
                src={`${user.icon}`}
                alt=""
                style={{ borderRadius: '50%', width: '60px', height: '60px' }}
            />
            {/* } */}
            {`${user.icon}`.length !== 0 &&
                <h1 className="mb-4 text-green-500 text-3xl">{user.name}さま </h1>
            }
            <h1>氏名</h1>
            {users.namae}
            <input type="text" onChange={(e) => setYoyakuName(e.target.value)} />
            <br />
            <h1>性別</h1>
            <input type="text" onChange={(e) => setSei(e.target.value)} />
            <br />
            <h1>住所</h1>
            <input type="text" onChange={(e) => setTokoro(e.target.value)} />
            <br />
            {targetYoyaku.menu}

            *********************************************************************
            <br />
            <div >
                {/* {users.length !== 0 && */}
                {
                    users.map((users: UsersState) => {
                        const img_make: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_make.png?alt=media&token=eeaf12cd-39be-4fda-8945-ec2bcb1b24dd", alt: "ケアメイク", style: { width: '60px', height: '45px' } }
                        const img_nail: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_nail.png?alt=media&token=42117e21-66df-4049-a948-46840912645a", alt: "ケアネイル", style: { width: '60px', height: '45px' } }
                        const img_este: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_este.png?alt=media&token=5fe75701-ec95-424a-8ba7-a547e313dd19", alt: "ケアエステ", style: { width: '60px', height: '45px' } }
                        const img_sonota: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_hoka.png?alt=media&token=0d98a224-f460-4527-8208-209f6a52a55c", alt: "その他", style: { width: '60px', height: '45px' } }

                        return (
                            <div key={users.uid}>
                                {
                                    targetTomare.targetTomare
                                        // .filter((users: UsersState) => tomare.uid === users.uid)
                                        .filter((tomare: TomareState) => tomare.uid === users.uid)
                                        .map((tomare: TomareState) => {

                                            const fetchTarget1 = async () => {
                                                setDoc(doc(db, 'users', users.uid, 'tomare', `${tomare.gappi}${tomare.am_pm}`), {
                                                    menu: "make", yoyakuMenu: "ケアメイク", make: true, nail: false, este: false, aroma: false, tanka: 0, quantity: 0, star: 0, checked: true, pay: 0, yoyakuUid: user.uid, yoyakuName, yoyakuIcon: user.icon, yoyakuId: users.uid + user.uid + tomare.tomareId, timestamp: now, img_befor: "", img_after: "", come_befor: "", come_after: "",
                                                }, { merge: true })
                                                alert("登録しました！")
                                                fetchTomare()
                                            };
                                            const fetchTarget2 = async () => {
                                                setDoc(doc(db, 'users', users.uid, 'tomare', `${tomare.gappi}${tomare.am_pm}`), {
                                                    menu: "nail", yoyakuMenu: "ケアネイル", make: false, nail: true, este: false, aroma: false, tanka: 0, quantity: 0, star: 0, checked: true, pay: 0, yoyakuUid: user.uid, yoyakuName, yoyakuIcon: user.icon, yoyakuId: users.uid + user.uid + tomare.tomareId, timestamp: now, img_befor: "", img_after: "", come_befor: "", come_after: "",
                                                }, { merge: true })
                                                alert("登録しました！")
                                                fetchTomare()
                                            };
                                            const fetchTarget3 = async () => {
                                                setDoc(doc(db, 'users', users.uid, 'tomare', `${tomare.gappi}${tomare.am_pm}`), {
                                                    menu: "este", yoyakuMenu: "ケアエステ", make: false, nail: false, este: true, aroma: false, tanka: 0, quantity: 0, star: 0, checked: true, pay: 0, yoyakuUid: user.uid, yoyakuName, yoyakuIcon: user.icon, yoyakuId: users.uid + user.uid + tomare.tomareId, timestamp: now, img_befor: "", img_after: "", come_befor: "", come_after: "",
                                                }, { merge: true })
                                                alert("登録しました！")
                                                fetchTomare()
                                            };
                                            const fetchTarget4 = async () => {
                                                setDoc(doc(db, 'users', users.uid, 'tomare', `${tomare.gappi}${tomare.am_pm}`), {
                                                    menu: "este", yoyakuMenu: "アロマケア", make: false, nail: false, este: false, aroma: true, tanka: 0, quantity: 0, star: 0, checked: true, pay: 0, yoyakuUid: user.uid, yoyakuName, yoyakuIcon: user.icon, yoyakuId: users.uid + user.uid + tomare.tomareId, timestamp: now, img_befor: "", img_after: "", come_befor: "", come_after: "",
                                                }, { merge: true })
                                                alert("登録しました！")
                                                fetchTomare()
                                            };
                                            const toChat = () => {
                                                // dispatch(addTargetChat({
                                                // yoyakuId: `${targetTomare.yoyakuId}`,
                                                // tomareId: `${targetTomare.tomareId}`
                                                // })),
                                                fetchChat(yoyakuId)
                                                setTomareId(`${tomare.tomareId}`)
                                                setYoyakuId(`${tomare.yoyakuId}`)
                                            };

                                            if (`${users.uid}` === `${tomare.uid}`) {
                                                // console.log(users.name)
                                                // console.log(tomare.uid)
                                                return (
                                                    tomare.menu !== "" &&
                                                    <div key={users.uid}>
                                                        <br />
                                                        <img
                                                            src={`${users.icon}`}
                                                            alt=""
                                                            style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                                                        />
                                                        {/* <h1>氏名（屋号）</h1> */}
                                                        <h3 className="mb-4  text-3xl">
                                                            {users.name}
                                                        </h3>
                                                        <h3 className="mb-4 text-3xl">
                                                            {tomare.gappi}/{tomare.am_pm}
                                                        </h3>
                                                        <h3 className="mb-4 text-green-500 text-3xl">
                                                            メニューを選択
                                                        </h3>
                                                        <div className={styles.grid}>
                                                            <button onClick={fetchTarget1}>{tomare.make === true && <img {...img_make} />}</button>
                                                            <button onClick={fetchTarget2}>{tomare.nail === true && <img {...img_nail} />}</button>
                                                            <button onClick={fetchTarget3}>{tomare.este === true && <img {...img_este} />}</button>
                                                            {`${tomare.sonota}`.length !== 0 &&
                                                                <img {...img_sonota} />
                                                            }
                                                            <button onClick={toChat}>
                                                                <img
                                                                    src={`${targetTomare.yoyakuIcon}`}
                                                                    alt="icon"
                                                                    style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                                                                />
                                                            </button>
                                                        </div>
                                                        <br />
                                                    </div >
                                                )
                                            }
                                        })
                                }

                            </div >
                        )
                    }
                    )
                }
                <button onClick={toPageB}>戻る</button>
            </div>
        </div>
    )
}
export default PageB3