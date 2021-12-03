import React, { useState } from 'react';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";

const PageA = () => {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const router = useRouter()
    const toPageA = () => {
        router.push('/')
    }
    const registUser = () => {
        dispatch(addUser({ name, age })),
            toPageA()
    };
    // console.log(user.name)
    return (
        <div>
            <div className="App">
            </div>            <div>
                <span >pageA</span>
                <br />

            </div>
            <h1>
                {user.name}/{user.age}
            </h1>
        </div >
    );
}

export default PageA
