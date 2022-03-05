import React, { useState, useEffect } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addFormatdate, selectFormatdate } from './features/formatDateSlice';
import { addUsers, selectUsers } from './features/usersSlice';

import { addTargetTomare, selectTargetTomare } from './features/targetTomareSlice';
import { addTomare, selectTomare, tomareSlice } from './features/tomareSlice';
// import { addTargetTomare } from './features/targetTomareSlice';
import { useRouter } from "next/router";
import { db } from "./firebase";
import { getFirestore, getDocs, collection, collectionGroup, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import CalendarPage from "./Calendar";
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { UsersState } from "../src/types/users";
import { TomareState } from "../src/types/tomare";
import { TargetTomareState } from "../src/types/targetTomare";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/Home.module.css'


const PageB1 = () => {
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [age, setAge] = useState<number>(0);
    const [namae, setNamae] = useState<string>("");
    const [sei, setSei] = useState<string>("");
    const [menu, setMenu] = useState<string>('');
    const [option1, setOption1] = useState<string>('');
    const [option2, setOption2] = useState<string>('');
    const [gappi, setGappi] = useState<string>('');
    const [tokoro, setTokoro] = useState<string>('');
    const [star, setStar] = useState<number>(0);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const formatdate = useSelector(selectFormatdate);
    const targetTomare = useSelector(selectTargetTomare);
    const [users, setUsers] = useState<any>([]);
    const [tomare, setTomare] = useState<any>([]);
    const [newT, setNewT] = useState<any>([])
    const router = useRouter();
    // const [targetTomare, setTargetTomare] = useState<any>([])

    const fetchUsers = async () => {
        const q = query(collection(db, 'users'));
        // const q = query(collectionGroup(db, 'tomare'), where("gappi", "==", formatDate));
        const snapshot = await getDocs(q)
        const usersData = snapshot.docs.map(
            (doc: any) => ({ ...doc.data() } as UsersState))
        dispatch(addUsers({ usersData }))
        setUsers(usersData)
        console.log('usersData:', usersData)
        console.log('users:', users)
    }
    const fetchTomare = async () => {
        const q = query(collectionGroup(db, 'tomare'));
        const snapshot = await getDocs(q)
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState))
        // setTomare(tomareData)
        dispatch(addTomare(tomareData))
        setTomare(tomareData)
        const formatdate = useSelector(selectFormatdate);
        console.log('tomareData:', tomareData)
        console.log('tomare:', tomare)
        console.log('formatDate:', formatdate)
    }

    useEffect(() => {
        fetchUsers()
        console.log(targetTomare)
        // fetchTomare()
    }, []);

    // const getTileContent = (props: any) => {
    //     let year = props.date.getFullYear();
    //     let month = props.date.getMonth() + 1;
    //     let day = props.date.getDate();
    //     month = ('0' + month).slice(-2);
    //     day = ('0' + day).slice(-2);
    //     const formatDate = year + month + day;
    //     if (props.view !== "month") {
    //         return null;
    //     }
    //     console.log(`mapUsers`, users)
    //     console.log(`mapTomare`, tomare)
    //     return (
    //         <div >
    //             {
    //                 tomare
    //                     .map((data: TomareState) => {
    //                         // if (formatDate === data.gappi && data.uid === users.uid) {
    //                         if (formatDate === data.gappi) {
    //                             return (
    //                                 <div key={data.uid}>
    //                                     <div>
    //                                         {data.menu}
    //                                     </div>
    //                                 </div>
    //                             )
    //                         }

    //                     })
    //             }
    //         </div>
    //     );
    // };
    // const clickDay = (calendar: any) => {
    //     let year = calendar.getFullYear();
    //     let month = calendar.getMonth() + 1;
    //     let day = calendar.getDate();
    //     month = ('0' + month).slice(-2);
    //     day = ('0' + day).slice(-2);
    //     const formatDate = year + month + day;
    //     // setGappi(formatDate)
    //     // alert(gappi)
    // }
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
    }
    const toPageB = () => {
        router.push('./PageB');
    };
    return (
        <div className={styles.main}>
            <span >pageB1：{targetTomare.gappi}</span>
            <h3 className="mb-4 text-green-500 text-3xl">
                pageB1： {targetTomare.gappi}
            </h3>
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
            <h3 className="mb-4 text-green-500 text-3xl">
                {gappi}
            </h3>
            <div >
                {
                    users
                        // .filter(() => users.uid === data.uid)
                        .map((users: UsersState) => {

                            // console.log(`targetTomare`, data)
                            // console.log(`targetTomareUid`, data.uid)
                            return (
                                <div key={users.uid}>
                                    <img
                                        src={`${users.icon}`}
                                        alt=""
                                        style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                                    />
                                    <h1>氏名（屋号）</h1>
                                    {users.name}
                                    {/* {data.gappi} */}
                                </div >
                                // )
                                // return (
                                //     <div key={targetTomare.uid}>

                                //         <h1>氏名（屋号）</h1>
                                //         {targetTomare.gappi}
                                //         <br />
                                //         <div >
                                //         </div>
                                //         <br />
                                //         <button onClick={toPageB}>戻る</button>
                                //     </div >
                            )
                        })
                    //     )
                    // })
                }
            </div>
            <button onClick={toPageB}>戻る</button>
            {/* {formatdate} */}
        </div>
    )
}
export default PageB1