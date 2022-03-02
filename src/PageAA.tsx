import React, { useState, useEffect } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import useSWR from 'swr'
import Link from 'next/link'
import { users } from './data'
import { getDocs, collection, collectionGroup, query, orderBy, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from "../src/firebase";
import { UserState } from "../src/types/user";
export default function PageAA() {

    const [uid, setUid] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [age, setAge] = useState<number>(0);
    const [userProfile, setUserProfile] = useState<any>([]);

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const router = useRouter()
    const toHome = () => {
        router.push('/')
    }
    // // const registUser = () => {
    // //     dispatch(addUser({ name, uid, icon }))
    // //     // toPageA()
    // // };

    // const fetcher = (url: string) => fetch(url).then((res) => res.json())
    // const { data, error } = useSWR('/api/users', fetcher)
    // console.log('user_App:', { data })
    // if (error) return <div>Failed to load</div>
    // if (!data) return <div>Loading...</div>

    // // const fetchAPI = async () => {
    // //     const { data, error } = useSWR('/api/users', fetcher)
    // //     console.log('user_App:', { data })
    // //     if (error) return <div>Failed to load</div>
    // //     if (!data) return <div>Loading...</div>
    // // const res = await fetch(`/api/[${user.name}]`);
    // // const data = await res.json();
    // // console.log(data);
    // // }

    // const accSingleTriggers = document.querySelectorAll('.js-acc-single-trigger');
    // accSingleTriggers.forEach(trigger => trigger.addEventListener('click', toggleAccordion));
    // function toggleAccordion() {
    //     const items = document.querySelectorAll('.js-acc-item');
    //     const thisItem = this.parentNode;
    //     items.forEach(item => {
    //         if (thisItem == item) {
    //             thisItem.classList.toggle('is-open');
    //             return;
    //         }
    //         item.classList.remove('is-open');
    //     });
    // }
    useEffect(() => {
        const uid = "Uda1c6a4e5b348c5ba3c95de639e32414"
        const fetchUser = async () => {
            const q = query(collection(db, 'users'), where("uid", "==", uid));
            const snapshot = await getDocs(q)
            const userData = snapshot.docs.map(
                (doc) => ({ ...doc.data() } as UserState))
            console.log('userData:', userData)
            // dispatch(addUser(userData))
            setUserProfile(userData)
        }
        fetchUser()
        // fetchTomare()
        console.log('User:', user)
        // console.log('tomare:', tomare)
    }, []);

    return (
        <div className="App">
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
            <Link href="/user/[id]" as={`/user/${user.uid}`}>
                <a>{user.uid}</a>
            </Link>
            {/* {users} */}

            {/* <div className="accordion-single js-acc-single">
                <div className="accordion-single-item js-acc-item">
                    <h2 className="accordion-single-title js-acc-single-trigger">Question 1</h2>
                    <div className="accordion-single-content">
                        <p>This is an Answer 1</p>
                    </div>
                </div>
                <div className="accordion-single-item js-acc-item">
                    <h2 className="accordion-single-title js-acc-single-trigger">Question 2</h2>
                    <div className="accordion-single-content">
                        <p>This is an Answer 2</p>
                    </div>
                </div>
                <div className="accordion-single-item js-acc-item">
                    <h2 className="accordion-single-title js-acc-single-trigger">Question 3</h2>
                    <div className="accordion-single-content">
                        <p>This is an Answer 3</p>
                    </div>
                </div>
            </div> */}

        </div >
    );
}

// export default PageAA
