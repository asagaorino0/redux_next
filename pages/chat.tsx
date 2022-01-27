import React, { useState, useEffect } from 'react';
import { db } from "../src/firebase";
import { getFirestore, getDocs, collection, collectionGroup, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import { addTargetChat, selectTargetChat } from '../src/features/targetChatSlice';
import { useRouter } from 'next/router';
import { UsersState } from '../src/types/users';
import { addUsers, selectUsers } from '../src/features/usersSlice';
import { TomareState } from '../src/types/tomare';
import { ChatState } from '../src/types/chat';
import "firebase/firestore";
import "firebase/auth";
import { selectUser } from '../src/features/userSlice';
import styles from '../styles/Home.module.css'
const [chat, setChat] = useState<any>([]);

const Chat = ({ chat }: { chat: ChatState }) => {
    // const Chat = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const targetChat = useSelector(selectTargetChat);
    const [message, setMessage] = React.useState('');
    const [tomare, setTomare] = useState<any>([]);
    const [yoyakuId, setYoyakuId] = useState<string>('');
    const [tomareId, setTomareId] = useState<string>('');
    const date = new Date()
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth() + 1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)
    const h = ("00" + date.getHours()).slice(-2)
    const m = ("00" + date.getMinutes()).slice(-2)
    const s = ("00" + date.getSeconds()).slice(-2)
    const now = Y + '年' + M + '月' + D + '日 ' + h + ':' + m

    useEffect(() => {
        fetchChat(yoyakuId);
        console.log('targetChat:', targetChat)
    }, []);

    const fetchChat = async (yoyakuId: string) => {
        const q = query(collectionGroup(db, 'chat'), where("yoyakuId", "==", `${yoyakuId}`));
        const snapshot = onSnapshot(q, (querySnapshot) => {
            setChat(
                querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            console.log('chat:', chat);
        });
        return snapshot;
    };
    // // const fetchTomare = async () => {
    // //     const q = query(collectionGroup(db, 'chat'), where("yoyakuId", "==", `${tomare.yoyakuId}`));
    // //     const snapshot = await getDocs(q);
    // //     const tomareData = snapshot.docs.map(
    // //         (docT: any) => ({ ...docT.data() } as TomareState)
    // //     );
    // //     dispatch(addTomare(tomareData));
    // //     setTomare(tomareData);
    // //     console.log('tomareData:', tomareData);
    // //     console.log('tomare:', tomare);
    // // };
    // //     const docref = doc(collection(db, 'udstyr'));
    // // const colref = collection(docref, 'subcollection'));
    // // await addDoc(colref, nyUdstyr);


    // //     const colref = doc(db, 'users', user.uid, 'tomare', `${tomare.gappi}${tomare.am_pm}`), {
    // //             menu: "", yoyakuMenu: "ケアメイク", make: true, nail: false, este: false, yoyakuUid: user.uid, yoyakuIcon: user.icon, yoyakuId: users.uid + user.uid + tomare.tomareId, timestamp: "",
    // //         }, { merge: true })
    // //         alert("登録しました！")
    // //     };
    // // const handleCreate = async () => {
    // //     console.log(`${message}`)
    // //     // setDoc(doc(db, 'users', user.uid, 'tomare', targetChat.tomareId, 'chat'), {
    // //     const docref = doc(collection(db, 'users', user.uid, 'tomare', '20220122AM', 'chat', '1'))
    // //     setDoc(docref, {
    // //         message: `${message}`, timestamp: now, yoyakuId: targetChat.yoyakuId,
    // //     })
    // // };
    const handleCreate = async () => {
        console.log(`${tomareId}`)
        setDoc(doc(db, 'users', user.uid, 'tomare', `${tomareId}`, 'chat', now), {
            message: `${message}`, timestamp: now, yoyakuId: yoyakuId, yoyakuIcon: `${user.icon}`
        })
        fetchChat(yoyakuId),
            setMessage("");
    }

    return (
        <div className={styles.main}>
            {/* <MsgList /> */}
            {targetChat.tomareId}:::
            {targetChat.yoyakuId}
            <br />
            ちゃっと
            <div key={chat.timestamp}>
                <br />
                <img
                    src={`${chat.yoyakuIcon}`}
                    alt=""
                    style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                />
                {chat.message}
                <br />
                {chat.timestamp}
                <input type="text" onChange={(e) => setMessage(e.target.value)} />
                <br />
                <button onClick={handleCreate}>
                    send！
                </button>
            </div>
        </div>
    )
}
export default Chat