import React, { useState } from 'react';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import dynamic from 'next/dynamic'
import PageC1 from '../src/PageC1'

const PageC = () => {
    const router = useRouter()
    const toPageA = () => {
        router.push('./PageA')
    }
    // const [name, setName] = useState<string>('');
    // const [age, setAge] = useState<number>(0);
    // const user = useSelector(selectUser);
    // const router = useRouter()
    // const toPageA = () => {
    //     router.push('/')
    // }

    return (
        <div className="App">
            <div>
                <button onClick={toPageA}>
                    {/* // <button onClick={onload}> */}
                    <h3 className="mb-4 text-green-500 text-3xl">予約枠の設定</h3>
                </button>
            </div>
            {/* <span >pageA</span> */}
            <br />
            <h1>
                {/* {user.name}/{user.age} */}
                <React.StrictMode >
                    <Provider store={store}>
                        {/* <PageB1 /> */}
                        <PageC1 />
                    </Provider>
                </React.StrictMode>
            </h1>
        </div >
    );
}

export default PageC