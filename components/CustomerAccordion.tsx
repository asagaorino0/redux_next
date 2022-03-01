import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { TomareState } from "../src/types/tomare";
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Stars } from "./Star";
import { BsStar } from "react-icons/bs";
import styles from '../styles/Home.module.css';
import { db } from "../src/firebase";
import {
    collection,
    query,
    where,
    doc,
    setDoc,
    onSnapshot,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function SimpleAccordion({ tomare }: { tomare: TomareState }) {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleStar = (e: number) => {
        setDoc(doc(db, 'users', `${tomare.uid}`, 'tomare', `${tomare.tomareId}`), { star: e }, { merge: true });
        toHome()
    };
    const amountSub = tomare.tanka * tomare.quantity
    const amount = tomare.tanka * tomare.quantity + tomare.chip
    // const apiYoyakuId = `${tomare.yoyakuId}${amount}`
    const stQua = 100 + tomare.quantity * 1
    const yoyakuId = `${stQua}${tomare.uid}${tomare.yoyakuUid}${tomare.tomareId}`
    const handleChip = (e: number) => {
        // setDoc(doc(db, 'users', `${tomare.uid}`, 'tomare', `${tomare.tomareId}`), { chip: e, chipUrl: `${process.env.STRIPE_SECRET_e}` }, { merge: true })
    };
    const handleChip500 = (e: number) => {
        setDoc(doc(db, 'users', `${tomare.uid}`, 'tomare', `${tomare.tomareId}`), { chip: e, cusPay: amount * 1 + e, chipUrl: "shr_1KXTkfIeKRfM8LCeTmYH0csl", yoyakuId: `${yoyakuId}shr_1KXTkfIeKRfM8LCeTmYH0csl` }, { merge: true })
        toHome()
    };
    const handleChip1000 = (e: number) => {
        setDoc(doc(db, 'users', `${tomare.uid}`, 'tomare', `${tomare.tomareId}`), { chip: e, cusPay: amount + e, chipUrl: "shr_1KXaVyIeKRfM8LCeQ9dJPPvV", yoyakuId: `${yoyakuId}shr_1KXaVyIeKRfM8LCeQ9dJPPvV` }, { merge: true })
        toHome()
    };
    // const [setPay] = useState<any>([]);
    // const dispatch = useDispatch();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const user = useSelector(selectUser);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    const router = useRouter();
    const toHome = () => {
        router.push('./');
    };
    const date = new Date()
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth() + 1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)
    const h = ("00" + date.getHours()).slice(-2)
    const m = ("00" + date.getMinutes()).slice(-2)
    const s = ("00" + date.getSeconds()).slice(-2)
    const now = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s

    const toStripe = () => {
        setDoc(doc(db, 'yoyakuPay', `${tomare.yoyakuId}`), {
            // pay: 1,
            yoyakuId: tomare.yoyakuId,
            amount,
            uid: tomare.uid,
            star: tomare.star,
            chip: tomare.chip,
            timestamp: now,
            tomareId: tomare.tomareId,
            yoyakuMenu: tomare.yoyakuMenu,
            yoyakuUid: tomare.yoyakuUid,
            img_befor: tomare.img_befor,
            img_after: tomare.img_after,
        }, { merge: true })
        toHome()
    };

    // const fetchPay = async () => {
    //     const p = query(collection(db, 'yoyakuPay'), where('yoyakuUid', '==', tomare.uid));
    //     const snapshot = onSnapshot(p, (querySnapshot) => {
    //         const payData = querySnapshot.docs.map(
    //             (docP) => ({ ...docP.data() } as TomareState)
    //         );
    //         dispatch(addUser(payData));
    //         setPay(payData);
    //     });
    // };

    return (
        <div>
            {tomare.pay === 0 &&

                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                >
                    {/* <Checkbox checked={checked[tomare.checked]} onChange={handleChange2} /> */}

                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">

                        <Typography className={styles.grid}>{tomare.tomareId}:{tomare.yoyakuMenu}
                            <br />
                            {`${tomare.chip}`.toString() === 'undefined' &&
                                <div className={styles.card} >
                                    {`${amountSub}円`}
                                    <br />
                                    {`${tomare.tanka}円×${+ tomare.quantity * 10} 分`}
                                </div>
                            }
                            {tomare.star !== 0 &&
                                <Stars star={tomare.star} starSize={16} textSize={12} />}
                            {tomare.star === 0 &&
                                <div>
                                    {/* <br /> */}
                                    <button onClick={(e) => handleStar(1)}><BsStar /></button>
                                    <button onClick={(e) => handleStar(2)}><BsStar /></button>
                                    <button onClick={(e) => handleStar(3)}><BsStar /></button>
                                    <button onClick={(e) => handleStar(4)}><BsStar /></button>
                                    <button onClick={(e) => handleStar(5)}><BsStar /></button>
                                    <br />
                                    まだ評価されていません
                                </div>
                            }
                            {tomare.chip !== 0 &&
                                `chip:${tomare.chip}`
                            }
                            {tomare.receipt_url !== "" &&
                                <section>
                                    <a href={tomare.receipt_url}  >領収書</a>
                                </section>
                            }
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {/* <div className="flex justify-between ...">    */}
                            <div className="flex justify-evenly ...">
                                <div>
                                    <img src={tomare.img_befor} alt="" />
                                    {/* {tomare.checked === true && user.o_befor_come !== 0 &&
                                    `${tomare.come_befor}`} */}
                                </div>
                                <div>
                                    <img src={tomare.img_after} alt="" />
                                    {/* {tomare.checked === true && user.o_after_come !== 0 &&
                                    `${tomare.come_after}`} */}
                                </div>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            }
        </div >
    );
}

