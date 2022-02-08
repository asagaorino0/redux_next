import React, { useState, useCallback } from "react";
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { storage, db } from "../src/firebase";
import { getFirestore, getDocs, collection, collectionGroup, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import { TomareState } from "../src/types/tomare";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const TomareFileUpload = ({ tomare, tomareId, uid, label }: { tomare: string, tomareId: string, uid: string, label: string }) => {
    const user = useSelector(selectUser);
    console.log('test==============', [label]);//あいさつかなぁ
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

    // const handleBefor = async () => {
    //     const storageRef = ref(storage, `/images/${user.uid}/${name}`);
    //     const starsRef = ref(storage, `/images/${user.uid}/${name}`);
    //     uploadString(storageRef, kyFile, 'data_url').then((snapshot) => {
    //         getDownloadURL(starsRef)
    //             .then((url) => { upload_befor(url) })
    //         setKyFile('')
    //     }).catch((err) => { console.error(err) });
    // }
    // const upload_befor = (url: string) => { setDoc(doc(db, 'users', `${user.uid}`, 'tomare',`${tomareId}`), { img_befor: url, }, { merge: true }) }
    const handleUpload = async () => {
        const storageRef = ref(storage, `/images/${uid}/${name}`);
        const starsRef = ref(storage, `/images/${uid}/${name}`);
        uploadString(storageRef, kyFile, 'data_url').then((snapshot) => {
            getDownloadURL(starsRef)
                .then((url) => { upload_file(url) })
            setKyFile('')
            fetchTomare(tomareId)
        }).catch((err) => { console.error(err) });
    }
    const upload_file = (url: string) => { setDoc(doc(db, 'users', `${uid}`, 'tomare', `${tomareId}`), { [label]: url }, { merge: true }) }
    const [name, setName] = useState('')
    const [newTomare, setNewTomare] = useState<any>('')
    const fetchTomare = async (tomareId: string) => {
        const q = query(collectionGroup(db, 'tomare'), where("tomareId", "==", `${tomareId}`));
        const snapshot = onSnapshot(q, (querySnapshot) => {
            setNewTomare(
                querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            console.log('chat:', newTomare);
        });
        return snapshot;
    };
    return (
        <div className="App">
            {/* <span>uploadコーナー</span> */}
            <br />
            <h1>
                <React.StrictMode>
                    <Provider store={store}>
                        {/* {`${tomare}`.length === 0 &&
                            <p>
                                <input type="file" onChange={onFileInputChange} />
                                {`${kyFile}`.length !== 0 &&
                                    <div>
                                        <img src={kyFile} alt={name} />
                                        <br />
                                        <button onClick={handleBefor}>Upload</button>
                                    </div>
                                }
                            </p>
                        } */}
                        {`${tomare}`.length === 0 &&
                            <p>
                                <input type="file" onChange={onFileInputChange} />
                                {`${kyFile}`.length !== 0 &&
                                    <div>
                                        <img src={kyFile} alt={name} />
                                        <br />
                                        <button onClick={handleUpload}>Upload</button>
                                    </div>
                                }
                            </p>
                        }
                        <br />
                    </Provider>
                </React.StrictMode>
            </h1>
        </div>
    );
};
export default TomareFileUpload;
