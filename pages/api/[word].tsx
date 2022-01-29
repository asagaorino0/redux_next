import { NextApiResponse } from 'next'
import * as line from '@line/bot-sdk';

console.log(process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!)

const config = {
    channelAccessToken: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!,
    channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!
};

const client = new line.Client(config);

export default ({ query: { word } }: { query: { word: string } }, res: NextApiResponse) => {
    console.info('res data', word)
    const message: any = {
        type: 'text',
        text: 'Hello,'
    };

    // client.broadcast({
    //     type: "text",
    //     text: word
    // })
    const uid = "Uda1c6a4e5b348c5ba3c95de639e32414"
    client.pushMessage(
        uid,
        [message,
            // template
        ],
    )
        .then(data => console.log(data))
        .catch(e => console.log(e))
    res.status(200).json({ message: `you requested for ${word} ` });
};