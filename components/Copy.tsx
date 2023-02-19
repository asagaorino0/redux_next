

import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { selectColor } from '../src/features/colorSlice';

export default function Copy() {
    const color = useSelector(selectColor);
    const useStyles = makeStyles((theme: any) => ({
        info_h2: {
            position: 'relative',
            padding: '0.4em',
            // margin: '0.1em',     
            background: `${color.base}`,
            fontSize: '1.2em',
            fontWeight: 'bold',
            color: `${color.accent}`,
            '&::before': {
                position: 'absolute',
                content: '""',
                top: '100%',
                left: 0,
                border: 'none',
                borderBottom: 'solid 15px transparent',
                borderRight: `solid 20px${color.sub}`
            }
        },
        border: {
            padding: '6px',
            fontSize: '1.2em',
            fontWeight: 'bold',
            color: `${color.accent}`,
            background: `${color.base}`,
            borderBottom: `solid 6px ${color.sub}`,/*下線*/
        },
        headline: {
            fontSize: '1.2em',
            fontWeight: 'bold',
            position: 'relative',
            background: `${color.base}`,
            boxShadow: `0px 0px 0px 5px ${color.base}`,
            border: 'dashed 2px white',
            padding: '0.2em 0.5em',
            color: `${color.accent}`,
            '&::after': {
                position: 'absolute',
                content: '""',
                left: '-8px',
                top: '-8px',
                borderWidth: '0 0 16px 16px',
                borderStyle: 'solid',
                borderColor: `#fff #fff ${color.sub}`,
                boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.15)',
            }
        },
        masteTape: {
            position: 'absolute',
            top: '-0.75em',
            background: `${color.sub}`,
            filter: `opacity(55%)`,
            padding: '0.25em 2em',
            fontSize: '1.2em',
            fontWeight: 'bold',
            color: `${color.accent}`,
            transform: 'rotate(-3deg)',
            left: '3px',
        },
        masteBox: {
            position: 'relative',
            background: `repeating-linear-gradient(-45deg, ${color.base}, ${color.base} 10px, ${color.sub} 0, ${color.sub} 12px)`,
            padding: '1em',
        },
        masteBox_p: {
            fontSize: '1.2em',
            fontWeight: 'bold',
            color: `${color.accent}`,
            padding: '15px 10px 10px 10px',
            textAlign: 'left',
        }
    }));
    const classes = useStyles()
    return (
        <>
            <section className={classes.info_h2}>
                <>
                    Hello!World
                </>
            </section>
            <br />
            <br />
            <section className={classes.border}>
                <>
                    Hello!World
                </>
            </section>
            <br />
            <br />
            <section className={classes.headline}>
                <>
                    Hello!World
                </>
            </section>
            <br />
            <br />
            <section className={classes.masteBox}>
                <span className={classes.masteTape}>　　</span>
                <p className={classes.masteBox_p}>Hello!World</p>
            </section>
        </>
    );
}
