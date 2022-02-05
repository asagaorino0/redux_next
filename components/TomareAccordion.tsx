import * as React from 'react';
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
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Stars } from "./Star";
import styles from '../styles/Home.module.css';
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../src/firebase";

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
    // const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setChecked(event.target.checked);
    //     console.log(checked)
    //     setDoc(doc(db, 'users', user.uid, 'tomare', `${tomare.tomareId}`), {
    //         checked: { checked },
    //     }, { merge: true })
    // };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const user = useSelector(selectUser);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    const [checked, setChecked] = React.useState([true, false]);


    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, checked[1]]);
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
                {/* <Checkbox
                    checked={tomare.checked}
                    onChange={handleCheck}
                    inputProps={{ 'aria-label': 'controlled' }}
                /> */}
                <Checkbox checked={checked[tomare.checked]} onChange={handleChange2} />

                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography className={styles.grid}>{tomare.tomareId}:{tomare.yoyakuMenu} 　 <Stars star={tomare.star} starSize={16} textSize={12} />　chip:{tomare.chip}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {/* <div className="flex justify-between ...">    */}
                        <div className="flex justify-evenly ...">                         <div>
                            {`${tomare.img_befor}`.length !== 0 &&
                                <img
                                    src={`${tomare.img_befor}`}
                                    alt=""
                                    style={{ width: '98%', margin: '0' }}
                                />}
                            {user.o_befor_come !== 0 &&
                                `${tomare.come_befor}`.length !== 0 && `${tomare.come_befor}`
                            }
                        </div>
                            <div>
                                {`${tomare.img_after}`.length !== 0 &&
                                    <img
                                        src={`${tomare.img_after}`}
                                        alt=""
                                        style={{ width: '98%', margin: '0' }}
                                    />}
                                {user.o_after_come !== 0 &&
                                    `${tomare.come_after}`.length !== 0 && `${tomare.come_after}`
                                }
                            </div>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/* <Accordion
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
            >
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Collapsible Group Item #2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                        lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
            >
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Collapsible Group Item #3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                        lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails> */}
            {/* </Accordion> */}
        </div>
    );
}

