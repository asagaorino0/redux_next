"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateYoyaku = exports.createYoyaku_redux_next = void 0;
const functions = require("firebase-functions");
const line = require("@line/bot-sdk");
const admin = require('firebase-admin');
admin.initializeApp();
// const config = {
//     channelSecret: '622174c0ed8b54e0d14ff83058f7b1d7',//チャンネルシークレット
//     channelAccessToken: 'u/gxNRim4lRdiZrvvPhus23nEgxtWFAo4Q3Ju/WWoqK/4Wk5WJ4KGitGYC7oQ4O+rUcofpkjVddvZ8667cbk76d0MaQ68MlZs4hPu3DHY0YmLzd1JRiaFX87bT9+18RmfxYr/8B4lUQg0SyL2Eux5QdB04t89/1O/w1cDnyilFU=', //アクセストークン
// };
// // const config: any = {
// //     channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECRET,//チャンネルシークレット
// //     channelAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN, //アクセストークン
// // };
// const client = new line.Client(config);
exports.createYoyaku_redux_next = functions.firestore
    .document('yoyaku/{uid}')
    .onCreate((snap, context) => {
    const newValue = snap.data();
    const namae = newValue.name;
    console.log(namae);
    // const config = {
    //     channelSecret: '622174c0ed8b54e0d14ff83058f7b1d7',//チャンネルシークレット
    //     channelAccessToken: 'u/gxNRim4lRdiZrvvPhus23nEgxtWFAo4Q3Ju/WWoqK/4Wk5WJ4KGitGYC7oQ4O+rUcofpkjVddvZ8667cbk76d0MaQ68MlZs4hPu3DHY0YmLzd1JRiaFX87bT9+18RmfxYr/8B4lUQg0SyL2Eux5QdB04t89/1O/w1cDnyilFU=', //アクセストークン
    // };
    const config = {
        channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECRET,
        channelAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    };
    // // // LINE bot
    // const config = {
    //     channelSecret: "4d5f11ad200af09808a7b5057ffe45e1",//チャンネルシークレット
    //     channelAccessToken: "RyGBqiciaprN0e4/UWor9L4kgra7M560lqinnyXyu6LWwnSNI5O7ZA2Ug4MHnpoViLyk0pwZfJ5bCdOVWNUmlM7PKtJPbIq1cevZtPmVuPsv0nKutgL8prDWKGc6NDnQgYosP8BwHh3Ss6ZRG+2tfwdB04t89/1O/w1cDnyilFU=" //アクセストークン
    // };
    const client = new line.Client(config);
    client.broadcast({
        type: "text",
        text: `hello!${namae}`
    })
        .then(data => console.log(data))
        .catch(e => console.log(e));
});
exports.updateYoyaku = functions.firestore
    .document('yoyaku/{uid}')
    .onUpdate((change, context) => {
    const newValue = change.after.data();
    const namae = newValue.namae;
    console.log(namae);
    // const config = {
    //     channelSecret: '622174c0ed8b54e0d14ff83058f7b1d7',//チャンネルシークレット
    //     channelAccessToken: 'u/gxNRim4lRdiZrvvPhus23nEgxtWFAo4Q3Ju/WWoqK/4Wk5WJ4KGitGYC7oQ4O+rUcofpkjVddvZ8667cbk76d0MaQ68MlZs4hPu3DHY0YmLzd1JRiaFX87bT9+18RmfxYr/8B4lUQg0SyL2Eux5QdB04t89/1O/w1cDnyilFU=', //アクセストークン
    // };
    const config = {
        channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECRET,
        channelAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    };
    // // LINE bot
    // const config = {
    //     channelSecret: "4d5f11ad200af09808a7b5057ffe45e1",//チャンネルシークレット
    //     channelAccessToken: "RyGBqiciaprN0e4/UWor9L4kgra7M560lqinnyXyu6LWwnSNI5O7ZA2Ug4MHnpoViLyk0pwZfJ5bCdOVWNUmlM7PKtJPbIq1cevZtPmVuPsv0nKutgL8prDWKGc6NDnQgYosP8BwHh3Ss6ZRG+2tfwdB04t89/1O/w1cDnyilFU=" //アクセストークン
    // };
    const client = new line.Client(config);
    console.info('res data');
    client.broadcast({
        type: "text",
        text: `hello!${namae}`
    }).then(data => console.log(data))
        .catch(e => console.log(e));
});
//# sourceMappingURL=index.js.map