import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { fetchColorList, fetchSubColorList } from '@/lib/firebaseFetch';
import { useSelector } from 'react-redux';
import { selectColor } from '@/features/colorSlice';

export default function InputChapterList() {
    const [chapterList, setChapterList] = useState<string[]>([]);
    const [colorList, setColorList] = useState<any>([]);
    const [subColorList, setSubColorList] = useState<any>([]);
    const color = useSelector(selectColor);
    const [chapter, setChapter] = useState<string>('');
    useEffect(() => {
        const fetchChapter = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'colors'));
                const chapterData = querySnapshot.docs.map((doc) => doc.data().chapter);
                const result: string[] = chapterData.filter((value, index) => chapterData.indexOf(value) === index)
                setChapterList(result);
                // console.log(chapterList, result)
            } catch (error) {
                console.error(error);
            }
        };
        fetchChapter();
    }, []);
    const fetchColorListData = async () => {
        const resultBase = await fetchColorList(chapter);
        setColorList(resultBase);
        const resultSub = await fetchSubColorList(chapter, color);
        setSubColorList(resultSub);
    }
    useEffect(() => {
        fetchColorListData()
    }, [
        chapter
    ]);
    return (
        <>
            <p>
                <label>
                    １行テキスト入力欄：
                    <input list="sampleDatalist"></input>
                </label>
                <datalist id="sampleDatalist">
                    <option value="Internet Explorer"></option>
                    <option value="Chrome"></option>
                    <option value="FireFox"></option>
                </datalist>
            </p>

            <div>
                <label htmlFor="chapterList">Chapter List:</label>
                <input
                    id="chapterList"
                    name="chapterList"
                    list="chapterListOptions"
                    type="text"
                    // value={chapter}
                    onChange={(e) => {
                        setChapter(e.target.value)
                        fetchColorListData()
                    }}
                />
            </div>
            <datalist id="chapterListOptions">
                {chapterList.map((chapter: string) => (
                    <option key={chapter} value={chapter} ></option>
                ))}
            </datalist>
        </>
    );
}
