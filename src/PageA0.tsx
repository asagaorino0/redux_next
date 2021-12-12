import React, { useState } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function PageA0() {
    // const [uid, setUid] = useState<string>('');
    // const [name, setName] = useState<string>('');
    // const [icon, setIcon] = useState<string | undefined>('');
    const user = useSelector(selectUser);
    // const [age, setAge] = useState<number>(0);
    // const dispatch = useDispatch();
    // const router = useRouter()
    // const toHome = () => {
    //     router.push('/')
    // }
    // const registUser = () => {
    //     dispatch(addUser({ name, uid, icon }))
    //     // toPageA()
    // };

    return (
        <div className="App">
            <br />
            {`${user.icon}`.length !== 0 &&
                <img
                    src={`${user.icon}`}
                    alt=""
                    style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                />
            }
            0{user.name}
        </div >
    );
}
