import React, { useState } from 'react';
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import dynamic from 'next/dynamic';
import PageA_profile from './PageA_profile';
import styles from '../styles/Home.module.css'
import SimpleAccordion from '../components/SimpleAccordion';
const PageA = () => {
  const PageAA = dynamic(
    () => import('../src/PageAA'),
    { ssr: false }
  )

  // const [name, setName] = useState<string>('');
  // const [age, setAge] = useState<number>(0);
  // const user = useSelector(selectUser);
  // const router = useRouter()
  // const toPageA = () => {
  //     router.push('/')
  // }
  const filename = "https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/konoyubi.jpg?alt=media&token=99cf4f45-ea84-45cd-af83-0052a86f04adhttps://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/konoyubi.jpg?alt=media&token=99cf4f45-ea84-45cd-af83-0052a86f04ad"
  const detectText = async (fileName: any) => {
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach((text: any) => { console.log(text) }
    )
  }
  const [rogo, setRogo] = useState<string>('');



  // document.addEventListener("DOMContentLoaded", () => {
  //     const title = document.querySelectorAll('.js-accordion-title');
  //     for (let i = 0; i < title.length; i++) {
  //         let titleEach = title[i];
  //         let content = titleEach.nextElementSibling;
  //         titleEach.addEventListener('click', () => {
  //             titleEach.classList.toggle('is-active');
  //             content?.classList.toggle('is-open');
  //         });
  //     }
  //     for (let i = 0; i < title.length; i++) {
  //         title[i].addEventListener('click', toggle)
  //     }
  // });

  // const title = document.querySelectorAll('.js-accordion-title');
  // function toggle() {
  //     const content = this.nextElementSibling;
  //     this.classList.toggle('is-active');
  //     content.classList.toggle('is-open');
  // }
  // for (let i = 0; i < title.length; i++) {
  //     title[i].addEventListener('click', toggle)
  // }
  // const accSingleTriggers = document.querySelectorAll('.js-acc-single-trigger');
  // accSingleTriggers.forEach(trigger => trigger.addEventListener('click', toggleAccordion));
  // function toggleAccordion() {
  //     const items = document.querySelectorAll('.js-acc-item');
  //     const thisItem = this.parentNode;
  //     items.forEach(item => {
  //         if (thisItem == item) {
  //             thisItem.classList.toggle('is-open');
  //             return;
  //         }
  //         item.classList.remove('is-open');
  //     });
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
            <SimpleAccordion />
            <input type="file" name="example" onChange={(e) => setRogo(e.target.value)} />
            {/* {`${rogo}` && */}
            <img
              src={`${rogo}`}
              alt=""
              style={{ width: '80px', height: '80px' }}
            />
            <button onClick={detectText}>quickstart</button>
            {/* } */}
          </Provider>
        </React.StrictMode>
      </h1>


    </div>
  );
}
export default PageA;
