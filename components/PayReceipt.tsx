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
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { doc, setDoc } from 'firebase/firestore'
import { db } from "../src/firebase";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


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
    // const receipt_url = location.search.substr(1, 200)
    // const receipt_url = location.search.substr(1, 200)
    // const receipt_url1 = location.search.substr(1, 200)
    // const receipt_url2 = location.href
    // const receipt_url3 = getURL()
    // console.log(`get:::`, receipt_url3)
    const date = new Date()
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth() + 1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)
    const h = ("00" + date.getHours()).slice(-2)
    const m = ("00" + date.getMinutes()).slice(-2)
    const s = ("00" + date.getSeconds()).slice(-2)
    const now = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
    const receipt_url = location.search.substr(1, 200)
    const router = useRouter();
    const toHome = () => {
        router.push('./');
    };

    const toStripe = () => {
        const receipt_url = location.search.substr(1, 200)
        setDoc(doc(db, 'users', `${pay.uid}`, 'tomare', `${pay.tomareId}`), {
            pay: pay.amount,
            star: pay.star,
            receipt_url,
            timestamp: now
        }, { merge: true });
        // toHome()
    };
    const setReceipt = () => {
        const receipt_url = location.search.substr(1, 200)
        const succes_url = location.href
        setDoc(doc(db, 'yoyakuPay', `${pay.yoyakuId}`), {
            // succes_url,
            // receipt_url,
            timestamp: now
        }, { merge: true })
        toHome()
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (

        <div className={styles.card}>
            {/* {`${receipt_url}`.length !== 0 && */}

            <Typography className={styles.grid}>
                <br />
                領収書は決済後、履歴ページから確認できます。
                {/* <a href={receipt_url}  >領収書</a> */}
            </Typography>
            <AccordionDetails>
                <Typography>
                    <div >
                        {/* <button onClick={() => setReceipt()} className="flex justify-between ...">
                            <br />
                            <h3 className="mb-4 text-green-500 text-3xl">
                                <a href={pay.receipt_url}  > 領収書</a>
                            </h3>
                        </button> */}
                    </div >

                    {/* <div> */}
                    {/* <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            Dashboard
                        </Button> */}
                    {/* <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <button onClick={() => setReceipt()} className="flex justify-between ...">
                                <br />
                                <h3 className="mb-4 text-green-500 text-3xl">
                                    <a href={pay.receipt_url}  >   領収書</a>
                                </h3>
                            </button>
                        </Menu> */}
                    {/* <iframe src={pay.receipt_url}
                            width="320" height="320"></iframe>

                    </div> */}
                </Typography>
            </AccordionDetails>
            <div>
                ご利用ありがとうございました
                <button className={styles.card} onClick={() => toStripe()} >
                    戻る
                </button>
            </div>
            {/* } */}
        </div>
    );
}

