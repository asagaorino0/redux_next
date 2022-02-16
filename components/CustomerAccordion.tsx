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
import { doc, setDoc } from 'firebase/firestore'
import { db } from "../src/firebase";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { UserState } from "../src/types/user";

import TomareFileUpload from '../components/TomareFileUpload';
import TomareFileChenge from '../components/TomareFileChenge';

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
    // const [checked, setChecked] = React.useState(true);
    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        // setChecked([event.target.checked, checked[1]]);
        console.log(checked, `${tomare.tomareId}`)
        setDoc(doc(db, 'users', `${tomare.uid}`, 'tomare', `${tomare.tomareId}`), {
            checked: event.target.checked,
        }, { merge: true })
    };
    const handleStar = (e: number) => {
        setDoc(doc(db, 'users', `${tomare.uid}`, 'tomare', `${tomare.tomareId}`), { star: e }, { merge: true })
    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const user = useSelector(selectUser);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    // const [checked, setChecked] = React.useState([true, false]);
    const [checked, setChecked] = React.useState<boolean>(tomare.checked);


    const toStripe = () => {
        // setChecked([event.target.checked, checked[1]]);
        // setChecked([checked[1]]);
        // console.log(`:::tomare.yoyakuId:::`, tomare.yoyakuId)
        // setDoc(doc(db, 'users', user.uid, 'tomare', `${tomare.tomareId}`), {
        // }, { merge: true })
        setDoc(doc(db, 'yoyakuPay', `${tomare.yoyakuId}`), {
            tomareId: tomare.tomareId,
            pay: +tomare.tanka * tomare.quantity,
            yoyakuUid: tomare.yoyakuUid,
            yoyakuId: tomare.yoyakuId,
            star: tomare.star,
            chip: tomare.chip,
        }, { merge: true })
    };
    // const quantity = `${tomare.quantity}`

    return (
        <div>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                {/* <Checkbox checked={checked[tomare.checked]} onChange={handleChange2} /> */}

                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    {/* <Checkbox
                        checked={checked}
                        onChange={handleCheck}
                        inputProps={{ 'aria-label': 'controlled' }}
                    /> */}

                    {tomare.pay === 0 &&
                        // <form action={`/api/checkin/${tomare.uid}/setup`} method="POST">
                        <form action={`/api/checkout/${tomare.quantity}/setup`} method="POST">
                            {/* // <form action={`/api/checkin/${tomare.uid}/setup`} method="POST"> */}
                            <section>
                                <button type="submit" role="link" className={styles.card} onClick={() => toStripe()} >
                                    {`${tomare.tanka * tomare.quantity}円${tomare.tanka}円
                                    ×${+ tomare.quantity * 10} 分`}
                                </button>
                            </section>
                        </form>
                    }
                    <Typography className={styles.grid}>{tomare.tomareId}:{tomare.yoyakuMenu}
                        <br />
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
                                まだ評価されていません
                                <br />
                            </div>
                        }
                        {tomare.chip !== 0 &&
                            `chip:${tomare.chip}`
                        }
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {/* <div className="flex justify-between ...">    */}
                        <div className="flex justify-evenly ...">
                            <div>
                                {tomare.checked === true &&
                                    <img src={tomare.img_befor} alt="" />
                                }
                                {tomare.checked === true && user.o_befor_come !== 0 &&
                                    `${tomare.come_befor}`
                                }
                            </div>
                            <div>
                                {tomare.checked === true &&
                                    <img src={tomare.img_after} alt="" />
                                }
                                {tomare.checked === true && user.o_after_come !== 0 &&
                                    `${tomare.come_after}`
                                }
                            </div>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}

