import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import { getFirestore, getDocs, collection, collectionGroup, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import { addTomare } from './features/tomareSlice';
import { addTargetChat, selectTargetChat } from './features/targetChatSlice';
import { useRouter } from 'next/router';
import { UsersState } from '../src/types/users';
import { addUsers, selectUsers } from './features/usersSlice';
import { TomareState } from '../src/types/tomare';
import "firebase/firestore";
import "firebase/auth";
import { selectUser } from './features/userSlice';
import styles from '../styles/Home.module.css'
const Chat = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const targetChat = useSelector(selectTargetChat);
    const [message, setMessage] = React.useState('');
    const [chat, setChat] = useState<any>([]);
    const [tomare, setTomare] = useState<any>([]);
    const date = new Date()
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth() + 1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)
    const h = ("00" + date.getHours()).slice(-2)
    const m = ("00" + date.getMinutes()).slice(-2)
    const s = ("00" + date.getSeconds()).slice(-2)
    const now = Y + '年' + M + '月' + D + '日 ' + h + ':' + m

    useEffect(() => {
        fetchChat();
        // fetchTomare();
    }, []);

    const fetchChat = async () => {
        const q = query(collectionGroup(db, 'tomare'), where("yoyakuId", "==", `${targetChat.yoyakuId}`));
        const snapshot = await getDocs(q);
        const chatData = snapshot.docs.map(
            (doc: any) => ({ ...doc.data() } as TomareState)
        );
        // dispatch(addUsers({ usersData }));
        setChat(chatData);
        console.log('chatData:', chatData);
        console.log('chat:', chat);
        // console.log('users:', users);
    };
    // const fetchTomare = async () => {
    //     const q = query(collectionGroup(db, 'chat'), where("yoyakuId", "==", `${tomare.yoyakuId}`));
    //     const snapshot = await getDocs(q);
    //     const tomareData = snapshot.docs.map(
    //         (docT: any) => ({ ...docT.data() } as TomareState)
    //     );
    //     dispatch(addTomare(tomareData));
    //     setTomare(tomareData);
    //     console.log('tomareData:', tomareData);
    //     console.log('tomare:', tomare);
    // };

    const handleCreate = async () => {
        console.log(`${message}`)
        setDoc(doc(db, 'users', user.uid, 'tomare', `${targetChat.tomareId}`, 'chat'), {
            message: `${message}`, timestamp: now, yoyakuId: `${targetChat.yoyakuId}`,
        })
    };

    return (
        <div className={styles.main}>
            {/* <MsgList /> */}
            {user.uid}'tomare'
            {targetChat.tomareId}
            {
                chat
                    .map((chat: TomareState) => {
                        return (
                            chat.yoyakuId,
                            chat.message
                        )
                    }
                    )}
            <div >
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