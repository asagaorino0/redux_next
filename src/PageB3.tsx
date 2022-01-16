import React, { useState, useEffect } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers, selectUsers } from './features/usersSlice';
import { addTomare, selectTomare, tomareSlice } from './features/tomareSlice';
import { addTargetTomare } from './features/targetTomareSlice';
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
    const [users, setUsers] = useState<any>([]);
    const [tomare, setTomare] = useState<any>([]);
    const [newT, setNewT] = useState<any>([])
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
        const q = query(collectionGroup(db, 'tomare'));
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

    return (
        <div className={styles.main}>
            <span >pageB1：登録</span>
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
                        // const getTileContent = (props: any) => {
                        //     tomare
                        //         // .filter((users: UsersState) => tomare.uid === users.uid)
                        //         .filter((tomare: TomareState) => tomare.uid === users.uid)

                        //         .map((tomare: TomareState) => {
                        //             // return (
                        //             // if (`${users.uid}` === `${tomare.uid}`) {
                        //             console.log(users.name)
                        //             console.log(tomare.uid)
                        //             // const getTileContent = (props: any) => {
                        //             let year = props.date.getFullYear();
                        //             let month = props.date.getMonth() + 1;
                        //             let day = props.date.getDate();
                        //             month = ('0' + month).slice(-2);
                        //             day = ('0' + day).slice(-2);
                        //             const formatDate = year + month + day;
                        //             if (props.view !== "month") {
                        //                 return null;
                        //             }
                        //             if (formatDate === tomare.gappi) {
                        //                 return (
                        //                     <div key={tomare.uid}>
                        //                         <div>
                        //                             {tomare.menu}
                        //                         </div>
                        //                     </div>
                        //                 )
                        //             }
                        //             // }
                        //         })
                        // }
                        return (
                            <div key={users.uid}>
                                {
                                    tomare
                                        // .filter((users: UsersState) => tomare.uid === users.uid)
                                        .filter((tomare: TomareState) => tomare.uid === users.uid)
                                        .map((tomare: TomareState) => {
                                            // return (
                                            if (`${users.uid}` === `${tomare.uid}`) {
                                                console.log(users.name)
                                                console.log(tomare.uid)
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
                                                    if (formatDate === tomare.gappi) {
                                                        return (
                                                            <div key={tomare.uid}>
                                                                <div>
                                                                    {tomare.menu}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                }
                                            }
                                            // })


                                            return (
                                                <div key={users.uid}>
                                                    <img
                                                        src={`${users.icon}`}
                                                        alt=""
                                                        style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                                                    />
                                                    <h1>氏名（屋号）</h1>
                                                    {users.name}
                                                    <br />
                                                    {/* {`${targetTomare.uid}` === users.uid && */}
                                                    <div >
                                                        <Calendar
                                                            locale={"en-JP"}
                                                            value={new Date()}
                                                            tileContent={getTileContent}
                                                            calendarType={"US"}
                                                            prev2Label={null}
                                                            next2Label={null}
                                                            onClickDay={clickDay}
                                                        />
                                                    </div>

                                                    <br />
                                                    {/* <button onClick={registYoyaku}>登録</button> */}
                                                </div >

                                            )
                                        })}



                            </div >
                        )

                    }

                    )
                }
            </div>
        </div>
    )
}
export default PageB1