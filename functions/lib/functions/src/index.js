"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = exports.hello_World = void 0;
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.hello_World = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello!");
});
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
exports.createYoyaku = functions.firestore
    .document('yoyaku/{uid}')
    .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();
    // access a particular field as you would any JS property
    const uid = newValue.name;
    console.log(uid);
    // perform desired operations ...
});
exports.updateUser = functions.firestore
    .document('yoyaku/{uid}')
    .onUpdate((change, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = change.after.data();
    // ...or the previous value before this update
    const previousValue = change.before.data();
    // access a particular field as you would any JS property
    const namae = newValue.namae;
    console.log(namae);
    // perform desired operations ...
});
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
//# sourceMappingURL=index.js.map