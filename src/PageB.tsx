import React, { useState } from 'react';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";

const PageB = () => {
    const [uid, setUid] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<string | undefined>('');
    const [age, setAge] = useState<number>(0);
    const [namae, setNamae] = useState<string>('');
    const [sei, setSei] = useState<string>('');
    const [sejyutsu, setSejyutsu] = useState<string>('');
    const [day, setDay] = useState<string>('');
    const [tokoro, setTokoro] = useState<string>('');
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const router = useRouter()
    const toHome = () => {
        router.push('/')
    }
    const registUser = () => {
        dispatch(addUser({
            namae,
            sei,
            age,
            sejyutsu,
            day,
            tokoro
        }))
        // toPageA()
    };

    return (
        <div className="App">
            <span >pageB：登録</span>
            <br />
            {`${user.icon}`.length !== 0 &&
                <img
                    src={`${user.icon}`}
                    alt=""
                    style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                />
            }
            {`${user.icon}`.length !== 0 &&
                <h1 className="mb-4 text-green-500 text-3xl">{user.name}さま </h1>
            }
            <h1>氏名</h1>
            <input type="text" onChange={(e) => setNamae(e.target.value)} />
            <h1>性別</h1>
            <input type="text" onChange={(e) => setSei(e.target.value)} />
            <h1>年齢</h1>
            <input type="text" onChange={(e) => setAge(Number(e.target.value))} />
            <h1>施術内容</h1>
            <input type="text" onChange={(e) => setSejyutsu(e.target.value)} />
            <h1>年月日</h1>
            <input type="text" onChange={(e) => setDay(e.target.value)} />
            <h1>住所</h1>
            <input type="text" onChange={(e) => setTokoro(e.target.value)} />

            <button onClick={registUser}>登録</button>
        </div >
    );
}

export default PageB

