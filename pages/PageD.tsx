import React, { useState, useEffect } from "react";
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { TomareState } from "../src/types/tomare";
import { addTomare } from '../src/features/tomareSlice';
import { addMenu } from '../src/features/menuSlice';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { storage } from "../src/firebase";
import { db } from "../src/firebase";
import { getDocs, collection, collectionGroup, query, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot } from 'firebase/firestore'
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';
import FileUpload from '../components/FileUpload';
import Form_Zikoku from "lib/Form_Zikoku";
import Fun_0Calendar from "components/Fun_0Calendar";
import Fun_0Pin from "components/Fun_0Pin";
import { addReservableDate } from "@/features/reservableDateSlice";
import { fetchReservable } from "@/lib/firebaseFetch";
const PageD = () => {
    // const PagePay = dynamic(() => import('../src/PagePay'), { ssr: false });
    const Fun_0Calendar = dynamic(() => import('components/Fun_0Calendar'), { ssr: false });
    const Fun_0Pin = dynamic(() => import('components/Fun_0Pin'), { ssr: false });
    const user = useSelector(selectUser);
    const router = useRouter()
    const [menus, setMenus] = useState<any>([]);
    const [tomare, setTomare] = useState<any>([]);
    const dispatch = useDispatch();
    const toHome = () => { router.push('./') }


    useEffect(() => {
        fetchReservableData()
        console.log('tomare:', tomare)
    }, []);
    const fetchReservableData = async () => {
        const result = await fetchReservable()
        dispatch(addReservableDate(result))
        setTomare(result)
    }
    const uid = "Uda1c6a4e5b348c5ba3c95de639e32414"
    return (
        <>
            <div>
                {/* <Fun_0Calendar />
                <Fun_0Pin /> */}
            </div>
        </>
    );
};
export default PageD;

