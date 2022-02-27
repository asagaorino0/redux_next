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
    // const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const receipt_url = location.search.substr(1, 200)
    return (
        <div className={styles.card}>

            <Typography className={styles.grid}>
                <br />
                領収書は決済後、履歴ページから確認できます。
                {/* <a href={receipt_url}  >領収書</a> */}
            </Typography>
            <AccordionDetails>
                <Typography>
                    <div className="flex justify-between ...">
                        <br />
                        <h3 className="mb-4 text-green-500 text-3xl">
                            <a href={receipt_url}  >領収書</a>
                        </h3>
                    </div >
                </Typography>
            </AccordionDetails>
            {/* </Accordion> */}

        </div>
    );
}

