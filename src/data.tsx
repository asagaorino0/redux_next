import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { UserState } from "./types/user";
const user = useSelector(selectUser);
const [uid, setUid] = useState<string>('');
const [name, setName] = useState<string>('');
const [icon, setIcon] = useState<string | undefined>('');
console.log('useStete:', user)

type Props = {
    // user: UserState | null
    name: string | null,
    uid: string | null,
};
export const UsersItem = [
    // {
    //     uid<>: user.uid,
    //     name: user.name,
    // },
    {
        uid: 'Uda1c6a4e5b348c5ba3c95de639e32415',
        name: 'おりのえりこ',
    },
    {
        uid: 'Uda1c6a4e5b348c5ba3c95de639e32416',
        name: 'CCCCCCC',
    },
]