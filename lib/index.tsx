// import liff from '@line/liff';
import * as line from '@line/bot-sdk';
import React, { useState, useEffect } from 'react';
/**
* ライブラリの読み込み
*/
// const line = require('@line/bot-sdk')

/**
* 初期設定
*/
const config = {
    channelAccessToken: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!,
    channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!
};
const client = new line.Client(config);

/**
* 自作関数群
*/

/**
 * 2000文字を区切りテキストを分割し配列を返す関数
 * @param {String} text
 */
const [text, setText] = useState<string>('');
exports.getTextArray = (text: string) => {
    const texts = []
    if (text.length > 2000) {
        while (text.length > 2000) {
            texts.push(text.substr(0, 2000))
            text = text.slice(2000, -1)
        }
    }
    texts.push(text)
    return texts
}

/**
* LINEサーバーからファイルをbufferでダウンロード
* @param {Number} messageId
*/
const [messageId, setMessageId] = useState<string>('');
exports.getContentBuffer = (messageId: string) => {
    return new Promise((resolve, reject) => {
        client.getMessageContent(messageId).then(stream => {
            const content: any = []
            stream
                .on('data', chunk => {
                    content.push(Buffer.from(chunk))
                })
                .on('error', reject)
                .on('end', () => {
                    resolve(Buffer.concat(content))
                })
        })
    })
}