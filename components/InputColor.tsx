import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addColor, selectColor } from '@/features/colorSlice';
import {
    HiOutlineClipboardCopy
} from 'react-icons/hi';
import { db, setCopyColor, setCopyColors } from '@/lib/firebase';
import { selectUser } from '@/features/userSlice';
import { fetchColorAll, fetchColorList, fetchSubColorAll, fetchSubColorList } from '@/lib/firebaseFetch';
import { ColorStateType } from '@/types/ColorStateType';
import { collection, getDocs, query, where } from 'firebase/firestore';
import InputChapterList from './InputChapterList';


export default function InputColor() {
    const color = useSelector(selectColor);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [colorList, setColorList] = useState<any>([]);
    const [subColorList, setSubColorList] = useState<any>([]);
    const [colorAll, setColorAll] = useState<any>([]);
    const [subColorAll, setSubColorAll] = useState<any>([]);
    const [chapterList, setChapterList] = useState<any>([]);
    const [chapter, setChapter] = useState<string>('');
    const [copy, setCopy] = useState<string>('');
    const id = user.uid
    const fetchColorListData = async () => {
        const resultBase = await fetchColorList(chapter);
        setColorList(resultBase);
        const resultSub = await fetchSubColorList(chapter, color);
        setSubColorList(resultSub);
    }
    const fetchSubColorList = async (chapter: string, colorBase: string) => {
        const p = query(collection(db, 'colors'),
            where('chapter', '==', chapter),
            where('copyColorBase', '==', `${colorBase}`));
        try {
            const snapshot = await getDocs(p);
            const colorData = snapshot.docs.map((doc) => ({ ...doc.data() }));
            console.log(colorData);
            return colorData;
        } catch (e) {
            console.error(e);
            return [];
        }
    };
    const fetchSubColor = async (chapter: string, colorBase: string) => {
        const p = query(collection(db, 'colors'),
            where('chapter', '==', chapter),
            where('copyColorBase', '==', `${colorBase}`));
        try {
            const snapshot = await getDocs(p);
            const colorData = snapshot.docs.map((doc) => doc.data().copyColorSub);
            console.log(colorData);
            return colorData;
        } catch (e) {
            console.error(e);
            return [];
        }
    };
    const fetchMojiColor = async (chapter: string, colorBase: string) => {
        const p = query(collection(db, 'colors'),
            where('chapter', '==', chapter),
            where('copyColorBase', '==', `${colorBase}`));
        try {
            const snapshot = await getDocs(p);
            const colorData = snapshot.docs.map((doc) => (doc.data().copyColorMoji as number));
            console.log(colorData);
            return colorData;
        } catch (e) {
            console.error(e);
            return [];
        }
    };
    useEffect(() => {
        fetchColorListData()
    }, [
        chapter
    ]);
    const fetchBase = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValueB = event.target.value;
        dispatch(addColor({
            base: newValueB,
        }));
        const resultSub = await fetchSubColor(chapter, event.target.value);
        const resultMoji = await fetchMojiColor(chapter, event.target.value);
        dispatch(addColor({
            base: event.target.value,
            moji: resultMoji,
            sub: resultSub,
        }));
    };

    const inputBase = async (event: any) => {
        const newValueB = event.target.value
        dispatch(addColor({
            base: newValueB,
            moji: color.moji,
            sub: color.sub,
        }))
        const resultSub = await fetchSubColorList(chapter, color);
        setSubColorList(resultSub);
    }
    const inputmoji = (event: any) => {
        const newValueA = event.target.value
        dispatch(addColor({
            base: color.base,
            moji: newValueA,
            sub: color.sub,
        }))
    }
    const inputSub = (event: any) => {
        const newValueS = event.target.value
        dispatch(addColor({
            base: color.base,
            moji: color.moji,
            sub: newValueS,
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
        setCopyColors(chapter, color);
    };
    return (
        <><>
            <div className="flex flex-col">
                ＊chapter＊
                <br />
                <label htmlFor="chapter">
                    <input
                        id="chapter"
                        name="chapter"
                        type="text"
                        autoFocus
                        onChange={(e) => {
                            setChapter(e.target.value)
                            fetchColorListData()
                        }}
                    />
                </label>
            </div>
            <br />
            ＊リストから呼び出し＊
            <br />
            <label htmlFor="chapterList">

                <>
                    <input
                        id="chapterList"
                        list="data1"
                        name="chapterList"
                        // list={`${chapter}`}
                        type="color"
                        // autoFocus
                        onChange={(e) => {
                            fetchBase(e)
                        }}
                    // onInput={inputBase}
                    />
                </>
                <InputChapterList />

            </label>
        </><br />
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
                {colorList.map((list: any) => (
                    <>
                        <option key={list.copyColorBase} value={`${list.copyColorBase}`}></option>
                        {/* <option value={`${list.copyColorMoji}`}></option>
                        <option value={`${list.copyColorSub}`}></option> */}
                    </>
                ))}
            </datalist>
            {subColorList.map((list: any) => (
                <>
                    <datalist id={`${list.copyColorBase}`}>
                        <option key={list.copyColorSub} value={`${list.copyColorSub}`}></option>
                        <option key={list.copyColorMoji} value={`${list.copyColorMoji}`}></option>
                        <option key={list.copyColorBase} value={`${list.copyColorBase}`}></option>
                    </datalist>
                </>
            ))}
        </>
    );
}
