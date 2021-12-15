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
//    channelAccessToken: process.env.ACCESS_TOKEN,
//   });
const config: any = {
    channelSecret: process.env.CHANNEL_SECRET,//チャンネルシークレット
    channelAccessToken: process.env.ACCESS_TOKEN, //アクセストークン
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
    return client.replyMessage(event.replyToken, { type: "text", text: event.message.text + "ね" })
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