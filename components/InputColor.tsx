import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addColor, selectColor } from '@/features/colorSlice';
import {
    HiOutlineClipboardCopy
} from 'react-icons/hi';
import { setCopyColor, setCopyColors } from '@/lib/firebase';
import { selectUser } from '@/features/userSlice';
import { fetchColorList, fetchSubColorList } from '@/lib/firebaseFetch';


export default function InputColor() {
    const color = useSelector(selectColor);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [colorList, setColorList] = useState<any>([]);
    const [subColorList, setSubColorList] = useState<any>([]);
    const [copy, setCopy] = useState<string>('');
    const id = user.uid
    const fetchColorListData = async () => {
        const resultBase = await fetchColorList();
        setColorList(resultBase);
        const resultSub = await fetchSubColorList(color);
        setSubColorList(resultSub);
    }
    useEffect(() => {
        fetchColorListData()
    }, [color.base]);
    const inputBase = (event: any) => {
        const newValueB = event.target.value
        dispatch(addColor({
            base: newValueB,
            moji: color.moji,
            sub: color.sub,
            mozi: color.mozi,
        }))
    }
    const inputmoji = (event: any) => {
        const newValueA = event.target.value
        dispatch(addColor({
            base: color.base,
            moji: newValueA,
            sub: color.sub,
            mozi: color.mozi,
        }))
    }
    const inputSub = (event: any) => {
        const newValueS = event.target.value
        dispatch(addColor({
            base: color.base,
            moji: color.moji,
            sub: newValueS,
            mozi: color.mozi,
        }))
    }
    const copyBaseColor = () => {
        var clipboardText = `${color.base}`;
        navigator.clipboard.writeText(clipboardText);
    }
    const copyMojiColor = () => {
        var clipboardText = `${color.moji}`;
        navigator.clipboard.writeText(clipboardText);
    }
    const copySubColor = () => {
        var clipboardText = `${color.sub}`;
        navigator.clipboard.writeText(clipboardText);
    }
    const handleSetClick = () => {
        setCopyColors(copy, color);
    };
    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <div className="flex flex-col">
                ＊chapter＊
                <br />
                <label htmlFor="copy" >
                    <input
                        id="copy"
                        name="copy"
                        type="text"
                        autoFocus
                        onChange={(e) => setCopy(e.target.value)}
                    />
                </label>
            </div>
            <br />
            {/* <!-- Colors --> */}
            <label htmlFor="color" className="block text-sm font-semibold leading-6 text-gray-900">
                colors
            </label>
            <div className="flex  flex-row justify-between mt-1.5" >
                <div className="flex flex-col">
                    ベース▸▸
                    <br />
                    <label
                        htmlFor="BaseColor"
                        className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900"
                    >
                        <input
                            className="sr-only"
                            type="color"
                            list="data1"
                            value={color.base}
                            id="BaseColor"
                            onInput={inputBase}
                        />
                        <span aria-hidden="true"
                            className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"
                            style={{ backgroundColor: color.base }}
                        ></span>
                    </label>
                    <div className="flex  flex-row" >
                        {color.base}
                        <button onClick={copyBaseColor}>
                            < HiOutlineClipboardCopy />
                        </button>
                    </div>
                </div>

                <div className=" flex  flex-col">
                    文字▸▸
                    <br />
                    <label
                        htmlFor="mojiColor"
                        className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900"
                    >
                        <input
                            className="sr-only"
                            type="color"
                            list={`${color.base}`}
                            value={color.moji}
                            id="mojiColor"
                            // width="30px"
                            onInput={inputmoji}
                        />
                        <span aria-hidden="true"
                            className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"
                            style={{ backgroundColor: color.moji }}
                        ></span>
                    </label>
                    <div className="flex  flex-row">
                        {color.moji}
                        <button onClick={copyMojiColor}>
                            < HiOutlineClipboardCopy
                            />
                        </button>
                    </div>
                </div>

                <div className=" flex  flex-col">
                    サブ
                    <br />
                    <label
                        htmlFor="SubColor"
                        className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900"
                    >
                        <input
                            className="sr-only"
                            type="color"
                            list={`${color.base}`}
                            value={color.sub}
                            id="SubColor"
                            onInput={inputSub}
                        />
                        <span aria-hidden="true"
                            className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"
                            style={{ backgroundColor: color.sub }}
                        ></span>
                    </label>
                    <div className="flex  flex-row" >
                        {color.sub}
                        <button onClick={copySubColor}>
                            < HiOutlineClipboardCopy />
                        </button>
                    </div>
                </div>
            </div>
            <br />
            {/* <button onClick={handleSetClick}>
                配色を保存
            </button> */}
            <button onClick={handleSetClick}>
                配色見本を保存
            </button>
            <datalist id="data1">
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
                {colorList.map((list: any) => (
                    <>
                        <option value={`${list.copyColorBase}`}></option>
                        <option value={`${list.copyColorMoji}`}></option>
                        <option value={`${list.copyColorSub}`}></option>
                    </>
                ))}
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
            {subColorList.map((list: any) => (
                <>
                    <datalist id={`${list.copyColorBase}`}>
                        <option value={`${list.copyColorSub}`}></option>
                        <option value={`${list.copyColorMoji}`}></option>
                        <option value={`${list.copyColorBase}`}></option>
                    </datalist>
                </>
            ))}
        </>
    );
}
