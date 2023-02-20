import React, { } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addColor, selectColor } from '../src/features/colorSlice';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function InputColor() {
    const color = useSelector(selectColor);
    const dispatch = useDispatch();

    const inputBase = (event: any) => {
        const newValueB = event.target.value
        dispatch(addColor({
            base: newValueB,
            accent: color.accent,
            sub: color.sub,
            mozi: color.mozi,
        }))
    }
    const inputAccent = (event: any) => {
        const newValueA = event.target.value
        dispatch(addColor({
            base: color.base,
            accent: newValueA,
            sub: color.sub,
            mozi: color.mozi,
        }))
    }
    const inputSub = (event: any) => {
        const newValueS = event.target.value
        dispatch(addColor({
            base: color.base,
            accent: color.accent,
            sub: newValueS,
            mozi: color.mozi,
        }))
    }
    const inputMozi = (event: any) => {
        const newValueM = event.target.value
        dispatch(addColor({
            base: color.base,
            accent: color.accent,
            sub: color.sub,
            mozi: newValueM,
        }))
    }
    const copyB = () => {
        var clipboardText = `${color.base}`;
        navigator.clipboard.writeText(clipboardText);
    }
    const copyA = () => {
        var clipboardText = `${color.accent}`;
        navigator.clipboard.writeText(clipboardText);
    }
    const copyS = () => {
        var clipboardText = `${color.sub}`;
        navigator.clipboard.writeText(clipboardText);
    }
    return (
        <>
            <div className="flex  flex-row justify-between" >
                <div className=" flex  flex-col">
                    <label htmlFor="BaseColor" >
                        <input
                            type="color"
                            list="data1"
                            value={color.base}
                            id="BaseColor"
                            onInput={inputBase}
                        />
                    </label>
                    <div className="flex  flex-row" >
                        {color.base}
                        <button onClick={copyB}>
                            < ContentCopyIcon
                                sx={{ color: `${color.base}` }}
                            />
                        </button>
                    </div>
                </div>

                <div className=" flex  flex-col">
                    <label htmlFor="AccentColor">
                        <input
                            type="color"
                            list={`${color.base}`}
                            value={color.accent}
                            id="AccentColor"
                            width="30px"
                            onInput={inputAccent}
                        />
                    </label>
                    <div className="flex  flex-row">
                        {color.accent}
                        <button onClick={copyA}>
                            < ContentCopyIcon
                                sx={{ color: `${color.accent}` }}
                            />
                        </button>
                    </div>
                </div>

                <div className=" flex  flex-col">
                    <label htmlFor="SubColor" >
                        <input
                            type="color"
                            list={`${color.base}`}
                            value={color.sub}
                            id="SubColor"
                            onInput={inputSub}
                        />
                    </label>
                    <div className="flex  flex-row" >
                        {color.sub}
                        <button onClick={copyS}>
                            < ContentCopyIcon
                                sx={{ color: `${color.sub}` }}
                            />
                        </button>
                    </div>
                </div>
            </div>
            <datalist id="data1">
                {/* <option value={`${color.accent}`}></option>
                <option value={`${color.sub}`}></option> */}
                <option value="#f7c3bf"></option>
                <option value="#f3eed5"></option>
                <option value="#b9cdbf"></option>
                <option value="#e6c5cf"></option>
                <option value="#fff7c9"></option>
                <option value="#8ab0bc"></option>
                <option value="#e4c6a6"></option>
                <option value="#d9d8ce"></option>
                <option value="#00a08d"></option>
                <option value="#f7e3af"></option>
                <option value="#1f1e63"></option>
                <option value="#e99bc1"></option>
                <option value="#aed265"></option>
                <option value="#"></option>
                <option value="#"></option>
                <option value="#"></option>
                <option value="#"></option>
                <option value="#"></option>
                <option value="#"></option>
                <option value="#"></option>
                <option value="#"></option>
                <option value="#"></option>
            </datalist>
            <datalist id="#f7c3bf">
                <option value="#8ac8cf"></option>
                <option value="#efebe0"></option>
            </datalist>
            <datalist id="#f3eed5">
                <option value="#e4af9b"></option>
                <option value="#d4dfbb"></option>
            </datalist>
            <datalist id="#b9cdbf">
                <option value="#604461"></option>
                <option value="#efd4cd"></option>
            </datalist>
            <datalist id="#e6c5cf">
                <option value="#bdd8bb"></option>
                <option value="#af9dc0"></option>
            </datalist>
            <datalist id="#fff7c9">
                <option value="#f7c4d4"></option>
                <option value="#c0e4f2"></option>
            </datalist>
            <datalist id="#8ab0bc">
                <option value="#f8f5b5"></option>
                <option value="#e6afcf"></option>
            </datalist>
            <datalist id="#e4c6a6">
                <option value="#8e775d"></option>
                <option value="#e6cd8c"></option>
            </datalist>
            <datalist id="#d9d8ce">
                <option value="#d3e9d0"></option>
                <option value="#e6b6a9"></option>
            </datalist>
            <datalist id="#00a08d">
                <option value="#fdd23e"></option>
                <option value="#e1b985"></option>
            </datalist>
            <datalist id="#f7e3af">
                <option value="#dc5f36"></option>
                <option value="#70372c"></option>
            </datalist>
            <datalist id="#1f1e63">
                <option value="#a2a2ad"></option>
                <option value="#dcd5c8"></option>
            </datalist>
            <datalist id="#e99bc1">
                <option value="#bee0cc"></option>
                <option value="#ecbbb5"></option>
            </datalist>
            <datalist id="#aed265">
                <option value="#5188b1"></option>
                <option value="#e0f1f1"></option>
            </datalist>

        </>
    );
}
