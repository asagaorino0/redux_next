import React, { useState, useCallback } from "react";
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { storage, db } from "../src/firebase";
import { doc, setDoc } from 'firebase/firestore';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
    display: 'none',
});

const FileUpload = () => {
    console.log('test==============');
    const user = useSelector(selectUser);
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
        const starsRef = ref(storage, `/images/${name}`);
        uploadString(storageRef, kyFile, 'data_url').then((snapshot) => {
            getDownloadURL(starsRef).then((url) => { upStore_File(url) })
            setKyFile('')
        }).catch((err) => { console.error(err) });
    }
    const upStore_File = (url: string) => { setDoc(doc(db, 'users', 'img'), { img: url, }, { merge: true }) }
    const [name, setName] = useState('')
    return (
        <div className="App">
            <span>uploadコーナー</span>
            <br />
            <h1>
                <React.StrictMode>
                    <Provider store={store}>
                        {/* <PageA_profile /> */}
                        {/* <SimpleAccordion /> */}
                        {/* <input type="file" onChange={onFileInputChange} /> */}
                        <Stack direction="row" alignItems="center" spacing={2}>
                            {`${kyFile}`.length === 0 &&
                                <label htmlFor="icon-button-file">
                                    <Input accept="image/*" id="icon-button-file" type="file" onChange={onFileInputChange} />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>}
                        </Stack>
                        {`${kyFile}`.length !== 0 &&
                            <div>
                                <label htmlFor="icon-button-file">
                                    <Input accept="image/*" id="icon-button-file" type="file" onChange={onFileInputChange} />
                                    <img src={kyFile} alt={name} />
                                </label>
                                <br />
                                <label htmlFor="contained-button-file">
                                    <IconButton color="primary" component="span" onClick={() => setKyFile('')} />
                                    <CancelIcon />
                                    <button onClick={() => setKyFile('')}>キャンセル　</button>
                                    <Button variant="contained" component="span" onClick={handleUpload}>
                                        Upload
                                    </Button>
                                </label>
                            </div>
                        }
                        <br />
                    </Provider>
                </React.StrictMode>
            </h1>
        </div>
    );
};
export default FileUpload;
