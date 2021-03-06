import React, { useState, useEffect, useLayoutEffect } from 'react';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { UserState } from "../src/types/user";
import { addTomare } from '../src/features/tomareSlice';
import 'firebase/compat/firestore';
// import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase';
import liff from '@line/liff';
import dynamic from 'next/dynamic';
import { getDocs, collection, collectionGroup, query, orderBy, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot } from 'firebase/firestore'
import { TomareState } from "../src/types/tomare";
import CustomerAccordion from '../components/CustomerAccordion';
import styles from '../styles/Home.module.css'
import SuccesReceipt from '../components/SuccesReceipt';
import PayAccordion from '../components/PayAccordion';
import PayReceipt from '../components/PayReceipt';
import MiPayAccordion from '../components/MiPayAccordion';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';
import { getURL } from 'next/dist/shared/lib/utils';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

export default function App() {
  const [uid, setUid] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<string | undefined>('');
  const [tomare, setTomare] = useState<any>([]);
  const [pay, setPay] = useState<any>([]);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter();
  const PageA = dynamic(() => import('../pages/PageA'), { ssr: false });
  // const PagePay = dynamic(() => import('./PagePay'), { ssr: false });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID as string })
      .then(async () => {
        if (liff.isLoggedIn()) {
          console.log('login status : [', true, ']');
          const profile = await liff.getProfile();
          console.log(
            '???? ~ file: Login.tsx ~ line 15 ~ liff.init ~ profile',
            profile
          );
          // const userId: string = profile.userId
          const displayName: string = profile.displayName;
          const displayicon: string | undefined = profile.pictureUrl;
          setName(profile.displayName);
          setUid(profile.userId);
          setName(displayName);
          setIcon(displayicon);

          const p = query(collection(db, 'yoyakuPay'), where('yoyakuUid', '==', profile.userId));
          const snapshotP = onSnapshot(p, (querySnapshot) => {
            const payData = querySnapshot.docs.map(
              (docP) => ({ ...docP.data() } as TomareState)
            );
            dispatch(addUser(payData));
            setPay(payData);
            console.log('pey*****', pay, uid, pay.uid);
          });

          const t = query(collectionGroup(db, 'tomare'), where("yoyakuUid", "==", profile.userId));
          const snapshotT = onSnapshot(t, (querySnapshot) => {
            const tomareData = querySnapshot.docs.map(
              (docT) => ({ ...docT.data() } as TomareState)
            );
            dispatch(addTomare(tomareData))
            setTomare(tomareData)
            console.log('tomare******', tomare, uid, tomare.uid);
          });
          dispatch(
            addUser({
              name: profile.displayName,
              uid: profile.userId,
              icon: profile.pictureUrl,
            })
          );
          setUid(profile.userId)
          const setRef = setDoc(
            doc(db, 'users', `${uid}`),
            {
              uid,
              name,
              icon,
              timestamp: '',
            },
            { merge: true });

        } else {
          console.log('login status : [', false, ']');
        }
      });
    // liff
    // }, [dispatch]);
  }, []);

  useLayoutEffect(() => {
    // setLoading(true);
    fetchPay();
    fetchTomare();
    // window.location.reload
  }, []);

  const fetchPay = async () => {
    console.log('pey:uid::pay.uid::', uid, pay.uid);
    const p = query(collection(db, 'yoyakuPay'), where('yoyakuUid', '==', uid));
    const snapshot = onSnapshot(p, (querySnapshot) => {
      const payData = querySnapshot.docs.map(
        (docP) => ({ ...docP.data() } as TomareState)
      );
      dispatch(addUser(payData));
      setPay(payData);
      console.log('pey:::::', pay, uid, pay.uid);
    });
  };
  const fetchTomare = async () => {
    const q = query(collectionGroup(db, 'tomare'), where("yoyakuUid", "==", `${uid}`));
    const snapshot = onSnapshot(q, (querySnapshot) => {
      const tomareData = querySnapshot.docs.map(
        (doc) => ({ ...doc.data() } as TomareState))
      dispatch(addTomare(tomareData))
      setTomare(tomareData)
      console.log('tomare:::::', tomare, uid, pay.uid);
    });
  }

  const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID;
  const lineClick = () => {
    setUid('');
    liff.init({ liffId: LINEID as string }).then(() => {
      if (!liff.isLoggedIn()) {
        setUid('k00000');
        liff.login(); // ????????????????????????????????????????????????????????????
      } else if (liff.isInClient()) {
        console.log('hello world');
      }
    });
  }; ///??????

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
    toPageA()
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
    toPagePay()
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
  const [display, setDisplay] = useState(false)
  return (
    <main>
      <div>
        <button onClick={fetchTomare}>
          <img
            src={`${icon}`}
            alt=""
            style={{ borderRadius: '50%', width: '60px', height: '60px' }}
          />
        </button>
        <h1 className="mb-4 text-green-500 text-3xl">{name}?????? </h1>
        <br />

        {`${pay}`.length !== 0 && <h1>?????????????????????????????????????????????</h1>}
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
                    {`${receipt_url}`.length !== 0 &&
                      <PayReceipt pay={pay} key={pay.yoyakuId} />
                    }
                    {`${pay.succes_url}`.toString() !== 'undefined' &&
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
          {`${tomare}`.length !== 0 && <h1>?????????</h1>}
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
            <button onClick={lineClick}>
              <h4 className="mb-4 text-green-500 text-3xl">????????????</h4>
            </button>
          </div>
        )}
        {`${pay}`.length === 0 && (
          <div>
            <button onClick={registA}>
              <h3 className="mb-4 text-green-500 text-3xl">???????????????</h3>
            </button>
            <br />
            {/* <button onClick={registPay}>
                            <h3 className="mb-4 text-green-500 text-3xl">??????</h3>
                        </button> */}
            {/* <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <h3 className="mb-4 text-green-500 text-3xl">??????</h3>
            </Button> */}
            <br />
            <div className="App">
              <button onClick={() => setDisplay(!display)}>
                <h3 className="mb-4 text-green-500 text-3xl">??????</h3>
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
            {/* {
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
            } */}
            <br />
            <button onClick={registC}>
              <h3 className="mb-4 text-green-500 text-3xl">???????????????</h3>
            </button>
            <br />
            <h3 className="mb-4  text-3xl">???????????????</h3>
            <button onClick={registB}>
              <h3 className="mb-4 text-green-500 text-3xl">?????????????????????</h3>
            </button>
            <br />
            <button onClick={registB}>
              <h3 className="mb-4 text-green-500 text-3xl">?????????????????????</h3>
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
