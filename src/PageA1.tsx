import React, { useState, useEffect } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css'
import 'firebase/compat/auth';
import { UserState } from "./types/user";
// import 'firebase/compat/firestore';
import { db } from "./firebase"
import { getFirestore, collection, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import useSWR from 'swr'
import Link from 'next/link'
const PageA1 = () => {
    const [users, setUsers] = useState<any>([]);
    const [uid, setUid] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [age, setAge] = useState<number>(0);
    const [namae, setNamae] = useState<string>('');
    const [sei, setSei] = useState<string>('');
    const [menu, setMenu] = useState<string>('');
    const [day, setDay] = useState<string>('');
    const [tokoro, setTokoro] = useState<string>('');
    const [area, setArea] = useState<string>('');
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
            menu,
            day,
            tokoro,
            area,
            sns,
            qr,
            users
        }))
        const setRef = setDoc(doc(db, 'users', `${user.uid}`), {
            namae,
            sei,
            age,
            menu,
            day,
            tokoro,
            area,
            sns,
            qr,
            timestamp: Timestamp.fromDate(new Date()),
        }, { merge: true }//←上書きされないおまじない
        )
        console.log('user', setRef)
    };

    useEffect(() => {
        // if (user) {
        // const db = getFirestore()
        // clickButton()
        // loginしてたら
        let users: any = []
        const q = query(collection(db, 'users'), where('uid', '==', `${user.uid}`))
        onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    console.log('added: ', change.doc.data())
                    setUsers(change.doc.data())
                    // users.push({
                    //     id: change.doc.id,
                    //     name: change.doc.data().name
                    // })
                    // console.log('users:', users)
                }
            })
            console.log('name:', users.namae)
        })
        // }
    }, []);

    const fetchAPI = () => {
        const fetcher = (url: string) => fetch(url).then((res) => res.json())
        const { data, error } = useSWR('/api/users', fetcher)
        console.log({ data })
        if (error) return <div>Failed to load</div>
        if (!data) return <div>Loading...</div>
        // router.push(`/user/${uid}`)
        // const fetchAPI = async () => {
        // const { data, error } = useSWR('/api/users', fetcher)
        // console.log('user_App:', { data })
        // if (error) return <div>Failed to load</div>
        // if (!data) return <div>Loading...</div>
        // const res = await fetch(`/user/${user.uid}`);
        // router.push(`/user/${uid}`)
        // const data = await res.json();
        // console.log(data);
    }
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
            <input type="text" onChange={(e) => setArea(e.target.value)} />
            <h1>施術内容</h1>
            <input type="text" onChange={(e) => setMenu(e.target.value)} />
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
                {user.name}
                {users.namae}
                <h1>性別</h1>
                {users.sei}
                <h1>生年月日</h1>
                {users.age}
                <h1>住所</h1>
                {users.tokoro}
                <h1>活動地域</h1>
                {users.erea}
                <h1>施術内容</h1>
                {users.menu}
                {/* <h1>SNS</h1> */}
                {`${users.sns}` !== "" &&
                    <a
                        href={users.sns}
                        target="_blank"
                    >
                        <h1>SNS</h1>
                    </a>
                }
                <h1>QRコード</h1>
                {`${users.qr}`.length !== 0 &&
                    <img
                        src={`${users.qr}`}
                        alt=""
                        style={{ width: '80px', height: '80px' }}
                    />
                }
                <div>
                    <Link href="/user/[uid]" as={`/user/${user.uid}`}>
                        <a>{user.name}</a>
                    </Link>
                    <button onClick={fetchAPI}>
                        fetchAPI
                    </button>

                    {/* {data.map((p: any, id: any) => (
        <User key={id} user={p} />
      ))} */}
                </div>
            </p>
        </div >
    );
}



// const user = useSelector(selectUser);
// // console.log('App,', user)
// export const users = [
//     {
//         uid: user.uid,
//         name: user.name,
//     },
//     {
//         uid: 'Uda1c6a4e5b348c5ba3c95de639e32415',
//         name: 'えりこ',
//     },
//     {
//         uid: 'Uda1c6a4e5b348c5ba3c95de639e32416',
//         name: 'CCCCCCC',
//     },
// ]

export default PageA1