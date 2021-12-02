import React, { useState, useEffect } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth, db } from "../firebase"
// import { getFirestore, collection, addDoc} from 'firebase/firestore'
import { app } from "../firebase"
import { getFirestore, collection, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
// import { initializeFirestore } from 'firebase/firestore'
// import { getFirestore } from "firebase/firestore"
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { getAuth, signInWithRedirect, signOut, GoogleAuthProvider } from "firebase/auth";



function FirestoreList() {

    const [tasks, setTasks] = useState<any>([]);
    const [name, setName] = useState<string>("");
    const [uid, setUid] = useState<string>("");

    useEffect(() => {
        const auth = firebaseAuth

        // login状態が変更されたら
        onAuthStateChanged(auth, (user) => {
            console.log('user:', user)
            console.log('userName:', user?.displayName)
            const name = user?.displayName
            setName(name)
            const uid = user?.uid
            setUid(uid)
            if (user) {
                // const db = getFirestore()
                clickButton()
                // loginしてたら
                let tasks = []
                const q = query(collection(db, 'tasks'), where('uid', '==', `${user.uid}`))
                onSnapshot(q, (snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === 'added') {
                            console.log('added: ', change.doc.data())
                            tasks.push({
                                id: change.doc.id,
                                name: change.doc.data().name
                            })
                            console.log(tasks)
                        }
                    })
                    setTasks(tasks)
                })
            }
        })
    }, []);


    const clickButton = () => {
        // const db = getFirestore()
        // const db = initializeFirestore(app, { ignoreUndefinedProperties: true })
        const setRef = setDoc(doc(db, 'users', `${uid}`), {
            uid: uid,
            name: name,
            timestamp: Timestamp.fromDate(new Date()),
        }, { merge: true }//←上書きされないおまじない
        )
        console.log('user', setRef)
        const docRef = addDoc(collection(db, 'tasks'), {
            uid: uid,
            id: '003',
            name: name
        })
        console.log('Document', docRef)
    }

    return (
        <div>
            {name}:
            {uid}
            <div>
                <button onClick={clickButton}>Firestore追加</button>
            </div>
            {tasks.map(val => (
                <div key={val.name}>{val.name}</div>
            ))}
        </div>
    );
}

export default FirestoreList;
