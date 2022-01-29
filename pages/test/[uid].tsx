import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = async (url: string) => {
    const res = await fetch('/api/test')
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}
// export const Person = async (url: string) => {
export default function Test() {
    const { query } = useRouter()
    // const { data, error } = useSWR(
    //     () => query.uid && `/api/test/${query.uid}`,
    //     fetcher
    // )
    // console.log(data)
    // if (error) return <div>{error.message}</div>
    // if (!data) return <div>Loading...</div>



    // console.log(data)
    const line = require('@line/bot-sdk');
    const config = {
        channelAccessToken: process.env.NEXT_PUBLIC_LINE_ACCESS_TOKEN!,
        channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!
    };
    const client = new line.Client(config);
    console.log('appline', config)
    const message = {
        type: 'text',
        text: 'Hello World!'
    };
    client.pushMessage(` ${query.uid}`, message)
        .then(() => {
            alert(` userId: ${query.uid}`)
        })
    return (
        <table>
            <thead>
                <tr>
                    <th>uid</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{query.uid}</td>
                    {/* <td>{data.name}</td> */}
                </tr>
                {/* {
                    data
                        .filter((data: any) => data.uid === query.uid)
                        .map((data: any) => {
                            return (
                                <tr key={data.uid}>
                                    <td>
                                        {data.uid}
                                    </td>
                                    <td>
                                        {data.name}
                                    </td>
                                </tr>
                            )
                        })
                } */}
            </tbody>
        </table>
    )
}