import React, { useState } from 'react';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import dynamic from 'next/dynamic';
import PageA_profile from './PageA_profile';

const PageA = () => {
  // const PageAA = dynamic(
  //     () => import('../src/PageAA'),
  //     { ssr: false }
  // )

  // const [name, setName] = useState<string>('');
  // const [age, setAge] = useState<number>(0);
  // const user = useSelector(selectUser);
  // const router = useRouter()
  // const toPageA = () => {
  //     router.push('/')
  // }

  return (
    <div className="App">
      <span>pageA:プロフィール登録</span>
      <br />
      <h1>
        {/* {user.name}/{user.age} */}
        <React.StrictMode>
          <Provider store={store}>
            <PageA_profile />
            {/* <PageA1 /> */}
            <input type="file" name="example" />
          </Provider>
        </React.StrictMode>
      </h1>
    </div>
  );
};

export default PageA;
