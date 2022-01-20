import React, { useState, useEffect } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers, selectUsers } from './features/usersSlice';
import { addTomare, selectTomare, tomareSlice } from './features/tomareSlice';
import { addTargetUid } from './features/targetUidSlice';
import { addTargetYoyaku } from './features/targetYoyakuSlice';
import { useRouter } from "next/router";
import { db } from "./firebase";
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
    const [namae, setNamae] = useState<string>("");
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
    const [menu, setTargetMenu] = useState<string>("")
    const [gappi, setTargetGappi] = useState<string>("")
    const formatdate = useSelector(selectFormatdate);
    const targetTomare = useSelector(selectTargetTomare);
    const router = useRouter();

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
    // const uuid:string = "Ue46857df2a6433a7852ef631b5689693"
    useEffect(() => {
        fetchUsers()
        fetchTomare()
    }, []);

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
    // const fetchTargetUid = async () => {
    //     const q = query(collectionGroup(db, 'tomare'), where("este", "==", true));
    //     const snapshot = await getDocs(q)
    //     const tomareData = snapshot.docs.map(
    //         (docT: any) => ({ ...docT.data() } as TargetTomareState))
    //     dispatch(addTargetTomare(tomareData))
    //     setTargetTomare(tomareData)
    //     // toPageM()
    // }
    // const clickMenu1 = () => { dispatch(addTargetUid(users.uid)), setTargetUid(users.uid), fetchTargetUid(); }

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
            <input type="text" onChange={(e) => setNamae(e.target.value)} />
            <br />
            <h1>性別</h1>
            <input type="text" onChange={(e) => setSei(e.target.value)} />
            <br />
            <h1>住所</h1>
            <input type="text" onChange={(e) => setTokoro(e.target.value)} />
            <br />

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

                                            const fetchTargetUid = async () => {
                                                console.log(`${tomare.gappi}${tomare.am_pm}`)
                                                // const q = query(collection(db, users.uid, 'tomare', `${tomare.gappi}${tomare.menu}`));
                                                // const q = query(collection(db, 'users', users.uid, 'tomare', `20220120PM`));
                                                const q = query(collectionGroup(db, 'tomare'), where("tomareId", "==", `${tomare.gappi}${tomare.am_pm}`));
                                                const snapshot = await getDocs(q)
                                                const yoyakuData = snapshot.docs.map(
                                                    (docT: any) => ({ ...docT.data() } as TargetTomareState))
                                                dispatch(addTargetYoyaku(yoyakuData))
                                                setTargetYoyaku(yoyakuData)
                                                console.log(yoyakuData)
                                                // toPageM()
                                            }
                                            const clickMenu1 = () => { dispatch(addTargetUid([tomare.gappi, tomare.am_pm])), fetchTargetUid(); }






                                            if (`${users.uid}` === `${tomare.uid}`) {
                                                // console.log(users.name)
                                                // console.log(tomare.uid)

                                                return (
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
                                                        <button onClick={clickMenu1}>
                                                            <h3 className="mb-4 text-green-500 text-3xl">
                                                                {tomare.menu}
                                                            </h3>
                                                        </button>
                                                        <div className={styles.grid}>
                                                            {tomare.make === true && <p><img {...img_make} /></p>}
                                                            {tomare.nail === true && <p><img {...img_nail} /></p>}
                                                            {tomare.este === true && <p><img {...img_este} /></p>}
                                                            {`${tomare.sonota}`.length !== 0 &&
                                                                <img {...img_sonota} />
                                                            }
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
                }            <button onClick={toPageB}>戻る</button>
            </div>
        </div>
    )
}
export default PageB3