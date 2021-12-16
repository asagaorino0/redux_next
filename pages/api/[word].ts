import { NextApiRequest, NextApiResponse } from 'next'
import * as line from '@line/bot-sdk';

const config: any = {
    channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECRET,//チャンネルシークレット
    channelAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN, //アクセストークン
};

const client = new line.Client(config);

export default ({ query: { word } }: { query: { word: string } }, res: NextApiResponse) => {
    console.info('res data', word)
    client.multicast([`${word} `], {
        type: 'text',
        text: 'hello, world',
    }).then(data => console.log(data))
        // client.broadcast({
        //     type: "text",
        //     text: word
        // }).then(data => console.log(data))
        .catch(e => console.log(e))
    res.status(200).json({ message: `you requested for ${word} ` });
};
///////////////////////////////////////////////////////////////////////////////////////////////
// const config: any = {
//     channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECRET,//チャンネルシークレット
//     channelAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN, //アクセストークン
// };

// // line.middleware(config), (req: NextApiRequest, res: NextApiResponse) => {
// export default ({ query: { word } }: { query: { word: string } }, req: NextApiRequest, res: NextApiResponse) => {
//     console.log(req.body.events);
//     Promise
//         .all(req.body.events.map(handleEvent))
//         .then((result) => res.json(result));
// };

// const client = new line.Client(config);

// function handleEvent(event: any) {
//     if (event.type !== 'message' || event.message.type !== 'text') {
//         return Promise.resolve(null);
//     }

//     return client.replyMessage(event.replyToken, {
//         type: 'text',
//         text: event.message.text
//     });
// }



