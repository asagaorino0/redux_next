import React, { useState, useEffect } from 'react';
import { selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers } from './features/usersSlice';
import { addTomare } from './features/tomareSlice';
import { useRouter } from 'next/router';
import { db } from './firebase';
import {
    getDocs,
    collection,
    collectionGroup,
    query,
    where,
} from 'firebase/firestore';
import { UsersState } from '../src/types/users';
import { TomareState } from '../src/types/tomare';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../styles/Home.module.css';
import { addFormatdate, selectFormatdate } from './features/formatDateSlice';
import {
    addTargetTomare,
    selectTargetTomare,
} from './features/targetTomareSlice';
import { selectTarget } from './features/targetSlice';

const PageM1 = () => {
    const [namae, setNamae] = useState<string>('');
    const [sei, setSei] = useState<string>('');
    const [gappi, setGappi] = useState<string>('');
    const [tokoro, setTokoro] = useState<string>('');
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [users, setUsers] = useState<any>([]);
    const [tomare, setTomare] = useState<any>([]);
    const formatdate = useSelector(selectFormatdate);
    const targetTomare = useSelector(selectTargetTomare);
    const target = useSelector(selectTarget);
    const router = useRouter();

    const getTileContent = (props: any) => {
        let year = props.date.getFullYear();
        let month = props.date.getMonth() + 1;
        let day = props.date.getDate();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        const formatDate = year + month + day;
        if (props.view !== 'month') {
            return null;
        }
        return (
            <div>
                {targetTomare.tomare &&
                    targetTomare.tomare.map((data: any) => {
                        if (formatDate === data.gappi) {
                            return (
                                <div key={data.id}>
                                    <div>{data.menu}</div>
                                </div>
                            );
                        }
                    })}
                <div />
            </div>
        );
    };
    const clickDay = async (calendar: any) => {
        console.log('tomare:', tomare.uid);
        let year = calendar.getFullYear();
        let month = calendar.getMonth() + 1;
        let day = calendar.getDate();
        month = ('0' + month).slice(-2);
        day = ('0' + day).slice(-2);
        const formatDate = year + month + day;
        dispatch(addFormatdate(year + month + day));
        const q = query(
            collectionGroup(db, 'tomare'),
            where('gappi', '==', formatDate)
        );
        const snapshot = await getDocs(q);
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState)
        );
        dispatch(addTargetTomare(tomareData));
        // setTargetTomare(tomareData)
        toPageD();
    };
    const fetchUsers = async () => {
        const q = query(collection(db, 'users'));
        const snapshot = await getDocs(q);
        const usersData = snapshot.docs.map(
            (doc: any) => ({ ...doc.data() } as UsersState)
        );
        dispatch(addUsers({ usersData }));
        setUsers(usersData);
        console.log('usersData:', usersData);
        console.log('users:', users);
    };
    const fetchTomare = async () => {
        console.log(formatdate);
        const q = query(collectionGroup(db, 'tomare'));
        const snapshot = await getDocs(q);
        const tomareData = snapshot.docs.map(
            (docT: any) => ({ ...docT.data() } as TomareState)
        );
        dispatch(addTomare(tomareData));
        setTomare(tomareData);
        console.log('tomareData:', tomareData);
        console.log('tomare:', tomare);
    };
    useEffect(() => {
        fetchUsers();
        fetchTomare();
    }, []);

    const toPageB = () => {
        router.push('./PageB');
    };
    const toPageD = () => {
        router.push('./PageD');
    };

    return (
        <div className={styles.main}>
            <span>pageM1：登録</span>
            {/* {`${user.icon}`.length !== 0 && */}
            <img
                src={`${user.icon}`}
                alt=""
                style={{ borderRadius: '50%', width: '60px', height: '60px' }}
            />
            {/* } */}
            {`${user.icon}`.length !== 0 && (
                <h1 className="mb-4 text-green-500 text-3xl">{user.name}さま </h1>
            )}
            <h1>氏名</h1>
            {users.namae}
            <input type="text" onChange={(e) => setNamae(e.target.value)} />
            <br />
            <h1>性別</h1>
            <input type="text" onChange={(e) => setSei(e.target.value)} />
            <br />
            <h1>住所</h1>
            <input type="text" onChange={(e) => setTokoro(e.target.value)} />
            <br />
            *********************************************************************
            <br />
            <div>
                <Calendar
                    locale={'en-JP'}
                    value={new Date()}
                    tileContent={getTileContent}
                    calendarType={'US'}
                    prev2Label={null}
                    next2Label={null}
                    onClickDay={clickDay}
                />
            </div>
            <br />
            <div>
                {`${users}`.length !== 0 &&
                    users.map((users: UsersState) => {
                        const img_make: any = {
                            src: 'https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_make.png?alt=media&token=eeaf12cd-39be-4fda-8945-ec2bcb1b24dd',
                            alt: 'ケアメイク',
                            style: { width: '60px', height: '45px' },
                        };
                        const img_nail: any = {
                            src: 'https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_nail.png?alt=media&token=42117e21-66df-4049-a948-46840912645a',
                            alt: 'ケアネイル',
                            style: { width: '60px', height: '45px' },
                        };
                        const img_este: any = {
                            src: 'https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_este.png?alt=media&token=5fe75701-ec95-424a-8ba7-a547e313dd19',
                            alt: 'ケアエステ',
                            style: { width: '60px', height: '45px' },
                        };
                        const img_sonota: any = {
                            src: 'https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/P_hoka.png?alt=media&token=0d98a224-f460-4527-8208-209f6a52a55c',
                            alt: 'その他',
                            style: { width: '60px', height: '45px' },
                        };

                        return (
                            <div key={users.uid}>
                                {target &&
                                    targetTomare.tomare
                                        .filter((tomare: TomareState) => tomare.uid === users.uid && tomare.menu !== "")
                                        .map((tomare: TomareState) => {
                                            if (`${users.uid}` === `${tomare.uid}`) {
                                                return (
                                                    <div key={users.uid}>
                                                        <br />
                                                        <img
                                                            src={`${users.icon}`}
                                                            alt=""
                                                            style={{
                                                                borderRadius: '50%',
                                                                width: '60px',
                                                                height: '60px',
                                                            }}
                                                        />
                                                        {/* <h1>氏名（屋号）</h1> */}
                                                        <h3 className="mb-4  text-3xl">{users.name}</h3>
                                                        <h3 className="mb-4 text-green-500 text-3xl">
                                                            {tomare.gappi}：{tomare.menu}
                                                        </h3>
                                                        <div className={styles.grid}>
                                                            {tomare.make === true && (
                                                                <p>
                                                                    <img {...img_make} />
                                                                </p>
                                                            )}
                                                            {tomare.nail === true && (
                                                                <p>
                                                                    <img {...img_nail} />
                                                                </p>
                                                            )}
                                                            {tomare.este === true && (
                                                                <p>
                                                                    <img {...img_este} />
                                                                </p>
                                                            )}
                                                            {`${tomare.sonota}`.length !== 0 && (
                                                                <img {...img_sonota} />
                                                            )}
                                                        </div>
                                                        <br />
                                                    </div>
                                                );
                                            }
                                        })}
                            </div>
                        );
                    })}
                <button onClick={toPageB}>戻る</button>
            </div>
        </div>
    );
};
export default PageM1;
