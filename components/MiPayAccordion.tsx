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

export default function SimpleAccordion({ pay }: { pay: TomareState }) {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const handleStar = (e: number) => {
        setDoc(doc(db, 'yoyakuPay', `${pay.yoyakuId}`), { star: e }, { merge: true })
    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const user = useSelector(selectUser);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    // const [checked, setChecked] = React.useState([true, false]);
    // const [checked, setChecked] = React.useState<boolean>(pay.checked);

    const date = new Date()
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth() + 1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)
    const h = ("00" + date.getHours()).slice(-2)
    const m = ("00" + date.getMinutes()).slice(-2)
    const s = ("00" + date.getSeconds()).slice(-2)
    const now = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s

    const toStripe = () => {
        setDoc(doc(db, 'users', `${pay.uid}`, 'tomare', `${pay.tomareId}`), {
            pay: pay.pay,
            star: pay.star,
            chip: pay.chip,
            timestamp: now
            // tomareId: pay.tomareId,
            // yoyakuUid: pay.yoyakuUid,
            // yoyakuId: pay.yoyakuId,
            // img_befor: pay.img_befor,
            // img_after: pay.img_after,
        }, { merge: true })
    };


    return (
        <div>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                {/* <Checkbox checked={checked[pay.checked]} onChange={handleChange2} /> */}

                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    {pay.pay === 0 &&
                        // <form action={`/api/checkout/${pay.quantity}/setup`} method="POST">
                        <form action={`/api/users/${pay.yoyakuId}/setup`} method="POST">
                            <section>
                                <button type="submit" role="link" className={styles.card} onClick={() => toStripe()} >
                                    {`${pay.tanka * pay.quantity}円${pay.tanka}円
                                    ×${+ pay.quantity * 10} 分`}
                                </button>
                            </section>
                        </form>
                    }
                    <Typography className={styles.grid}>{pay.tomareId}:{pay.yoyakuMenu}
                        <br />
                        {pay.star !== 0 &&
                            <Stars star={pay.star} starSize={16} textSize={12} />}
                        {pay.star === 0 &&
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
                        {pay.chip !== 0 &&
                            `chip:${pay.chip}`
                        }
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {/* <div className="flex justify-between ...">    */}
                        <div className="flex justify-evenly ...">
                            <div>
                                <img src={pay.img_befor} alt="" />
                                {/* {pay.checked === true && user.o_befor_come !== 0 &&
                                    `${pay.come_befor}`} */}
                            </div>
                            <div>
                                <img src={pay.img_after} alt="" />
                                {/* {pay.checked === true && user.o_after_come !== 0 &&
                                    `${pay.come_after}`} */}
                            </div>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}

