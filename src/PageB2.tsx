import React, { useState, useEffect } from 'react';
import { addFormatdate, } from './features/formatDateSlice';
import { addTomare, selectTomare, } from './features/tomareSlice';
import { addUsers, selectUsers, } from './features/usersSlice';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "./firebase";
import { getFirestore, getDocs, collection, collectionGroup, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import { store } from './app/store';
import { Provider } from 'react-redux';
import { UsersState } from "./types/users";
import { TomareState } from "./types/tomare";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { setUncaughtExceptionCaptureCallback } from 'process';
import ReactDOM from 'react-dom';

const PageB2 = () => {
    const [users, setUsers] = useState<any>([]);
    // const [uid, setUid] = useState<string>(user.uid);
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [area, setArea] = useState<string>("未登録");
    const [namae, setNamae] = useState<string>("");
    const [sei, setSei] = useState<string>("");
    const [menu, setMenu] = useState<string>('');
    const [option1, setOption1] = useState<string>('');
    const [option2, setOption2] = useState<string>('');
    const [gappi, setGappi] = useState<string>('');
    const [tokoro, setTokoro] = useState<string>('');
    const [add, setAdd] = useState<number>(0);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    // const users = useSelector(selectUsers).users;



    // useEffect(() => {
    //     let user: any = []
    //     const q = query(collection(db, 'users'), where('uid', '==', `${user.uid}`))
    //     onSnapshot(q, (snapshot) => {
    //         snapshot.docChanges().forEach((change) => {
    //             if (change.type === 'added') {
    //                 console.log('added: ', change.doc.data())
    //                 setUser(change.doc.data())
    //             }
    //         })
    //         console.log('name:', user.namae)
    //     })
    // }, []);
    const registYoyaku = () => {
        // const addRef = addDoc(collection(db, 'yoyaku', `${user.uid}`, 'ukeru', `${gappi}oo`), {
        //     sei,
        //     menu,
        //     uid: `${user.uid}`,
        //     namae: namae,
        //     tokoro,
        //     ukeruId: `${gappi}oo`,
        //     timestamp: Timestamp.fromDate(new Date()),
        // })
        const setRef = setDoc(doc(db, 'users', `${user.uid}`, 'tomare', `${gappi}oo`), {
            gappi,
            uid: `${user.uid}`,
            namae: namae,
            timestamp: Timestamp.fromDate(new Date()),
        }, { merge: true }//←上書きされないおまじない
        )
        // console.log('ukeru:', addRef)
        console.log('tomare:', setRef)
        alert('登録しました。オファーを楽しみにお待ちください。')
    };
    // const [users, setUsers] = useState<any>();
    const [tomare, setTomare] = useState<any>([]);
    const [formatDate, setFormatDate] = useState<any>([]);
    // const uid = "Uda1c6a4e5b348c5ba3c95de639e32414"
    // const registUsers = () => {
    //     dispatch(addUsers({
    //         users,
    //     }))
    // }

    // useEffect(() => {
    // let users: any = []
    //     const fetchUsers = async () => {
    //         const querrySnapshot = await getDocs(collection(db, 'users'))
    //         const usersData = querrySnapshot.docs.map(
    //             (doc: any) => ({ ...doc.data() } as UsersState))
    //         console.log('usersData:', usersData)
    //         dispatch(addUsers(usersData))
    //         setUsers(usersData)
    //         console.log('users:', users)
    //     }
    //     fetchUsers()
    //     console.log('users:', users)
    // }, []);

    useEffect(() => {
        const fetchTomare = async () => {
            const q = query(collectionGroup(db, 'tomare'));
            const snapshot = await getDocs(q)
            const tomareData = snapshot.docs.map(
                (docT: any) => ({ ...docT.data() } as TomareState))
            console.log(tomareData)
            dispatch(addTomare(tomareData))
            setTomare(tomareData)
            console.log(tomare)
        }
        fetchTomare()
        console.log('tomare:', tomare)
    }, []);



    const getTileContent = (props: any) => {
        let year = props.date.getFullYear();
        let month = props.date.getMonth() + 1;
        let day = props.date.getDate();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        const formatDate = year + month + day;
        if (props.view !== "month") {
            return null;
        }
        return (
            <div >
                {
                    tomare
                        // .filter(() => tomare.uid === user.uid)//無効
                        .map((data: any) => {
                            // if (formatDate === data.gappi && tomare.uid === user.uid) {
                            if (formatDate === data.gappi && data.uid === user.uid) {
                                // if (formatDate === data.gappi) {
                                return (
                                    <div key={data.id}>
                                        <div>
                                            {data.menu}
                                        </div>
                                    </div>
                                )
                            }
                            // { tomare.uid }
                        })

                }
                <div />

            </div>
        );
    };

    const [val1, setVal1] = React.useState<string>('');
    const [val2, setVal2] = React.useState<string>('');
    const [val3, setVal3] = React.useState<string>('');
    const [val4, setVal4] = React.useState<string>('');
    const [text, setText] = React.useState('');
    const clickDay = (calendar: any) => {
        setAdd(1)
        let year = calendar.getFullYear();
        let month = calendar.getMonth() + 1;
        let day = calendar.getDate();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        const formatDate = year + "/" + month + "/" + day;
        dispatch(addFormatdate(formatDate))
        setFormatDate(formatDate)
        setGappi(formatDate)
    };



    const clickMenu1 = () => {
        setMenu("1")
        setDoc(doc(db, 'users', tomare.uid, 'tomare', `${gappi}oo`), {
            gappi: formatDate,
            uid: tomare.uid,
            menu: menu,
            timestamp: Timestamp.fromDate(new Date()),
        }, { merge: true }//←上書きされないおまじない
        )

    }






    const clickAdd = (calendar: any) => {

        setAdd(0)
    }

    return (
        <div className="App">
            <span >pageB2：枠登録</span>
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
            {user.namae}
            {/* <input type="text" onChange={(e) => setNamae(e.target.value)} /> */}
            <br />
            <h1>エリア</h1>
            {user.area}
            <input type="text" onChange={(e) => setArea(e.target.value)} />
            <br />
            *********************************************************************
            <br />
            <div >
                <Calendar
                    locale={"en-JP"}
                    value={new Date()}
                    tileContent={
                        getTileContent
                    }
                    calendarType={"US"}
                    prev2Label={null}
                    // next2Label={null}
                    onClickDay={clickDay}
                />
            </div>
            <br />
            <div>
                {add === 1 &&

                    // <span >App</span>
                    <p >
                        {
                            `${formatDate}の予約です`
                        }
                        <br />
                        <button onClick={clickMenu1}>
                            meiku: {menu}
                        </button>


                    </p>
                }
            </div>












            {/* <button onClick={registYoyaku}>登録</button> */}
        </div >
    )
}

export default PageB2

