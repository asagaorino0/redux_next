import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import liff from '@line/liff';


const Login: NextPage = () => {
    const loginUrl = process.env.NEXT_PUBLIC_LINE_LOGIN_URL
    const LINEID = process.env.NEXT_PUBLIC_REACT_APP_LIFF_ID
    // const LINEID = "1656149559-xXM4l4Gp"
    // const loginUrl = "https://access.line.me/oauth2/v2.1/authorize?app_id=1656650515-ENMoxvjb&client_id=1656650515&scope=chat_message.write+openid+profile&state=MTSFhIGGxsff&bot_prompt=aggressive&response_type=code&code_challenge_method=S256&code_challenge=Hx-YFyPAvO9ZQIg5pQpaGQuMChsOE11Raf_3DHDGFgY&liff_sdk_version=2.11.1&type=L&redirect_uri=http://localhost:3000/"
    console.log('LINEID', LINEID)
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [uid, setUid] = useState("");

    return (
        <div className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justifycenter flex-col">
            <a href="https://access.line.me/oauth2/v2.1/authorize?app_id=1656650515-ENMoxvjb&client_id=1656650515&scope=chat_message.write+openid+profile&state=MTSFhIGGxsff&bot_prompt=aggressive&response_type=code&code_challenge_method=S256&code_challenge=Hx-YFyPAvO9ZQIg5pQpaGQuMChsOE11Raf_3DHDGFgY&liff_sdk_version=2.11.1&type=L&redirect_uri=http://localhost:3000">
                <div>
                    ログイン
                </div>
            </a>
        </div>
    )
}

export default Login
