import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
const user = useSelector(selectUser);
const [uid, setUid] = useState<string | null>('');
const [name, setName] = useState<string | null>('');
const [icon, setIcon] = useState<string | undefined>('');
// console.log('useStete:', users)

export const users = [
    // {
    //     uid: '1',
    //     name: 'user.name',
    // },
    {
        uid: 'Uda1c6a4e5b348c5ba3c95de639e32414',
        name: 'おりのえりこ',
    },
    {
        uid: 'Uda1c6a4e5b348c5ba3c95de639e32416',
        name: 'CCCCCCC',
    },
]

