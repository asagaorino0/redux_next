import React, { useState, useEffect } from 'react';
import { addTomare } from '../src/features/tomareSlice';
import { addTargetTomare } from '../src/features/targetTomareSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "../src/firebase";
import { getDocs, collection, collectionGroup, query, orderBy, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot } from 'firebase/firestore'
import { TomareState } from "../src/types/tomare";
import { UserState } from "../src/types/user";
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/Home.module.css'
import { addUser, selectUser } from '../src/features/userSlice';
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
import CustomerAccordion from '../components/CustomerAccordion';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';

const PagePay = () => {
    const Chat = dynamic(() => import('./srcChat'), { ssr: false });
    const PageLogin = dynamic(() => import('../src/PageLogin'), { ssr: false });
    // const CustomerAccordion = dynamic(() => import('../components/CustomerAccordion'), { ssr: false }); const [make, setMake] = useState<boolean>(false);
    const [nail, setNail] = useState<boolean>(false);
    const [este, setEste] = useState<boolean>(false);
    const [sonota, setSonota] = useState<string>("");
    const [am_pm, setAm_pm] = useState<string>('');
    const [gappi, setGappi] = useState<string>('');
    const [userProfile, setUserProfile] = useState();
    const [tomare, setTomare] = useState<any>([]);
    const [formatDate, setFormatDate] = useState<any>([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);


    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const q = query(collection(db, 'users',), where("uid", "==", `${user.uid}`));
    //         const snapshot = await getDocs(q)
    //         const userData = snapshot.docs.map(
    //             (doc) => ({ ...doc.data() } as UserState))
    //         console.log('userData:', userData)
    //         dispatch(addUser(userData))
    //         // setUserProfile(userData)
    //     }
    //     fetchUser()
    //     fetchTomare()
    //     console.log('User:', user)
    //     console.log('tomare:', tomare)
    // }, []);
    const fetchTomare = async () => {
        const q = query(collectionGroup(db, 'tomare'), where("yoyakuUid", "==", `${user.uid}`));
        const snapshot = onSnapshot(q, (querySnapshot) => {
            const tomareData = querySnapshot.docs.map(
                (doc) => ({ ...doc.data() } as TomareState))
            // dispatch(addTomare(tomareData))
            setTomare(tomareData)
        });
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
    return (
        <div className="App">
            <span>pagePay:お支払い</span>
            <br />
            {user.uid}
            <h1>
                <React.StrictMode>
                    <Provider store={store}>

                        <br />
                        *************************************************
                        <br />
                        {
                            tomare
                                .map((tomare: TomareState) => {
                                    return (
                                        <div key={tomare.tomareId}>
                                            {`${tomare.yoyakuMenu}` !== "" &&
                                                <div className={styles.grid}>
                                                    <CustomerAccordion tomare={tomare} key={tomare.tomareId} />
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                        }
                    </Provider>
                </React.StrictMode>
            </h1>
        </div>
    );
};
export default PagePay;

