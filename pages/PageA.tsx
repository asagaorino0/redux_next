import React, { useState, useCallback } from "react";
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { storage } from "../src/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage";
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';
import FileUpload from '../components/FileUpload';
const PageA = () => {
  const filename =
    'https://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/konoyubi.jpg?alt=media&token=99cf4f45-ea84-45cd-af83-0052a86f04adhttps://firebasestorage.googleapis.com/v0/b/next-app-db888.appspot.com/o/konoyubi.jpg?alt=media&token=99cf4f45-ea84-45cd-af83-0052a86f04ad';
  const detectText = async (fileName: any) => {
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach((text: any) => {
      console.log(text);
    });
  };

  return (
    <div className="App">
      <span>pageA:プロフィール登録</span>
      <br />
      <h1>
        <React.StrictMode>
          <Provider store={store}>
            {/* <PageA_profile /> */}
            <FileUpload />
            {/* <input type="file" onChange={onFileInputChange} />
            {`${kyFile}`.length !== 0 &&
              <div>
                <img src={kyFile} alt={name} />
                <br />
                <button onClick={handleUpload}>Upload</button>
              </div>
            } */}
            <br />
            <button onClick={detectText}>quickstart</button>            {/* } */}
          </Provider>
        </React.StrictMode>
      </h1>
    </div>
  );
};
export default PageA;
