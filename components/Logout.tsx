import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import liff from '@line/liff';
import { setLoginUser } from '@/lib/firebase';
import Link from 'next/link';
import { addUser, selectUser } from '@/features/userSlice';


export default function Logout() {
    const dispatch = useDispatch();
    console.log('login status : [', false, ']');
    return (
        <button
            onClick={() => {
                dispatch(
                    addUser({
                        name: '',
                        uid: '',
                        icon: '',
                    })
                );
                liff.logout()
            }}
        >
            <Link href="/" >
                ログアウト
            </Link>
        </button>
    )
}