import React, { useState } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css'
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import { db } from "./firebase"
import { getFirestore, collection, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'


const PageA1 = () => {
    const [uid, setUid] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [age, setAge] = useState<number>(0);
    const [namae, setNamae] = useState<string>('');
    const [sei, setSei] = useState<string>('');
    const [sejyutsu, setSejyutsu] = useState<string>('');
    const [day, setDay] = useState<string>('');
    const [tokoro, setTokoro] = useState<string>('');
    const [erea, setErea] = useState<string>('');
    const [sns, setSns] = useState<string>('');
    const [qr, setQr] = useState<string>('');
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const router = useRouter()
    const toHome = () => {
        router.push('/')
    }
    const registUser = () => {
        dispatch(addUser({
            namae,
            sei,
            age,
            sejyutsu,
            day,
            tokoro,
            erea,
            sns,
            qr
        }))
        const setRef = setDoc(doc(db, 'users', `${user.uid}`), {
            namae,
            sei,
            age,
            sejyutsu,
            day,
            tokoro,
            erea,
            sns,
            qr,
            timestamp: Timestamp.fromDate(new Date()),
        }, { merge: true }//←上書きされないおまじない
        )
        console.log('user', setRef)
    };
    return (
        <div className="App">
            <span >ユーザー情報登録:PageA1</span>
            <br />
            {/* {`${user.icon}`.length !== 0 &&
                <img
                    src={`${user.icon}`}
                    alt=""
                    style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                />
            }
            {`${user.icon}`.length !== 0 &&
                <h1 className="mb-4 text-green-500 text-3xl">{user.name}さま </h1>
            } */}
            <h1>氏名</h1>
            <input type="text" onChange={(e) => setNamae(e.target.value)} />
            <h1>性別</h1>
            <input type="text" onChange={(e) => setSei(e.target.value)} />
            <h1>生年月日</h1>
            <input type="text" onChange={(e) => setAge(Number(e.target.value))} />
            <h1>住所</h1>
            <input type="text" onChange={(e) => setTokoro(e.target.value)} />
            <h1>活動地域</h1>
            <input type="text" onChange={(e) => setErea(e.target.value)} />
            <h1>施術内容</h1>
            <input type="text" onChange={(e) => setSejyutsu(e.target.value)} />
            <h1>SNS</h1>
            <input type="text" onChange={(e) => setSns(e.target.value)} />
            <h1>QRコード</h1>
            <input type="text" onChange={(e) => setQr(e.target.value)} />
            <br />
            <button onClick={registUser}>登録</button>
            <p className={styles.description}>
                <span >登録内容</span>
                <br />
                <h1>氏名</h1>
                {user.namae}
                <h1>性別</h1>
                {user.sei}
                <h1>生年月日</h1>
                {user.age}
                <h1>住所</h1>
                {user.tokoro}
                <h1>活動地域</h1>
                {user.erea}
                <h1>施術内容</h1>
                {user.sejyutsu}
                {/* <h1>SNS</h1> */}
                {`${user.sns}` !== "" &&
                    <a
                        href={user.sns}
                        target="_blank"
                    >
                        <h1>SNS</h1>
                    </a>
                }
                <h1>QRコード</h1>
                {`${user.qr}`.length !== 0 &&
                    <img
                        src={`${user.qr}`}
                        alt=""
                        style={{ width: '80px', height: '80px' }}
                    />
                }
            </p>
        </div >
    );
}

export default PageA1

