import * as functions from 'firebase-functions';
import * as line from '@line/bot-sdk';
import { writeBatch, doc } from "firebase/firestore";

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


export const onWriteReview = functions.firestore
    .document('users/{uid}/tomare/{star}')
    .onCreate((snap, context) => {
        const newValue = snap.data();
        const star = newValue.star;
        const uid = newValue.uid;
        const db = admin.firestore();
        const batch = writeBatch(db);
        try {
            // 平均starの計算
            let { star1 = 0, star2 = 0, star3 = 0, star4 = 0, star5 = 0 } = star;
            if (newValue.star === 1) {
                star1 += 1;
            } else if (newValue.star === 2) {
                star2 += 1;
            } else if (newValue.star === 3) {
                star3 += 1;
            } else if (newValue.star === 4) {
                star4 += 1;
            } else if (newValue.star === 5) {
                star5 += 1;
            }
            let aveStar =
                (star1 + star2 * 2 + star3 * 3 + star4 * 4 + star5 * 5) /
                (star1 + star2 + star3 + star4 + star5);
            aveStar = Math.round(aveStar * 100) / 100
            // userの更新
            let params = {};
            if (newValue.star === 1) {
                params = {
                    star1: admin.firestore.FieldValue.increment(1),
                    star: aveStar
                }
            } else if (newValue.star === 2) {
                params = {
                    star2: admin.firestore.FieldValue.increment(1),
                    score: aveStar
                }
            } else if (newValue.star === 3) {
                params = {
                    star2: admin.firestore.FieldValue.increment(1),
                    score: aveStar
                };
            } else if (newValue.star === 4) {
                params = {
                    star2: admin.firestore.FieldValue.increment(1),
                    score: aveStar
                }
            } else if (newValue.star === 5) {
                params = {
                    star2: admin.firestore.FieldValue.increment(1),
                    score: aveStar
                }
            }
            const userRef = doc(db, "users", uid);
            batch.update(userRef, params);
        } catch (err) {
            console.log(err);
        }
    });