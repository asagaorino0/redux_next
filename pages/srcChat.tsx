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


// const Chat = ({ chat }: { chat: ChatState }) => {

const Chat = () => {
    const [chat, setChat] = useState<any>([]);
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
        console.log('targetChat:', { targetChat })
        console.log('targetChat.targatChat:', targetChat.targetChat)
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
    const handleCreate = async () => {
        console.log(`${tomareId}`)
        setDoc(doc(db, 'users', user.uid, 'tomare', `${tomareId}`, 'chat', now), {
            message: `${message}`, timestamp: now, yoyakuId: yoyakuId, yoyakuIcon: `${user.icon}`
        })
        setMessage("");
    }

    return (
        <div className={styles.main}>
            {/* <MsgList /> */}
            {targetChat.tomareId}:::
            {targetChat.yoyakuId}
            <br />
            ちゃっと
            {/* <div key={chat.timestamp}> */}
            <br />
            {/* <img
                    src={`${chat.yoyakuIcon}`}
                    alt=""
                    style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                /> */}
            {/* {chat.message} */}
            <br />
            {/* {chat.timestamp} */}
            <input type="text" onChange={(e) => setMessage(e.target.value)} />
            <br />
            <button onClick={handleCreate}>
                send！
            </button>
        </div>
        // </div>
    )
}
export default Chat