import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addColor, selectColor } from '@/features/colorSlice';
import { db } from '@/lib/firebase';
import { fetchColorList } from '@/lib/firebaseFetch';
import { ColorStateType } from '@/types/ColorStateType';
import { collection, getDocs, query, where } from 'firebase/firestore';


export default function InputColor() {
    const color = useSelector(selectColor);
    const dispatch = useDispatch();
    const [colorList, setColorList] = useState<any>([]);
    const [subColorList, setSubColorList] = useState<any>([]);
    const [chapter, setChapter] = useState<string>('');
    const fetchSubColorList = (copy: string, color: ColorStateType) => {
        const p = query(
            collection(db, 'colors'),
            where('chapter', '==', copy),
            where('copyColorBase', '==', `${color.base}`),
        );
        return new Promise(async (resolve, reject) => {
            try {
                const snapshot = await getDocs(p);
                const colorData = snapshot.docs.map(
                    (doc) => ({ ...doc.data() } as unknown as number)
                );
                resolve(colorData)
                console.log(colorData)
            } catch (e) {
                reject(e)
            }
        })
    }
    const fetchBase = async (event: any) => {
        const newValueB = event.target.value
        dispatch(addColor({
            base: newValueB,
        }))
        const resultSub = await fetchSubColorList(chapter, color);
        setSubColorList(resultSub);
        {
            subColorList.map((list: any) => (
                // console.log(list)
                dispatch(addColor({
                    base: event.target.value,
                    moji: list.copyColorMoji,
                    sub: list.copyColorSub,
                }))
            ))
        }
    }
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
                        }} />
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
                        type="color"
                        onChange={(e) => {
                            fetchBase(e)
                        }}
                    />
                </>
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
                        />
                        <span aria-hidden="true"
                            className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"
                            style={{ backgroundColor: color.base }}
                        ></span>
                    </label>
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
                        />
                        <span aria-hidden="true"
                            className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"
                            style={{ backgroundColor: color.moji }}
                        ></span>
                    </label>
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
                        />
                        <span aria-hidden="true"
                            className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"
                            style={{ backgroundColor: color.sub }}
                        ></span>
                    </label>
                </div>
            </div>
            <br />
            <datalist id="data1">
                {colorList.map((list: any) => (
                    <>
                        <option value={`${list.copyColorBase}`}></option>
                    </>
                ))}
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
