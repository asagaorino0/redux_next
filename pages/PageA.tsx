import React, { useState, useCallback } from "react";
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
  const PageAA = dynamic(() => import('../src/PageAA'), { ssr: false })
  const PageLogin = dynamic(() => import('../src/PageLogin'), { ssr: false });

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
  const [myFiles, setMyFiles] = useState([]);
  const [clickable, setClickable] = useState(false);
  const [src, setSrc] = useState<string | ArrayBuffer | null>("");
  const onDrop = useCallback(async (acceptedFiles: never) => {
    console.log('acceptedFiles', acceptedFiles)
    if (!acceptedFiles[0]) return;
    try {
      setMyFiles([...acceptedFiles]);
      setClickable(true);
      handlePreview(acceptedFiles);
    } catch (error) {
      alert(error);
    }
  }, []);
  //   const handleUpload = async (accepterdImg) => {
  //     try {
  //         // アップロード処理
  //         const uploadTask = storage
  //             .ref(`/images/${myFiles[0].name}`)
  //             .put(myFiles[0]);
  //         // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
  //         // console.log('src:', src);
  //     }
  //     catch (error) {
  //         //     console.log("エラーキャッチ", error);
  //     }
  // };
  const handlePreview = (files: any) => {
    if (files === null) {
      return;
    }
    const file = files[0];
    if (file === null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result);
      console.log(src)
    };
  };
  // // const selectedFile = document.getElementById('input').files[0];
  // const inputElement = document.getElementById("input");
  // inputElement.addEventListener("change", handleFiles, false);
  // function handleFiles() {
  //   const fileList = files; /* ファイルリストを処理するコードがここに入る */
  // }
  // function handleFiles(files) {
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];

  //     if (!file.type.startsWith('image/')){ continue }

  //     const img = document.createElement("img");
  //     img.classList.add("obj");
  //     img.file = file;
  //     preview.appendChild(img); // 「プレビュー」とは、コンテンツが表示される div 出力のことを想定しています。
  //     const reader = new FileReader();
  //     reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
  //     reader.readAsDataURL(file);
  //   }
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
            {/* <SimpleAccordion /> */}
            <input type="file" name="logo" onChange={onDrop} />
            {/* {`${rogo}` && */}
            <img
              src={`${src}`}
              alt=""
              style={{ width: '80px', height: '80px' }}
            />
            <div >Upload</div>
            {/* <input type="file" name="logo" onChange={handleUpload} /> */}
            {/* <p>File should be Jpeg, Png,...</p> */}
            {/* <div {...getRootProps()}> */}
            {/* <input {...getInputProps()} /> */}
            {/* {myFiles.length === 0 ? (
                        <p>Drag&Drop your images here</p>
                    ) : ( */}
            <div>
              {myFiles.map((file) => (
                // <React.Fragment key={file.name}>
                <React.Fragment >
                  <img
                    src={`${src}`}
                    alt=""
                    style={{ width: '80px', height: '80px' }}
                  />
                  {/* {src && <img src={src} />} */}
                </React.Fragment>
              ))}
            </div>
            {/* )} */}
            {/* </div> */}









            <button onClick={detectText}>quickstart</button>
            {/* } */}
          </Provider>
        </React.StrictMode>
      </h1>


    </div>
  );
}
export default PageA;
