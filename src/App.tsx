import React, { useState, useEffect, useLayoutEffect } from 'react';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { addTomare } from '../src/features/tomareSlice';
import 'firebase/compat/firestore';
import { db } from './firebase';
import liff from '@line/liff';
import { collection, collectionGroup, query, where, doc, setDoc, onSnapshot } from 'firebase/firestore'
import { TomareState } from "../src/types/tomare";




export default function App() {
  const [uid, setUid] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<string | undefined>('');
  const [tomare, setTomare] = useState<any>([]);
  const [pay, setPay] = useState<any>([]);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter();
  // const PageA = dynamic(() => import('../pages/PageA'), { ssr: false });
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
            '🚀 ~ file: Login.tsx ~ line 15 ~ liff.init ~ profile',
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
        liff.login(); // ログインしていなければ最初にログインする
      } else if (liff.isInClient()) {
        console.log('hello world');
      }
    });
  }; ///先生
  // const color = useSelector(selectColor);
  // const MtBox_p = styled(MuiBox)(() => ({
  //   fontSize: '1.2em',
  //   fontWeight: 'bold',
  //   color: `${color.accent}`,
  //   padding: '15px 10px 10px 10px',
  //   textAlign: 'left',
  // }));
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
  // const receipt_url = location.search.substr(1, 200)
  const [display, setDisplay] = useState(false)
  return (
    <main>
      <div className="h-screen w-4/5 max-w-5xl mx-auto flex justifycenter flex-col">

        <section className="h-screen w-4/5 max-w-5xl mx-auto flex justifycenter flex-col">
          {/* <InputColor /> */}
          {/* <br />
          <Copy /> */}

          {/* <p className="mb-2 text-center">sample text</p> */}
        </section>
      </div>
      {icon &&
        <>
          <button onClick={fetchTomare}>
            <img
              src={`${icon}`}
              alt=""
              style={{ borderRadius: '50%', width: '60px', height: '60px' }} />
          </button>
          <h1 className="mb-4 text-green-500 text-3xl">{name}さま </h1>
          <br />
        </>
      }

      {`${pay}`.length !== 0 && <h1>次の支払いを完了させてください</h1>}


      <br />
      {`${pay}`.length === 0 && (
        <div>
          {`${tomare}`.length !== 0 && <h1>未払い</h1>}
        </div>
      )}
      <br />
      <div className="App">
        {uid === '' && (
          <div>
            <button onClick={lineClick}>
              <h4 className="mb-4 text-green-500 text-3xl">ログイン</h4>
            </button>
          </div>
        )}
        {`${pay}`.length === 0 && (
          <div>
            {/* <section className="p-5"> */}
            <button onClick={registA}>
              {/* <MtBox_p > */}
              <h3 className="mb-4 text-3xl">マイページ</h3>
              {/* </MtBox_p> */}
            </button>
            {/* </section> */}
            {/* <br />
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
            </div> */}
            <br />
            {/* <button onClick={registC}>
              <h3 className="mb-4 text-green-500 text-3xl">予約枠設定</h3>
            </button>
            <br /> */}
            {/* <h3 className="mb-4  text-3xl">施術申込み</h3>
            <button onClick={registB}>
              <h3 className="mb-4 text-green-500 text-3xl">個人で申し込む</h3>
            </button>
            <br /> */}
            {/* <button onClick={registB}>
              <h3 className="mb-4 text-green-500 text-3xl">施設で申し込む</h3>
            </button> */}
          </div>
        )}
      </div>

      {/* <footer className={styles.footer}> */}
      <a
        href="https://konoyubi.site"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Powered by <span className={styles.logo}>konoyubi</span> */}
      </a>
      {/* </footer> */}
    </main >
  );
}
