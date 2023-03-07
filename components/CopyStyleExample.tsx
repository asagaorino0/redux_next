import { selectColor } from '@/features/colorSlice';
import { ColorStateType } from '@/types/ColorStateType';
import { useSelector } from 'react-redux';
////PageEditCopyStyleに表示するキャッチコピーのサンプル集////
export default function CopyStyleExample() {
    const color = useSelector(selectColor);
    return (
        <>
            <div className="w-full mt-12">
                <h2>色見本</h2>
                <br />
                パターンA
                <SelectCopyPatternA color={color} copy="１２３４５６７８９０１２３４５６７８９０：sample" />
                <br />
                パターンB
                <SelectCopyPatternB color={color} copy="Hello!World" />
                <br />
                パターンC
                <SelectCopyPatternC color={color} copy="Hello!World" />
            </div>
        </>
    );
}

export const SelectCopyPatternA = ({ color, copy }: { color: ColorStateType, copy: string }) => {
    const boxStyle: React.CSSProperties = {
        position: 'relative',
        padding: '0.4em',
        background: `${color.base}`,
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: `${color.moji}`,
    };
    const beforeStyle: React.CSSProperties = {
        position: 'absolute',
        content: '""',
        top: '100%',
        left: 0,
        border: 'none',
        borderBottom: 'solid 15px transparent',
        borderRight: `solid 20px ${color.sub}`
    };
    return (
        <section className="p-2">
            <div style={boxStyle}>
                {copy}
                <div style={beforeStyle} />
            </div>
        </section>
    );
};
export const SelectCopyPatternB = ({ color, copy }: { color: ColorStateType, copy: string }) => {
    const boxStyle: React.CSSProperties = {
        padding: '0.4em',
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: `${color.moji}`,
        background: `${color.base}`,
        borderBottom: `solid 6px ${color.sub}`
    };

    return (
        <section className="p-2">
            <div style={boxStyle}>
                {copy}
            </div>
        </section>
    );
};
export const SelectCopyPatternC = ({ color, copy }: { color: ColorStateType, copy: string }) => {
    const boxStyle: React.CSSProperties = {
        fontSize: '1.2em',
        fontWeight: 'bold',
        position: 'relative',
        background: `${color.base}`,
        boxShadow: `0px 0px 0px 5px ${color.base}`,
        border: 'dashed 2px white',
        padding: '0.2em 0.5em',
        color: `${color.moji}`,
    };
    const afterStyle: React.CSSProperties = {
        position: 'absolute',
        content: '""',
        left: '-8px',
        top: '-8px',
        borderWidth: '0 0 16px 16px',
        borderStyle: 'solid',
        borderColor: `#fff #fff ${color.sub}`,
        boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.15)',
    };
    return (
        <section className="p-2">
            <div style={boxStyle}>
                <div style={afterStyle} />
                {copy}

            </div>
        </section>
    );
};

