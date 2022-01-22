import React, { useState } from 'react';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import dynamic from 'next/dynamic'
// import PageC1 from '../src/PageC1'
// import PageM1 from '../src/PageM1'
// import PageB0 from '../src/PageB0'
// import PageB3 from '../src/PageB3'
// import CalendarPage from '../src/Calendar'
// import PageB1 from '../src/PageB1'
const PageB = () => {
    const router = useRouter()
    const toPageA = () => {
        router.push('./PageA')
    }
    const PageB0 = dynamic(() => import('../src/PageB0'), { ssr: false });
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
                    <h3 className="mb-4 text-green-500 text-3xl">施術の申込み（個人）</h3>
                </button>
            </div>
            {/* <span >pageA</span> */}
            <br />
            <h1>
                {/* {user.name}/{user.age} */}
                <React.StrictMode >
                    <Provider store={store}>
                        <PageB0 />
                        {/* <PageM1 /> */}
                        {/* <PageC1 /> */}
                    </Provider>
                </React.StrictMode>
            </h1>
        </div >
    );
}

export default PageB