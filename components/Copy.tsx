
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import MuiBox from '@mui/material/Box';
import { selectColor } from '../src/features/colorSlice';

export default function Copy() {
    const color = useSelector(selectColor);
    const BoxA = styled(MuiBox)(() => ({
        position: 'relative',
        padding: '0.4em',
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
        },
    }));
    const BoxB = styled(MuiBox)(() => ({
        padding: '6px',
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: `${color.accent}`,
        background: `${color.base}`,
        borderBottom: `solid 6px ${color.sub}`
    }));
    const BoxC = styled(MuiBox)(() => ({
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
    }));
    const BoxMT = styled(MuiBox)(() => ({
        background: `repeating-linear-gradient(-45deg, ${color.base}, ${color.base} 10px, ${color.sub} 0, ${color.sub} 12px)`,
        filter: `opacity(55%)`,
        padding: '0.25em 2em',
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: `${color.accent}`,
        transform: 'rotate(-3deg)',
        left: '3px',
    }));
    const MtBox = styled(MuiBox)(() => ({
        position: 'relative',
        background: `repeating-linear-gradient(-45deg, ${color.base}, ${color.base} 10px, ${color.sub} 0, ${color.sub} 12px)`,
        padding: '1em',
    }));
    const MtBox_p = styled(MuiBox)(() => ({
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: `${color.accent}`,
        padding: '15px 10px 10px 10px',
        textAlign: 'left',
    }));
    return (
        <>
            <section className="p-2">
                <BoxA >
                    Hello!World
                </BoxA>
            </section>
            <br />
            <section className="p-2">
                <BoxB >
                    Hello!World
                </BoxB>
            </section>
            <br />
            <section className="p-2">
                <BoxC >
                    Hello!World
                </BoxC>
            </section>
            <section className="p-5">
                <BoxMT>
                    <MtBox_p >
                        Hello!World
                    </MtBox_p>
                </BoxMT>
            </section>
        </>
    );
}
