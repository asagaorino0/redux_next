import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from "../src/firebase"
import { getFirestore, getDocs, collection, collectionGroup, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import { UserState } from "../src/types/user";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectUser } from '../src/features/userSlice';

export default function CalendarPage(tomareId: any) {
    // export default function CalendarPage() {

    const [users, setUsers] = useState<any>();
    const [uid, setUid] = useState<any>();
    const dispatch = useDispatch();
    const tomare = useSelector(selectUser);
    // const uid = "Uda1c6a4e5b348c5ba3c95de639e32414"
    // const registUser = () => {
    //     dispatch(addUser({
    //         users,
    //         uid,
    //         // tomare
    //     }))
    // }

    // const registYoyaku = () => {
    //     const addRef = addDoc(collection(db, 'yoyaku', `${user.uid}`, 'ukeru', `${gappi}oo`), {
    //         sei,
    //         menu,
    //         uid: `${user.uid}`,
    //         namae: namae,
    //         tokoro,
    //         ukeruId: `${gappi}oo`,
    //         timestamp: Timestamp.fromDate(new Date()),
    //     })
    //     const setRef = setDoc(doc(db, 'users', `${user.uid}`, 'tomare', `${gappi}oo`), {
    //         gappi,
    //         menu,
    //         cUid: `${user.uid}`,
    //         namae: namae,
    //         tokoro,
    //         ukeruId: `${gappi}oo`,
    //         timestamp: Timestamp.fromDate(new Date()),
    //     }, { merge: true }//←上書きされないおまじない
    //     )
    //     console.log('ukeru:', addRef)
    //     console.log('tomare:', setRef)
    //     alert('登録しました。ありがとうございます。')
    // };

    // // useEffect(() => {
    // // let users: any = []
    // // const fetchUsers = async () => {
    // //     const querrySnapshot = await getDocs(collection(db, 'users'))
    // //     const user = querrySnapshot.docs.map(
    // //         (doc: any) => ({ ...doc.data() } as UserState))
    // //     setUsers(user)
    // //     // setUid(users.uid)
    // //     console.log('data:', user)
    // // }
    // // fetchUsers()
    // // registUser()
    // // fetchTomare(uid)
    // // }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            //     // const snapshot = await getDocs(collection(db, 'users', uid, 'tomare'))
            //     const snapshot = await getDocs(collectionGroup(db, 'tomare'))
            //     const tomareData = snapshot.docs.map(
            //         (docT: any) => ({ ...docT.data() } as UserState))
            //     setTomare(tomareData)
            //     setUid(tomare.uid)
            //     console.log({ tomareData })

            const usersRef = collection(db, "users");
            const q = query(usersRef, where("uid", "==", tomareId));

            // const q = query(collection(db, 'users'), where('uid', '==', `${tomare.uid}`));
            const querySnapshot = await getDocs(q);
            // const museums = query(collection(db, 'users'), where('uid', '==', "Uda1c6a4e5b348c5ba3c95de639e32414"));
            // const querySnapshot = await getDocs(museums);
            // querySnapshot.forEach((doc) => {
            //     console.log(doc.id, ' => ', doc.data());
            // });


            // const usersData = querySnapshot.docs.map(
            // (doc: any) => ({ ...doc.data() } as UserState))

            const usersData = querySnapshot.docs.map((doc) => {
                return doc.id &&
                    doc.data()
            });




            setUsers(usersData)
            console.log({ usersData })
            // console.log(users.uid)
            // querySnapshot.forEach((doc) => {
            //     // doc.data() is never undefined for query doc snapshots
            //     console.log(doc.id, " => ", doc.data());
            // });
            // setUsers(doc)
        }
        console.log('users:', users)
        // console.log('tomareee', tomare)
        fetchUsers()
        // registUser()
    }, []);

    const getTileContent = (props: any) => {
        let year = props.date.getFullYear();
        let month = props.date.getMonth() + 1;
        let day = props.date.getDate();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        const formatDate = year + month + day;
        // console.log(formatDate)

        if (props.view !== "month") {
            return null;
        }
        // if (users.uid === tomare.uid)
        return (
            <div >
                {
                    // tomareee
                    //     .map((data: any) => {
                    //         if (formatDate === data.gappi) {
                    //             return (
                    //                 <div key={data.id}>
                    //                     {/* <div>
                    //       {data.day}
                    //     </div> */}
                    //                     <div>
                    //                         {data.menu}
                    //                     </div>
                    //                 </div>
                    //             )
                    //         }
                    //     })
                }
                <div />
                {/* {formatDate} */}
            </div>
        );
    };
    const [gappi, setGappi] = useState<string>('');
    const [menu, setMenu] = useState<string>('');
    const clickDay = (calendar: any) => {
        let year = calendar.getFullYear();
        let month = calendar.getMonth() + 1;
        let day = calendar.getDate();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        const formatDate = year + month + day;
        setGappi(formatDate)
        // <input type="text" onChange={(e) => setDay(e.target.value)} />
        // alert(gappi)
    }

    return (

        <div >
            {
                // users
                //     .map((data: any) => {
                //         return (
                //             <div key={data.uid}>
                //                 <div>
                //                     <img
                //                         src={`${data.icon}`}
                //                         alt=""
                //                         style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                //                     />
                //                 </div>
                //                 <h1>氏名（屋号）</h1>
                //                 {data.name}
                //                 <div>
                //                     {/* <h1>施術内容</h1>
                //                 {data.menu} */}
                //                 </div>

                <Calendar
                    locale={"en-JP"}
                    value={new Date()}
                    tileContent={getTileContent}
                    calendarType={"US"}
                    prev2Label={null}
                    // next2Label={null}
                    onClickDay={clickDay}
                />
                // </div>
                //     )
                // })
            }
            {/* {tomare.uid} */}
            {/* {tomareId} */}
        </div>
        // </div >
    );
}