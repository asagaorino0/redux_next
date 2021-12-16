import { NextApiRequest, NextApiResponse } from 'next'
import * as line from '@line/bot-sdk';

const config: any = {
    channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECRET,//チャンネルシークレット
    channelAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN, //アクセストークン
};

const client = new line.Client(config);

export default ({ query: { word } }: { query: { word: string } }, res: NextApiResponse) => {
    console.info('res data', word)
    // const message1 = {
    //     type: 'text',
    //     text: 'Hello,'
    // };

    // const message2 = {
    //     type: 'text',
    //     text: 'World!'
    // };

    client.multicast([`Uda1c6a4e5b348c5ba3c95de639e32414`], {
        //     // client.multicast([`${word}`, `Uda1c6a4e5b348c5ba3c95de639e32414`], {
        //     //     // [message1, message2]
        //     //     {
        //     //         type: 'text',
        //     //         text: 'World!'
        //     //     }
        //     // )
        //     // client.multicast([`${word},Uda1c6a4e5b348c5ba3c95de639e32414 `], {
        //     type: 'text',
        //     text: 'hello, world',
        // }).then(data => console.log(data))
        // client.broadcast({
        type: "text",
        text: "hello!"
    }).then(data => console.log(data))
        .catch(e => console.log(e))
    res.status(200).json({ message: `you requested for ${word} ` });
};




