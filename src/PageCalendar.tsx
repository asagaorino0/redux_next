import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from "../src/firebase"
import { getFirestore, getDocs, collection, collectionGroup, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import { UserState } from "../src/types/user";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectUser } from '../src/features/userSlice';

export default function CalendarPage({ tomareId }) {
    // export default function CalendarPage() {

    const [users, setUsers] = useState<any>();
    const [uid, setUid] = useState<any>();
    const [tomare, setTomare] = useState<any>();
    const dispatch = useDispatch();
    // const tomare = useSelector(selectUser);
    // const uid = "Uda1c6a4e5b348c5ba3c95de639e32414"
    const registUser = () => {
        dispatch(addUser({
            // users,
            // uid,
            tomare
        }))
    }

    useEffect(() => {
        const fetchUsers = async (tomareId: any) => {
            // const snapshot = await getDocs(collection(db, 'users', uid, 'tomare'))
            const q = query(collectionGroup(db, 'tomare'), where("uid", "==", tomareId));

            const snapshot = await getDocs(q)
            const tomareData = snapshot.docs.map(
                (docT: any) => ({ ...docT.data() } as UserState))
            setTomare(tomareData)
            // setUid(tomare.uid)
            console.log(tomareData)
            console.log(tomare)
            registUser()
            // const usersRef = collection(db, "users");
            // const q = query(usersRef, where("uid", "==", tomareId));

            // // const q = query(collection(db, 'users'), where('uid', '==', `${tomare.uid}`));
            // const querySnapshot = await getDocs(q);
            // // const museums = query(collection(db, 'users'), where('uid', '==', "Uda1c6a4e5b348c5ba3c95de639e32414"));
            // // const querySnapshot = await getDocs(museums);
            // // querySnapshot.forEach((doc) => {
            // //     console.log(doc.id, ' => ', doc.data());
            // // });


            // // const usersData = querySnapshot.docs.map(
            // // (doc: any) => ({ ...doc.data() } as UserState))

            // const usersData = querySnapshot.docs.map((doc) => {
            //     return doc.id &&
            //         doc.data()
            // });




            // setTomare(tomare)
            // console.log({ usersData })
            // console.log(users.uid)
            // querySnapshot.forEach((doc) => {
            //     // doc.data() is never undefined for query doc snapshots
            //     console.log(doc.id, " => ", doc.data());
            // });
            // setUsers(doc)
        }
        // console.log('tomareId:user', { tomareId })
        fetchUsers(tomareId)

        console.log('tomare:', tomare)
        console.log('tomareId:', tomareId)
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
        // if (tomare.uid === tomareId)
        return (
            <div >
                {
                    // tomare
                    //     .map((data: any) => {
                    //         if (data.uid === tomareId)
                    //             if (formatDate === data.gappi) {
                    //                 return (
                    //                     <div key={data.uid}>
                    //                         {/* <div>
                    //       {data.day}
                    //     </div> */}
                    //                         <div>
                    //                             {data.menu}
                    //                         </div>
                    //                     </div>
                    //                 )
                    //             }
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

            <Calendar
                locale={"en-JP"}
                value={new Date()}
                tileContent={getTileContent}
                calendarType={"US"}
                prev2Label={null}
                // next2Label={null}
                onClickDay={clickDay}
            />

            {/* {tomare.uid} */}
            {/* {tomareId} */}
        </div>
    );
}