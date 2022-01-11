import React, { useState, useEffect } from 'react';
import { addFormatdate, } from './features/formatDateSlice';
import { addTomare } from './features/tomareSlice';
import { addTargetTomare } from './features/targetTomareSlice';
import { addUsers } from './features/usersSlice';
import { selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "./firebase";
import { getDocs, collection, collectionGroup, query, where, doc, setDoc, Timestamp, deleteDoc } from 'firebase/firestore'
import { TomareState } from "./types/tomare";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PageC1 = () => {
    const [users, setUsers] = useState<any>([]);
    const [area, setArea] = useState<string>("未登録");
    const [gappi, setGappi] = useState<string>('');
    const [add, setAdd] = useState<number>(0);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [tomare, setTomare] = useState<any>([]);
    const [formatDate, setFormatDate] = useState<any>([]);
    useEffect(() => {
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
        console.log('user:', user.uid)
        console.log('tomare:', tomare.uid)
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
        const tomareData = snapshot.docs.length
        dispatch(addTargetTomare(tomareData))
        setTargetTomare(tomareData)
        console.log(tomareData)
        if (tomareData === 0) {
            setAdd(1)
        }
    };

    const clickMenu0 = () => {
        setDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}oo`), {
            gappi, uid: user.uid, menu: "〇", timestamp: Timestamp.fromDate(new Date()),
        }, { merge: true })
        fetchTomare()
        setAdd(0)
    }
    const clickMenu9 = () => {
        deleteDoc(doc(db, 'users', user.uid, 'tomare', `${formatDate}oo`))
        fetchTomare()
        setTargetTomare(0)
    }
    const fetchTomare = async () => {
        const q = query(collectionGroup(db, 'tomare'));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState))
        dispatch(addTomare(tomareData))
        setTomare(tomareData)
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
            {users.sonota}
            *********************************************************************
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
            <div>
                {add === 1 &&
                    <p>
                        {
                            `${formatDate}に予約枠を設定します。`
                        }
                        <br />
                        <button onClick={clickMenu0}>
                            o.k.
                        </button>
                    </p>
                }
            </div>
            <div>
                {targetTomare === 1 &&
                    <p >
                        <br />
                        <button onClick={clickMenu9}>
                            予約枠の取り消し
                        </button>
                    </p>
                }
            </div>
        </div >
    )
}

export default PageC1

