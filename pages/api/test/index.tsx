// import { users } from '../../../src/data'


// type UserState = {
//     name: string,
//     uid: string,
//     icon: string | undefined
//     namae: string,
//     sei: string,
//     age: number,
//     menu: string,
//     day: string,
//     tokoro: string,
//     area: string,
//     sns: string,
//     qr: string,
//     users: any
// }
import type { NextApiRequest, NextApiResponse } from 'next'
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
// res.status(200).json(users)
// res.json({ message: "Hello world" })
// console.log(people)
// res.status(200).json({ message: `you requested for ${users} ` });
// }


import * as line from '@line/bot-sdk';
// const config: any = {
//   channelAccessToken: process.env.ACCESS_TOKEN,
//   channelSecret: process.env.CHANNEL_SECRET
// };
// const lineTuchi = function () {
//   const client = new line.Client({
//     channelAccessToken: 'u/gxNRim4lRdiZrvvPhus23nEgxtWFAo4Q3Ju/WWoqK/4Wk5WJ4KGitGYC7oQ4O+rUcofpkjVddvZ8667cbk76d0MaQ68MlZs4hPu3DHY0YmLzd1JRiaFX87bT9+18RmfxYr/8B4lUQg0SyL2Eux5QdB04t89/1O/w1cDnyilFU='
//   });
const config = {
    channelSecret: "4d5f11ad200af09808a7b5057ffe45e1",//チャンネルシークレット
    channelAccessToken: "RyGBqiciaprN0e4/UWor9L4kgra7M560lqinnyXyu6LWwnSNI5O7ZA2Ug4MHnpoViLyk0pwZfJ5bCdOVWNUmlM7PKtJPbIq1cevZtPmVuPsv0nKutgL8prDWKGc6NDnQgYosP8BwHh3Ss6ZRG+2tfwdB04t89/1O/w1cDnyilFU=" //アクセストークン
};
const client = new line.Client(config);
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    Promise.all(req.body.events.map(handleEvent))
        .then(() => res.status(200).end())
        .catch((err) => {
            console.error(err);
            res.status(500).end()
        })
};
async function handleEvent(event: any) {
    // return client.replyMessage(event.replyToken, { type: "text", text: event.message.text + "ね" })
    //ユーザから送られた各メッセージに対する処理を実装する。
    //https://developers.line.biz/ja/reference/messaging-api/#message-event を参照。
    switch (event.message.type) {
        case 'text':
            return client.replyMessage(event.replyToken, { type: "text", text: event.message.text });
        case 'image':
            return client.replyMessage(event.replyToken, { type: "text", text: '画像を受け取りました。' });
        case 'video':
            return client.replyMessage(event.replyToken, { type: "text", text: '動画を受け取りました。' });
        case 'audio':
            return client.replyMessage(event.replyToken, { type: "text", text: '音声を受け取りました。' });
        case 'file':
            return client.replyMessage(event.replyToken, { type: "text", text: 'ファイルを受け取りました。' });
        case 'location':
            return client.replyMessage(event.replyToken, { type: "text", text: '位置情報を受け取りました。' });
        case 'sticker':
            return client.replyMessage(event.replyToken, { type: "text", text: 'スタンプを受け取りました。' });
        default:
            return Promise.resolve(null);
    }
}
// export const lineBot = functions.https.onRequest(app);