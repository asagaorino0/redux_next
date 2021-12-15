import type { NextApiRequest, NextApiResponse } from 'next'
import * as line from '@line/bot-sdk';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // export const Verify = async (req: NextApiRequest, res: NextApiResponse) => {
    // // id tokenを取得
    // // const config: any = {
    // //     channelSecret: process.env.CHANNEL_SECRET,//チャンネルシークレット
    // //     idToken: process.env.ACCESS_TOKEN, //アクセストークン
    // // };
    // // console.log('firebase', config)
    // // const client = new line.Client(config);
    // const idToken = req.body.idToken;


    // // id tokenの有効性を検証する
    // const response = async fetch('https://api.line.me/oauth2/v2.1/verify', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: `id_token=${idToken}&client_id=${process.env.CHANNEL_SECRET!}`,
    // });
    // const data = await res.json();
    // if (response.status !== 200) {
    //     // IDトークンが有効ではない場合
    //     res.status(400).send(data.error);
    //     return;
    // }
    res.json({ message: "Hello world" })

    // // LINE IDでfirebaseトークンを発行して返却
    // const token = await auth.createCustomToken(data.sub);
    // // const token = await firebase.auth().createCustomToken(data.sub);
    // res.status(200).send(token);
};