import { useRouter } from 'next/router'
import useSWR from 'swr'
// import type { NextApiRequest, NextApiResponse } from 'next'
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     res.status(200).json(name)
// export default (query: { name: string }, res: NextApiResponse) => {
//     res.status(200).json({ message: `you requested for ${query.name} ` });
// };

const fetcher = async (url: string) => {
    const res = await fetch('/api/')
    const data = await res.json()
    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}
export default function Name() {
    const { query } = useRouter()
    const { data, error } = useSWR(
        () => query.id && `/api/${query.name}`,
        fetcher
    )
    console.log(data)
    if (error) return <div>{error.message}</div>
    if (!data) return <div>Loading...</div>
    // console.log(data)

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{query.name}</td>
                </tr>
            </tbody>
        </table>
    )
}