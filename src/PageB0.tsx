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
import { store } from './app/store';
import { Provider } from 'react-redux';
import { UsersState } from "./types/users";
import { TomareState } from "./types/tomare";
import { TargetTomareState } from "./types/targetTomare";
import { TargetState } from "./types/target";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { setUncaughtExceptionCaptureCallback } from 'process';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'

const PageB0 = () => {
    const [users, setUsers] = useState<any>([]);
    // const [uid, setUid] = useState<string>(user.uid);
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [area, setArea] = useState<string>("未登録");
    const [namae, setNamae] = useState<string>("");
    const [sei, setSei] = useState<string>("");
    const [menu, setMenu] = useState<string>('');
    const [option1, setOption1] = useState<string>('');
    const [option2, setOption2] = useState<string>('');
    const [gappi, setGappi] = useState<string>('');
    const [tokoro, setTokoro] = useState<string>('');
    const [add, setAdd] = useState<number>(0);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    // const target = useSelector(selectTarget);
    const router = useRouter();
    // const [users, setUsers] = useState<any>();
    const [tomare, setTomare] = useState<any>([]);
    const [formatDate, setFormatDate] = useState<any>([]);
    const [target, setTarget] = useState<string>("");
    const [targetTomare, setTargetTomare] = useState<any>([])
    // const users = useSelector(selectUsers).users;



    // useEffect(() => {
    //     let user: any = []
    //     const q = query(collection(db, 'users'), where('uid', '==', `${user.uid}`))
    //     onSnapshot(q, (snapshot) => {
    //         snapshot.docChanges().forEach((change) => {
    //             if (change.type === 'added') {
    //                 console.log('added: ', change.doc.data())
    //                 setUser(change.doc.data())
    //             }
    //         })
    //         console.log('name:', user.namae)
    //     })
    // }, []);
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
        // console.log('ukeru:', addRef)
        // console.log('tomare:', setRef)
        alert('登録しました。オファーを楽しみにお待ちください。')
    };

    // const uid = "Uda1c6a4e5b348c5ba3c95de639e32414"
    // const registUsers = () => {
    //     dispatch(addUsers({
    //         users,
    //     }))
    // }

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
                        // .filter(() => tomare.uid === user.uid)//無効
                        .map((data: any) => {
                            // if (formatDate === data.gappi && tomare.uid === "Uda1c6a4e5b348c5ba3c95de639e32414") {
                            // if (formatDate === data.gappi && data.uid === user.uid) {
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
    const fetchTarget = async () => {
        const q = query(collectionGroup(db, 'tomare'), where("その他", "!=", ""));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TargetState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        // toPageM()
    }

    const clickMenu1 = () => { dispatch(addTarget("make")), setTarget('make'), fetchTargetMake(); }
    const clickMenu2 = () => { dispatch(addTarget("nail")), setTarget('nail'); fetchTargetNail() }
    const clickMenu3 = () => { dispatch(addTarget("este")), setTarget('este'); fetchTargetEste(); }
    const clickMenu4 = () => {
        dispatch(addTarget("その他")), setTarget('その他'); fetchTarget();
    }

    const img_make: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_make.png?alt=media&token=eeaf12cd-39be-4fda-8945-ec2bcb1b24dd", alt: "ケアメイク", style: { width: '60px', height: '45px' } }
    const img_nail: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_nail.png?alt=media&token=42117e21-66df-4049-a948-46840912645a", alt: "ケアネイル", style: { width: '60px', height: '45px' } }
    const img_este: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_este.png?alt=media&token=5fe75701-ec95-424a-8ba7-a547e313dd19", alt: "ケアエステ", style: { width: '60px', height: '45px' } }
    const img_sonota: any = { src: "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_hoka.png?alt=media&token=0d98a224-f460-4527-8208-209f6a52a55c", alt: "その他", style: { width: '60px', height: '45px' } }


    return (
        <div className="App">
            <span >page0：選択</span>
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

