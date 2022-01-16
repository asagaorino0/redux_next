import * as functions from 'firebase-functions';
import * as line from '@line/bot-sdk';

require('dotenv').config();

const admin = require('firebase-admin');
admin.initializeApp();

const config = {
    channelAccessToken: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!,
    channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!,
};

const client = new line.Client(config);

exports.helloworld = functions.https.onRequest(async (req, res) => {
    var data = req.body;
    console.log(data, '======');
    client.pushMessage('Uda1c6a4e5b348c5ba3c95de639e32414', {
        type: 'text',
        text: 'Hello World!',
    }).then(() => {
        console.log('send message success!!!');
    }).catch((err: any) => {
        console.log('🚀 ~ file: Login.tsx ~ line 21 ~ sendMessage ~ err', err);
    });
});

export const updateYoyaku = functions.firestore
    .document('users/{uid}/tomare/{menu}')
    .onUpdate((change, context) => {
        const newValue = change.after.data();
        const gappi = newValue.gappi;
        // const uid = newValue.uid;
        const am_pm = newValue.am_pm;
        const config = {
            channelAccessToken: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!,
            channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!
        };
        const client = new line.Client(config);
        const message1: any = {
            type: 'text',
            text: `hello!${gappi}${am_pm}に予約枠を設定しました。オファーをお待ちください。`
        };
        const message2: any = {
            type: 'text',
            text: `オファーをお待ちください。`
        };
        const uid = "Uda1c6a4e5b348c5ba3c95de639e32414"
        client.pushMessage(
            uid,
            [message1, message2],
        )
            .then(namae => console.log(namae))
            .catch(e => console.log(e))
    });