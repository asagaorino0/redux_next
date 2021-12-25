import * as functions from "firebase-functions";
// import { useState } from 'react';
// import { db } from "../../src/firebase"
// import { doc } from 'firebase/firestore'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const hello_World = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello!");
});

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

// const [name, setName] = useState<string>('');
exports.createYoyaku = functions.firestore
    .document('yoyaku/{uid}')
    .onCreate((snap, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newValue = snap.data();

        // access a particular field as you would any JS property
        const namae = newValue.name;
        console.log(namae)
        // perform desired operations ...
    });
// const [text, setText] = useState<string>();
// exports.updateUser = functions.firestore
//     .document('yoyaku/{uid}')
//     .onUpdate((change, context) => {
//         // Get an object representing the document
//         // e.g. {'name': 'Marie', 'age': 66}
//         const newValue = change.after.data();

//         // ...or the previous value before this update
//         // const previousValue = change.before.data();

//         // access a particular field as you would any JS property
//         const namae = newValue.namae;
//         console.log(namae)
//         // perform desired operations ...
//         // const text = namae
//     });


exports.updateUser = functions.firestore
    .document('yoyaku/{uid}')
    .onUpdate((change, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newValue = change.after.data();

        // ...or the previous value before this update
        // const previousValue = change.before.data();

        // access a particular field as you would any JS property
        const namae = newValue.namae;
        const text = namae
        const url = `https://redux-next.vercel.app/api/${text}`
        console.log(url)
        async function getStaticProps() {
            // exports.sendoshirase = async () => {
            // const response = await fetch('https://redux-next.vercel.app/api/erikooooo');
            const response = await fetch(`https://redux-next.vercel.app/api/${text}`);
            const data = await response.json();
            console.log('🚀 ~ file: index.tsx ~ line 11 ~ sendLine ~ data', data);
        }
        getStaticProps
    });

// export async function getStaticProps() {
//     // exports.sendoshirase = async () => {
//     const response = await fetch('https://redux-next.vercel.app/api/erikooooo');
//     // const response = await fetch(`https://redux-next.vercel.app/api/${text}`);
//     const data = await response.json();
//     console.log('🚀 ~ file: index.tsx ~ line 11 ~ sendLine ~ data', data);
// }

// exports.helloTrigger = functions.firestore
// .document('users/{namae}')
// .onUpdate((change, context) => {
//     //     if (db.collection('messages/{uid}') == db.collection('users/{id}'))
//     // db.collection('messages').set({
//     //             name: change.after.data(),
//     //             after: change.after.data(),
//     //             before: change.before.data(),
//     //             created_at: admin.firestore.FieldValue.serverTimestamp(),
//     //         });
//     //     console.log(db.collection('messages/uid'));
//     //     
//     //     return 0;
//     // });
//     console.log("Hello Trigger！");
//     const data = change.after.data();
//     // console.log('id', functions.firestore.document('users/{id}'));
//     const previousData = change.before.id;
//     if (data) {
//         // db.collection('messages').where("uid", "==", previousData)
//         doc(db, 'users', previousData)
//             .get()
//             .then(() => {

//                 // db.collection('messages').where("uid", "==", previousData)
//                 //     .set({
//                 //         name: "namae"
//                 //     }, { merge: true }//←上書きされないおまじない
//                 //     )

//                 // change.after.data() == { name: data }
//                 // console.log(data);
//                 console.log('succes!');
//                 //     // return 0
//                 // }
//             })
//     }
// })