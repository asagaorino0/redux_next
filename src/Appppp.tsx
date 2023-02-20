import React, { useState, useEffect } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { UserState } from './types/user';
import { addTomare } from './features/tomareSlice';
import Link from 'next/link';
import 'firebase/compat/firestore';
// import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase';
import dynamic from 'next/dynamic';
import {
    getDocs,
    collection,
    collectionGroup,
    query,
    orderBy,
    where,
    doc,
    setDoc,
    serverTimestamp,
    deleteDoc,
    onSnapshot,
} from 'firebase/firestore';
import { TomareState } from './types/tomare';
// import CustomerAccordion from '../components/CustomerAccordion';
import styles from '../styles/Home.module.css';
import PayReceipt from '../components/PayReceipt';
import SuccesReceipt from '../components/SuccesReceipt';
import PayAccordion from '../components/PayAccordion';
import MiPayAccordion from '../components/MiPayAccordion';
import { Provider } from 'react-redux';
import { store } from './app/store';
import CustomerAccordion from '../components/CustomerAccordion';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Appppp() {
    const [uid, setUid] = useState<string>('Uda1c6a4e5b348c5ba3c95de639e32414');
    const [name, setName] = useState<string>('eriko orino');
    const [icon, setIcon] = useState<string | undefined>('');
    const [tomare, setTomare] = useState<any>([]);
    const [payment, setPayment] = useState<any>([]);
    const [pay, setPay] = useState<any>([]);
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
            const q = query(
                collection(db, 'users', uid, 'tomare'),
                where('yoyakuUid', '==', uid)
            );
            const snapshot = await getDocs(q);
            const tomareData = snapshot.docs.map(
                (doc: any) => ({ ...doc.data() } as TomareState)
            );
            console.log('payData_profile.userId:', tomareData);
            dispatch(addUser(tomareData))
            setTomare(tomareData);

            const p = query(collection(db, 'yoyakuPay'), where('uid', '==', uid));
            const payData = snapshot.docs.map(
                (doc: any) => ({ ...doc.data() } as TomareState)
            );
            console.log('payData_profile.userId:', payData);
            console.log('payData:', payData);
            dispatch(addUser(payData));
            setPay(payData);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchPay();
        fetchTomare();
    }, []);

    const fetchPay = async () => {
        const p = query(collection(db, 'yoyakuPay'), where('yoyakuUid', '==', uid));
        const snapshot = onSnapshot(p, (querySnapshot) => {
            const payData = querySnapshot.docs.map(
                (docP) => ({ ...docP.data() } as TomareState)
            );
            console.log('pey:::::', pay, uid, pay.uid);
            dispatch(addUser(payData));
            setPay(payData);
        });
    };
    const fetchTomare = async () => {
        console.log('useEffect:::', `${uid}`);
        const t = query(
            collectionGroup(db, 'tomare'),
            where('yoyakuUid', '==', uid)
        );
        const snapshot = onSnapshot(t, (querySnapshot) => {
            const tomareData = querySnapshot.docs.map(
                (doc) => ({ ...doc.data() } as TomareState)
            );
            console.log('tomare:::::', tomare,);
            console.log('tomare:uid::::', uid);
            console.log('tomare:tomare.uid::::', tomare.uid);
            dispatch(addTomare(tomareData));
            setTomare(tomareData);
        });
    };

    const toPageA = () => {
        router.push('./PageA');
    };
    const toPageB = () => {
        router.push('./PageB');
    };
    const toPageC = () => {
        router.push('./PageC');
    };
    const toPagePay = () => {
        router.push('./PagePay');
    };
    const registA = () => {
        dispatch(addUser({ name, uid, icon }));
        toPageA();
    };
    const registB = () => {
        dispatch(addUser({ name, uid, icon }));
        toPageB();
    };
    const registC = () => {
        dispatch(addUser({ name, uid, icon }));
        toPageC();
    };
    const registPay = () => {
        dispatch(addUser({ name, uid, icon }));
        toPagePay();
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const receipt_url = location.search.substr(1, 200)
    const [display, setDisplay] = useState(true)
    return (
        <main>
            <div>
                <button onClick={fetchPay}>
                    <img
                        src={`${icon}`}
                        alt=""
                        style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                    />
                </button>
                <h1 className="mb-4 text-green-500 text-3xl">{name}さま </h1>
                <br />

                {`${pay}`.length === 0 && <h1>次の支払いを完了させてください</h1>}
                <React.StrictMode>
                    <Provider store={store}>
                        <br />
                        {pay.map((pay: TomareState) => {
                            console.log(pay.paymentIntent);
                            return (
                                <div key={pay.yoyakuId}>
                                    <div className={styles.grid}>
                                        {`${receipt_url}` === "" &&
                                            // `${pay.succes_url}`.toString() !== 'undefined' &&
                                            <PayAccordion pay={pay} key={pay.yoyakuId} />
                                        }

                                        <br />
                                        {/* {`${receipt_url}`.length !== 0 &&
                                            <PayReceipt pay={pay} key={pay.yoyakuId} />
                                        } */}
                                        {`${receipt_url}` !== "" &&
                                            <PayReceipt pay={pay} key={pay.yoyakuId} />
                                        }
                                        {`${tomare.succes_url}`.toString() !== 'undefined' &&
                                            <SuccesReceipt pay={pay} key={pay.yoyakuId} />
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </Provider>
                </React.StrictMode>
            </div>
            <br />
            {`${pay}`.length === 0 && (
                <div>
                    {`${tomare}`.length !== 0 && <h1>未払い</h1>}
                    <React.StrictMode>
                        <Provider store={store}>
                            <br />
                            {tomare.map((tomare: TomareState) => {
                                return (
                                    <div key={tomare.tomareId}>
                                        {/* {`${tomare.yoyakuMenu}` !== "" && */}
                                        {/* <div className={styles.grid}> */}
                                        <MiPayAccordion pay={tomare} key={tomare.tomareId} />
                                        {/* </div> */}
                                        {/* } */}
                                    </div>
                                );
                            })}
                        </Provider>
                    </React.StrictMode>
                </div>
            )}
            <br />
            <div className="App">
                {uid === '' && (
                    <div>
                        <button>
                            <h4 className="mb-4 text-green-500 text-3xl">ログイン</h4>
                        </button>
                    </div>
                )}
                {`${pay}`.length === 0 && (
                    <div>
                        <button onClick={registA}>
                            <h3 className="mb-4 text-green-500 text-3xl">マイページ</h3>
                        </button>
                        <br />
                        {/* <button onClick={registPay}>
                            <h3 className="mb-4 text-green-500 text-3xl">履歴</h3>
                        </button> */}
                        {/* <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <h3 className="mb-4 text-green-500 text-3xl">履歴</h3>
            </Button> */}
                        <br />
                        <div className="App">
                            <button onClick={() => setDisplay(!display)}>
                                <h3 className="mb-4 text-green-500 text-3xl">履歴</h3>
                            </button>
                            {display &&
                                tomare
                                    .map((tomare: TomareState) => {
                                        return (
                                            <div key={tomare.tomareId}>
                                                {`${tomare.yoyakuMenu}` !== "" &&
                                                    <div className={styles.grid}>
                                                        <CustomerAccordion tomare={tomare} key={tomare.tomareId} />
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                            }
                        </div>
                        {/* <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {
                tomare
                  .map((tomare: TomareState) => {
                    return (
                      <div key={tomare.tomareId}>
                        {`${tomare.yoyakuMenu}` !== "" &&
                          <div className={styles.grid}>
                            <CustomerAccordion tomare={tomare} key={tomare.tomareId} />
                          </div>
                        }
                      </div>
                    )
                  })
              }
            </Menu> */}

                        <br />
                        <button onClick={registC}>
                            <h3 className="mb-4 text-green-500 text-3xl">予約枠設定</h3>
                        </button>
                        <br />
                        <h3 className="mb-4  text-3xl">施術申込み</h3>
                        <button onClick={registB}>
                            <h3 className="mb-4 text-green-500 text-3xl">個人で申し込む</h3>
                        </button>

                        <button onClick={registB}>
                            <h3 className="mb-4 text-green-500 text-3xl">施設で申し込む</h3>
                        </button>
                    </div>
                )}
            </div>

            <footer className={styles.footer}>
                <a
                    href="https://konoyubi.site"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by <span className={styles.logo}>konoyubi</span>
                </a>
            </footer>
        </main>
    );
}
