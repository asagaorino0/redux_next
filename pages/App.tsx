import React, { useState } from 'react';
// import './App.css';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import { useRouter } from "next/router";
import PageA from '../src/PageA'


function App() {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter()
  const toPageA = () => {
    router.push('./PageA')
  }
  const registUser = () => {
    dispatch(addUser({ name, age }))
    // toPageA()
  };
  return (
    <div className="App">
      <h1>name</h1>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <h1>age</h1>
      <input type="text" onChange={(e) => setAge(Number(e.target.value))} />
      <h1>登録</h1>
      <button onClick={registUser}>登録</button>
      <h1>
        {/* {user.name}/{user.age} */}
      </h1>
      <PageA />
    </div>
  );
}

export default App;
