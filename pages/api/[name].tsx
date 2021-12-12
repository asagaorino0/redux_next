// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// const fetcher = async (url: string) => {
//     const res = await fetch('../../../src/App')
//     const data = await res.json()
//     if (res.status !== 200) {
//         throw new Error(data.message)
//     }
//     return data
// }
export default (query: { name: string }, res: NextApiResponse) => {

    res.status(200).json({ message: `you requested for ${query.name} ` });
};


// export default function User() {
//     const { query } = useRouter()
//     const { data, error } = useSWR(
//         () => query.id && `/api/users/${query.id}`,
//         fetcher
//     )
//     console.log(data)
//     if (error) return <div>{error.message}</div>
//     if (!data) return <div>Loading...</div>