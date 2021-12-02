import { getFirestore, collection, addDoc } from 'firebase/firestore'
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth, db } from "../firebase"
const [tasks, setTasks] = useState([]);
const [name, setName] = useState();
// useEffect(() => {
//     const auth = getAuth()

//     // login状態が変更されたら
//     onAuthStateChanged(auth, (user) => {
//         console.log('user:', user)
//         console.log('userName:', user?.displayName)
//         const name = user?.displayName
//         setName(name)
//     })
// }, []);

const clickButton = () => {
    const id = '003'
    const name = 'test'
    const uid = ''


    const db = getFirestore()
    const docRef = addDoc(collection(db, 'tasks'), {
        uid: uid,
        id: id,
        name: name
    })
    console.log('Document', docRef)
}

function FirestoreAddButton() {
    return (
        <div>
            <button onClick={clickButton}>Firestore追加</button>
        </div>
    );
}

export default FirestoreAddButton;