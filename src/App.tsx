import React, { useState } from 'react';
// import './App.css';
import { addUser, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';


function App() {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const registUser = () => {
    dispatch(addUser({ name, age }))
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
        {user.name}/{user.age}
      </h1>
    </div>
  );
}

export default App;
