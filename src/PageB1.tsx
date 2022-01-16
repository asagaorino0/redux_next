import React, { useState, useEffect } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers, selectUsers } from './features/usersSlice';
import { addTomare, selectTomare } from './features/tomareSlice';
import { useRouter } from "next/router";
import { db } from "./firebase";
import { getFirestore, getDocs, collection, collectionGroup, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import CalendarPage from "./Calendar";
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { UsersState } from "../src/types/users";
import { TomareState } from "../src/types/tomare";
import styles from '../styles/Home.module.css'

const PageB1 = () => {
    // const [user, setUser] = useState<any>([]);
    // const [uid, setUid] = useState<string>(user.uid);
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
    const router = useRouter()

    // const toHome = () => {
    //     router.push('/')
    // }
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
    // // const registYoyaku = () => {
    // //     const addRef = addDoc(collection(db, 'yoyaku', `${user.uid}`, 'ukeru', `${gappi}oo`), {
    // //         sei,
    // //         menu,
    // //         uid: `${user.uid}`,
    // //         namae: namae,
    // //         tokoro,
    // //         ukeruId: `${gappi}oo`,
    // //         timestamp: Timestamp.fromDate(new Date()),
    // //     })
    // //     const setRef = setDoc(doc(db, 'users', `${user.uid}`, 'tomare', `${gappi}oo`), {
    // //         gappi,
    // //         menu,
    // //         cUid: `${user.uid}`,
    // //         namae: namae,
    // //         tokoro,
    // //         ukeruId: `${gappi}oo`,
    // //         timestamp: Timestamp.fromDate(new Date()),
    // //     }, { merge: true }//←上書きされないおまじない
    // //     )
    // //     console.log('ukeru:', addRef)
    // //     console.log('tomare:', setRef)
    // //     alert('登録しました。ありがとうございます。')
    // // };
    const [users, setUsers] = useState<any>([]);
    const [tomare, setTomare] = useState<any>([]);
    const [tomareId, setTomareId] = useState<any>([]);
    // const uid = "Uda1c6a4e5b348c5ba3c95de639e32414"
    // const registUser = () => {
    //     dispatch(addUser({
    //         users,
    //     }))
    // }
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
    useEffect(() => {
        fetchUsers()
        fetchTomare()
    }, []);


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
                    users
                        .map((data: any) => {
                            return (
                                <div key={data.uid}>

                                    <img
                                        src={`${data.icon}`}
                                        alt=""
                                        style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                                    />
                                    <h1>氏名（屋号）</h1>
                                    {data.name}
                                    <React.StrictMode >
                                        <Provider store={store}>
                                            <CalendarPage users={data} key={tomare.uid} />
                                        </Provider>
                                    </React.StrictMode>
                                    <br />
                                    {/* <button onClick={registYoyaku}>登録</button> */}
                                </div >
                            );
                        })
                }
                {/* } */}
            </div >
        </div>
    )
}

export default PageB1