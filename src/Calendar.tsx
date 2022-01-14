import React, { useState, useEffect } from 'react';
import { addFormatdate, } from './features/formatDateSlice';
import { addTomare, selectTomare, } from './features/tomareSlice';
import { addUsers, selectUsers, } from './features/usersSlice';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from "./firebase";
import { getFirestore, getDocs, collection, collectionGroup, query, where, onSnapshot, doc, setDoc, Timestamp, serverTimestamp, addDoc } from 'firebase/firestore'
import { store } from './app/store';
import { Provider } from 'react-redux';
import { UsersState } from "./types/users";
import { TomareState } from "./types/tomare";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = ({ users }: { users: UsersState }) => {
    // const [users, setUsers] = useState<any>([]);
    // const [uid, setUid] = useState<string>(user.uid);
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [age, setAge] = useState<number>(0);
    const [namae, setNamae] = useState<string>("");
    const [sei, setSei] = useState<string>("");
    const [menu, setMenu] = useState<string>('');
    const [option1, setOption1] = useState<string>('');
    const [option2, setOption2] = useState<string>('');
    const [gappi, setGappi] = useState<string>('');
    const [tokoro, setTokoro] = useState<string>('');
    const [star, setStar] = useState<number>(0);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [tomare, setTomare] = useState<any>([]);
    const [formatDate, setFormatDate] = useState<any>([]);

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
                        .map((data: any) => {
                            if (formatDate === data.gappi && data.uid === users.uid) {
                                return (
                                    <div key={data.uid}>
                                        <div>
                                            {data.menu}
                                        </div>
                                    </div>
                                )
                            }
                        })
                }
                <div />
                {/* {formatDate} */}
            </div>
        );
    };
    const clickDay = (calendar: any) => {
        let year = calendar.getFullYear();
        let month = calendar.getMonth() + 1;
        let day = calendar.getDate();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        const formatDate = year + month + day;
        setGappi(formatDate)
        alert(gappi)
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
        </div>
    );
}

export default CalendarPage