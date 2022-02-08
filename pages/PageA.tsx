import React, { useState, useCallback } from "react";
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { storage } from "../src/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage";
import dynamic from 'next/dynamic';
import Resizer from 'react-image-file-resizer';
import PageA_profile from './PageA_profile';
import styles from '../styles/Home.module.css';
import SimpleAccordion from '../components/SimpleAccordion';
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

  console.log('test==============');
  const [rogo, setRogo] = useState<string>('');
  const [kyFile, setKyFile] = useState<string>('');
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setKyFile(e.target.result);
        setName(file.name)
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    const storageRef = ref(storage, `/images/${name}`);
    uploadString(storageRef, kyFile, 'data_url').then((snapshot) => {
      console.log('Uploaded a data_url string!');
    })
      .catch((error) => {
        // Handle any errors
      });
  }
  const [name, setName] = useState('')
  const resizeFile = (file: Blob): Promise<string> => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri as string)
        },
        'base64'
      )
    })
  }

  const onChange = async (event: any) => {
    try {
      const file = event.target.files[0]
      const image = await resizeFile(file)
      setKyFile(image)
      setName(file.name)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="App">
      <span>pageA:プロフィール登録</span>
      <br />
      <h1>
        {/* {user.name}/{user.age} */}
        <React.StrictMode>
          <Provider store={store}>
            {/* <PageA_profile /> */}
            {/* <SimpleAccordion /> */}

            {/* <input
              type="file"
              name="example"
              onChange={(e) => setRogo(e.target.value)}
            /> */}
            {/* {`${rogo}` && */}
            {/* <img src={`${kyFile}`} alt="" style={{ width: '80%', height: '80%' }} /> */}
            <input type="file" onChange={onChange} />
            {kyFile && <img src={kyFile} alt={name} />}
            <input type="file" onChange={onFileInputChange} />
            <img src={kyFile} />
            <button onClick={handleUpload}>Upload</button>
            <br />
            {name}
            <button onClick={detectText}>quickstart</button>            {/* } */}
          </Provider>
        </React.StrictMode>
      </h1>
    </div>
  );
};
export default PageA;
