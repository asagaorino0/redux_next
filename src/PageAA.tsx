import React, { useState } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";

const PageAA = () => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const router = useRouter()
    const toHome = () => {
        router.push('/')
    }
    const registUser = () => {
        dispatch(addUser({ name, age }))
        // toPageA()
    };

    return (
        <div>
            <div className="App">
            </div>            <div>
                <span >pageAA</span>
                <br />

            </div>
            <h1>
                {user.name}/{user.uid}
            </h1>

        </div >
    );
}

export default PageAA
