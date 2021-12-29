import React, { useState, useEffect } from 'react';
import 'firebase/compat/firestore';
import { db } from "./firebase"
import { getFirestore, collection, query, where, onSnapshot, doc, setDoc, Timestamp, addDoc } from 'firebase/firestore'
import { addUser, selectUser } from '../src/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import Link from 'next/link'
import PageAA from './PageAA'
import PageA from '../pages/PageA'
// import PageB from './PageB'
// import dynamic from 'next/dynamic'
// import * as line from '@line/bot-sdk';
import liff from '@line/liff';
import { stringify } from 'querystring';
import useSWR from 'swr'
import Person from '../components/Person'
import User from '../components/User'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-picker';
// import * as ImagePicker from 'expo-image-picker';
// import * as ImagePicker from 'expo-image-picker-multiple';
// import moment from "moment";
// import UserW from './user';
import { Album } from './types/album'
// import { EventEmitter } from 'events';
// import EventEmitter, {type IEventEmitter} from '../vendor/emitter/EventEmitter'
export default function App() {
  // const PageA = dynamic(
  //   () => import('../pages/PageA'),
  //   { ssr: false }
  // )

  const [uid, setUid] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [icon, setIcon] = useState<string | undefined>('');
  const [age, setAge] = useState<number>(0);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const router = useRouter()
  const toPageA = () => {
    router.push('./PageA')
  }
  const toPageB = () => {
    router.push('./PageB')
  }
  const registUser = () => {
    dispatch(addUser({ name, uid, icon }))
    onload()
    // toPageA()
    toPageB()
  };
  const loginUrl: string | undefined = process.env.NEXT_PUBLIC_LINE_LOGIN_URL
  const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID
  const lineClick = () => {
    setUid('')
    liff.init({ liffId: LINEID as string })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login() // ログインしていなければ最初にログインする
        } else if (liff.isInClient()) {
          liff.getProfile()  // ユーザ情報を取得する
            .then(profile => {
              const userId: string = profile.userId
              const displayName: string = profile.displayName
              const displayicon: string | undefined = profile.pictureUrl
              setName(profile.displayName)
              setUid(userId)
              setName(displayName)
              setIcon(displayicon)
              dispatch(addUser({ name, uid, icon }))
            })
        }
      })
  }
  // const config: any = {
  //   channelAccessToken: process.env.ACCESS_TOKEN,
  //   channelSecret: process.env.CHANNEL_SECRET
  // };
  // const lineTuchi = function () {
  //   const client = new line.Client({
  //     channelAccessToken: 'u/gxNRim4lRdiZrvvPhus23nEgxtWFAo4Q3Ju/WWoqK/4Wk5WJ4KGitGYC7oQ4O+rUcofpkjVddvZ8667cbk76d0MaQ68MlZs4hPu3DHY0YmLzd1JRiaFX87bT9+18RmfxYr/8B4lUQg0SyL2Eux5QdB04t89/1O/w1cDnyilFU='
  //   });
  //   client.getProfile()
  //     .then((profile) => {
  //       console.log(profile.displayName);
  //       console.log(profile.userId);
  //       console.log(profile.pictureUrl);
  //       console.log(profile.statusMessage);
  //     })
  //     .catch((err) => {
  //     });
  // };
  const line = require('@line/bot-sdk');
  const config: any = {
    channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECRET,//チャンネルシークレット
    idToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN, //アクセストークン
  };
  const client = new line.Client({
    channelAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN
  });
  // console.log('appline', config)
  const message = {
    type: 'text',
    text: 'Hello World!'
  };
  const onload = function () {
    liff
      .init({ liffId: LINEID as string })
      .then(() => {
        liff.getProfile()  // ユーザ情報を取得する
          .then(profile => {
            const userId: string = profile.userId
            const displayName: string = profile.displayName
            const displayicon: string | undefined = profile.pictureUrl
            setName(profile.displayName)
            // setUid(userId)
            setName(displayName)
            setIcon(displayicon)
            dispatch(addUser({ name, uid, icon }))
            console.log('uid', { uid })
            const setRef = setDoc(doc(db, 'users', `${uid}`), {
              uid,
              name,
              icon,
              timestamp: Timestamp.fromDate(new Date()),
            }, { merge: true }//←上書きされないおまじない
            )
            // fetchAPI()
            console.log('user', setRef)
          }).catch(function (error) {
          });
      })
  }

  // type Props = {
  //   album: Album;
  // };
  // // const userW: UserW = new UserW('Tom');
  // // userW.sayHi();
  // const [uri, setUri] = useState('');
  // // const [image, setImage] = useState<string>(null);
  // const [storagePath, setStoragePath] = useState("");
  // const daytime = moment().format("YYYYMMDDhhmmss");
  // // const timestamp = moment(album.timestamp.toDate()).form  at("YYYY/M/D");
  // const eventEmitter = new EventEmitter();

  // イベントが発動された時の処理を記述する
  // eventEmitter.on('myEvent', () => {
  //   console.log('Emitted Event');
  //   pickImage()
  // });
  // const getExtention = (path: string) => {
  //   return path.split(".").pop();
  // }

  // const pickImage = async () => {
  // let result = await ImagePicker.launchImageLibraryAsync({
  //   mediaTypes: ImagePicker.MediaTypeOptions.All,
  //   allowsEditing: true,
  //   quality: 1,
  // });
  // if (!result.cancelled) {
  //   setUri(result.uri);
  //   const ext = getExtention(result.uri);
  //   const storagePath = `items/${uid}.${ext}`;
  //   // const storagePath = `items/${uid}/${daytime}.${ext}`;
  //   setStoragePath(storagePath)
  // }
  // };
  // const uploadImage = async (uri: string, storagePath: string) => {
  //     const localUri = await fetch(uri);
  //     const blob = await localUri.blob();
  //     const ref = firebase.storage().ref().child(storagePath);
  //     let downloadUrl = "";
  //     try {
  //         await ref.put(blob);
  //         downloadUrl = await ref.getDownloadURL();
  //     } catch (err) {
  //         console.log(err);
  //     }
  //     return downloadUrl;
  // };


  // イベントを発動させる
  // eventEmitter.emit('myEvent');

  /////////////////////////////////////////////////////////////////////////
  const options = {
    mediaType: 'photo',
    maxWidth: 1000,
    maxHeight: 1000,
    quality: 0.8,
    saveToPhotos: true,
  };

  // カメラで撮影する
  // this.takePhoto = () => {
  //   launchCamera(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //       } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       } else {
  //       const source = { uri: response.uri };
  //       this.setState({
  //       image: source,
  //       });
  //     }
  //   });
  // }

  // // アルバムから選択する
  // this.choosePhoto = () => {
  //   launchImageLibrary(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       const source = { uri: response.uri };
  //       const img = document.createElement('img');
  //       img.src = source;
  //       document.body.appendChild(img);
  //       this.setState({
  //         image: source,
  //       });
  //     }
  //   });
  // }

  /////////////////////////////////////////////////////////////////////
  // const options = {
  //   title: '写真を取得する',
  //   takePhotoButtonTitle: 'カメラで写真を撮影する',
  //   chooseFromLibraryButtonTitle: 'アルバムから写真を選択する',
  //   storageOptions: {
  //     skipBackup: true,
  //     path: 'images',
  //   },
  // };

  // ImagePicker.showImagePicker(options, (response) => {
  //   console.log('Response = ', response);

  //   if (response.didCancel) {
  //     console.log('User cancelled image picker');
  //   } else if (response.error) {
  //     console.log('ImagePicker Error: ', response.error);
  //   } else if (response.customButton) {
  //     console.log('User tapped custom button: ', response.customButton);
  //   } else {
  //     const source = { uri: response.uri };
  //     this.setState({
  //       image: source,
  //     });
  //   }
  // });


  const [text, setText] = useState<string>(`Uda1c6a4e5b348c5ba3c95de639e32414 `);
  async function getStaticProps() {
    // exports.sendoshirase = async () => {
    const response = await fetch(`http://localhost:3000/api/[text]`);
    // const response = await fetch(`https://redux-next.vercel.app/api/${text}`);
    const data = await response.json();
    console.log('🚀 ~ file: index.tsx ~ line 11 ~ sendLine ~ data', data);
  }
  const sendLine = async () => {
    getStaticProps
    // // const text = `tank you_${name}`
    // // const response = await fetch(`http://localhost:3000/api/[text]`);
    // const response = await fetch(`https://redux-next.vercel.app/api/${text}`);
    // const data = await response.json();
    // // console.log('🚀 ~ file: index.tsx ~ line 11 ~ sendLine ~ data', data);
  };


  return (
    <div className="App">
      {/* <button onClick={pickImage} >画像</button> */}

      {`${user.uid}` === 'k11111' &&
        <div>
          <button onClick={lineClick}>
            <h4 className="mb-4 text-green-500 text-3xl">まずは友達追加</h4>
          </button>
        </div>
      }
      {`${user.uid}` === 'k11111' &&
        <div>
          <button onClick={onload}>
            <h3 className="mb-4 text-green-500 text-3xl">ログインはこちら</h3>
          </button>
        </div>
      }
      {`${user.uid}` === '' &&
        <div>
          <button onClick={registUser}>
            {/* // <button onClick={onload}> */}
            <h3 className="mb-4 text-green-500 text-3xl">ようこそ</h3>
          </button>
        </div>
      }
      {/* <Link href="/user/[uid]" as={`/user/${user.uid}`}>
        <a>{user.name}</a>
      </Link>
      <Link href="/test/[uid]" as={`/test/416`}>
        <a>test</a>
      </Link>
      <Link href="/user/[uid]" as={`/user/`}>
        <a>user</a>
      </Link>
      <Link href="/api/hello" >
        <a>hello</a>
      </Link> */}
      {/* <div>
        <h1>LINE message送信</h1>
        <br />
        <input type="text" onChange={(e) => setText(e.target.value)} />
        <button onClick={sendLine}>送信</button>
      </div> */}

      <div>
        {/* <PageB /> */}
        <br />
        {/* <input type="text" onChange={(e) => setText(e.target.value)} /> */}
        <button onClick={sendLine}>送信</button>
      </div>
    </div >

  );
}