import React, { useState, useEffect } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { db } from "./firebase"
import { getFirestore, collection, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'


const PageB1 = () => {
    const [users, setUsers] = useState<any>([]);
    const [uid, setUid] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [age, setAge] = useState<number>(0);
    const [namae, setNamae] = useState<string>(`${users.namae}`);
    const [sei, setSei] = useState<string>('');
    const [menu, setMenu] = useState<string>('');
    const [option1, setOption1] = useState<string>('');
    const [option2, setOption2] = useState<string>('');
    const [day, setDay] = useState<string>('');
    const [tokoro, setTokoro] = useState<string>('');
    const [star, setStar] = useState<number>(0);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const router = useRouter()

    const toHome = () => {
        router.push('/')
    }
    useEffect(() => {
        let users: any = []
        const q = query(collection(db, 'users'), where('uid', '==', `${user.uid}`))
        onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    console.log('added: ', change.doc.data())
                    setUsers(change.doc.data())
                }
            })
            console.log('name:', users.namae)
        })
    }, []);
    const registYoyaku = () => {
        // dispatch(addUser({
        //     sei,
        //     menu,
        //     option1,
        //     option2,
        //     day,
        //     uid,
        //     star,
        // }))
        const setRef = setDoc(doc(db, 'yoyaku', `${user.uid}`), {
            sei,
            menu,
            option1,
            option2,
            day,
            uid: uid,
            namae: namae,
            star,
            timestamp: Timestamp.fromDate(new Date()),
        }, { merge: true }//←上書きされないおまじない
        )
        // sendLine()
        console.log('yoyaku', setRef)
    };
    const [text, setText] = useState<string>(user.namae);
    const sendLine = async () => {
        const response = await fetch(`https://redux-next.vercel.app/api/${text}`);
        const data = await response.json();
        console.log('🚀 ~ file: index.tsx ~ line 11 ~ sendLine ~ data', data);
        // registYoyaku()
    };

    return (
        <div className="App">
            <span >pageB：登録</span>
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
            {/* {users.namae} */}
            <input type="text" onChange={(e) => setNamae(e.target.value)} />
            {/* <input type="text" onChange={(e) => setNamae(e.target.value)} /> */}
            {/* <h1>性別</h1>
            <input type="text" onChange={(e) => setSei(e.target.value)} />
            <h1>年齢</h1>
            <input type="text" onChange={(e) => setAge(Number(e.target.value))} /> */}
            <h1>施術内容</h1>
            <input type="text" onChange={(e) => setMenu(e.target.value)} />
            <h1>年月日</h1>
            <input type="date" onChange={(e) => setDay(e.target.value)} />
            <h1>住所</h1>
            <input type="text" onChange={(e) => setTokoro(e.target.value)} />
            <br />
            <button onClick={registYoyaku}>登録</button>
        </div >
    );
}

export default PageB1

