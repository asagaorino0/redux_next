import React, { useState, useEffect } from 'react';
// import { addFormatdate, } from '../src/features/formatDateSlice';
import { addTomare } from '../src/features/tomareSlice';
import { addTargetTomare } from '../src/features/targetTomareSlice';
import { addTargetChat } from '../src/features/targetChatSlice';
import { addMenu } from '../src/features/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "../src/firebase";
import { getDocs, collection, collectionGroup, query, where, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { TomareState } from "../src/types/tomare";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/Home.module.css'
import { selectUser } from '../src/features/userSlice';
import { useRouter } from "next/router";
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import dynamic from 'next/dynamic'
import { addFormatDate } from '@/features/formatDateSlice';
import Image from 'next/image';


const PageA_tomare = () => {

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
        dispatch(addFormatDate(formatDate))
        setFormatDate(formatDate)
        setGappi(formatDate)
        const q = query(collection(db, "users", user.uid, 'tomare'), where("gappi", "==", formatDate));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState))
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        setChat([])
    };
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
                <h3 className="mb-4 text-green-500 text-3xl">予約枠の設定</h3>
            </button>
            {user.uid === '' && (
                <div>
                    {/* <button onClick={lineClick}> */}
                    <h4 className="mb-4 text-green-500 text-3xl">PageC:ログイン</h4>
                    {/* </button> */}
                </div>
            )}
            <React.StrictMode >
                <Provider store={store}>

                    {/* <PageLogin /> */}
                </Provider>
            </React.StrictMode>
            <img
                src={`${user.icon}`}
                alt=""
                style={{ borderRadius: '50%', width: '60px', height: '60px' }}
            />
            <h1 className="mb-4 text-green-500 text-3xl">{user.name}さま </h1>
            {/* } */}
            {/* <h1>氏名</h1>
            {users.name}
            {users.uid}
            <br />
            <h1>エリア</h1>
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
                    })} */}
            *************************************************
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
                                <button onClick={clickMenu1}><img {...img_make} />ケアメイク</button>
                            </div>
                            <div>
                                <button onClick={clickMenu2}><img {...img_nail} />ケアネイル</button>
                            </div>
                            <div>
                                <button onClick={clickMenu3}><img {...img_este} />ケアエステ</button>
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
                                (targetTomare: TomareState) => {
                                    const toChat = () => {
                                        dispatch(addTargetChat({
                                            yoyakuId: `${targetTomare.yoyakuId}`,
                                            tomareId: `${targetTomare.tomareId}`
                                        })),
                                            setTomareId(`${targetTomare.tomareId}`)
                                        setYoyakuId(`${targetTomare.yoyakuId}`)
                                        fetchChat(`${targetTomare.yoyakuId}`)
                                        // setYoyakuIcon(`${tomare.yoyakuIcon}`)
                                        const fetchTargetTomare = async () => {
                                            const q = query(collection(db, "users", user.uid, 'tomare'), where("tomareId", "==", `${targetTomare.tomareId}`));
                                            const snapshot = await getDocs(q)
                                            const tomareData = snapshot.docs.map(
                                                (docT: any) => ({ ...docT.data() } as TomareState))
                                            dispatch(addTargetTomare(tomareData))
                                            setTargetTomare(tomareData)
                                        }
                                        // useEffect(() => {
                                        //     fetchTargetTomare()
                                        // }, []);
                                    };

                                    return (
                                        <div className={styles.grid} key={targetTomare.tomareId}>
                                            <br />
                                            <h3 className="mb-4  text-3xl">
                                                {/* {targetTomare.gappi} */}
                                                {targetTomare.am_pm}
                                            </h3>

                                            <div className={styles.grid}>
                                                {targetTomare.make === true && <p><img {...img_make} /></p>}
                                                {targetTomare.nail === true && <p><img {...img_nail} /></p>}
                                                {targetTomare.este === true && <p><img {...img_este} /></p>}
                                                {`${targetTomare.sonota}`.length !== 0 &&
                                                    <img {...img_sonota} />
                                                }

                                                {targetTomare.yoyakuIcon && <p>
                                                    <button onClick={toChat}>
                                                        <img
                                                            src={`${targetTomare.yoyakuIcon}`}
                                                            alt="icon"
                                                            style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                                                        />
                                                    </button>
                                                </p>}
                                                <br />
                                            </div>
                                        </div>
                                    )
                                })
                        }

                    </p>

                </div>
            }
        </div>
    )
}

export default PageA_tomare
