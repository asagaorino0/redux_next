import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TomareState } from "../src/types/tomare";
import { UserState } from "../src/types/user";
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Stars } from "./Star";
import styles from '../styles/Home.module.css';
import { getFirestore, getDocs, collection, collectionGroup, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import { db } from "../src/firebase";
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
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const user = useSelector(selectUser);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    // const [checked, setChecked] = React.useState([true, false]);
    const [checked, setChecked] = React.useState<boolean>(tomare.checked);


    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setChecked([event.target.checked, checked[1]]);
        // setChecked([checked[1]]);
        console.log(checked)
        setDoc(doc(db, 'users', user.uid, 'tomare', `${tomare.tomareId}`), {
            checked: { checked },
        }, { merge: true })
    };


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

                    {tomare.pey === 0 &&
                        // <form action={`/api/checkout/${tomare.yoyakuId}/setup`} method="POST">
                        <form action={`/api/checkout/${tomare.uid}/setup`} method="POST">
                            <section>
                                <button type="submit" role="link" className={styles.card} >
                                    300
                                </button>
                            </section>
                        </form>
                    }
                    <Typography className={styles.grid}>{tomare.tomareId}:{tomare.yoyakuMenu}
                        <Stars star={tomare.star} starSize={16} textSize={12} />　chip:{tomare.chip}</Typography>
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

