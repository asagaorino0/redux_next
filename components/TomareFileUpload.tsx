import React, { useState } from "react";
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { storage, db } from "../src/firebase";
import { doc, setDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
const Input = styled('input')({
    display: 'none',
});
const TomareFileUpload = ({ tomare, tomareId, uid, label }: { tomare: string, tomareId: string, uid: string, label: string }) => {
    const user = useSelector(selectUser);
    console.log('test==============', [label]);//あいさつかなぁ
    const [kyFile, setKyFile] = useState<string>('');
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKyFile(`${tomare}`)
        onFileInputChange
    };
    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(tomare, tomareId, label)
        // if (e.target.files && e.target.files[0]) {
        //     const file = e.target.files[0];
        //     const reader = new FileReader();
        //     reader.onload = (e: any) => {
        //         setKyFile(e.target.result);
        //         setName(file.name)
        //     };
        //     reader.readAsDataURL(file);
        // }
    };
    const handleUpload = async () => {
        const storageRef = ref(storage, `/images/${uid}/${name}`);
        const starsRef = ref(storage, `/images/${uid}/${name}`);
        uploadString(storageRef, kyFile, 'data_url').then((snapshot) => {
            getDownloadURL(starsRef)
                .then((url) => { upload_file(url) })
            setKyFile('')
        }).catch((err) => { console.error(err) });
    }
    const upload_file = (url: string) => { setDoc(doc(db, 'users', `${uid}`, 'tomare', `${tomareId}`), { [label]: url }, { merge: true }) }
    const [name, setName] = useState('')

    return (
        <div className="App">
            {/* <br /> */}
            <React.StrictMode>
                <Provider store={store}>
                    {`${tomare}`.length === 0 &&
                        // <Stack direction="row" alignItems="center" spacing={2}>
                        <div>
                            {`${kyFile}`.length === 0 &&
                                <label htmlFor="icon-button-file">
                                    <Input accept="image/*" id="icon-button-file" type="file" onChange={onFileInputChange} />
                                    <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
                                </label>
                            }
                            {/* </Stack> */}
                        </div>
                    }
                    {`${tomare}`.length !== 0 &&
                        // <Stack direction="row" alignItems="center" spacing={2}>
                        <div>
                            {`${kyFile}`.length === 0 &&
                                <label htmlFor="icon-button-file">
                                    <Input accept="image/*" id="icon-button-file" type="file" onChange={onFileInputChange} />
                                    <img src={tomare} alt="" />
                                </label>
                            }
                        </div>
                        // </Stack>
                    }
                    {`${kyFile}`.length !== 0 &&
                        <div>
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" onChange={onFileInputChange} />
                                <img src={kyFile} alt={name} />
                            </label>
                            <br />
                            <label htmlFor="contained-button-file">
                                <IconButton color="primary" component="span" onClick={() => setKyFile('')} />
                                <CancelIcon /><button onClick={() => setKyFile('')}>キャンセル　</button>
                                <Button variant="contained" component="span" onClick={handleUpload}>Upload</Button>
                            </label>
                        </div>
                    }
                    {/* </Stack> */}
                    {/* } */}

                </Provider>
            </React.StrictMode>
        </div>
    );
};
export default TomareFileUpload;
