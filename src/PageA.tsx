import React, { useState, useEffect } from 'react';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import liff from '@line/liff';

const PageA = () => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const router = useRouter()
    const toPage = () => {
        router.push('/')
    }
    const registUser = () => {
        dispatch(addUser({ name, age })),
            toPage()
    };
    const onload = () => {
        // console.log(process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID)
        liff.init({ liffId: process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID as string })
            .then(() => {
                if (!liff.isLoggedIn()) {
                    liff.login({}) // ログインしていなければ最初にログインする
                } else if (liff.isInClient()) {
                    liff.getProfile()  // ユーザ情報を取得する
                        .then(profile => {
                            const userId: string = profile.userId
                            const displayName: string = profile.displayName
                            setName(profile.displayName)
                            // setUid(profile.userId)
                            console.log("{login}", `${name}`);
                            alert(`Name: ${displayName}, userId: ${userId}`)
                        }).catch(function (error) {
                            window.alert('Error sending message: ' + error);
                        });
                }
            })
    }
    // // 現在ログインしているユーザーを取得する
    // useEffect(() => {
    //     liff.getProfile()
    //         .then(profile => {
    //             setName(profile.displayName)
    //             // setUid(profile.userId)
    //             //   setAvatar(profile.pictureUrl)
    //             // myProfile()
    //         })
    // }, []
    // );
    // console.log(user.name)
    return (
        <div>
            <div className="App">
            </div>            <div>
                <span >pageA</span>
                <br />

            </div>
            <h1>
                {user.name}
                /LINE{name}
            </h1>
        </div >
    );
}

export default PageA
