import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = async (url: string) => {
    const res = await fetch('/api/users')
    const data = await res.json()
    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}
// export const Person = async (url: string) => {
export default function User() {
    const { query } = useRouter()
    const { data, error } = useSWR(
        () => query.uid && `/api/users/${query.uid}`,
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
                    <td>{data.name}</td>
                </tr>
            </tbody>
        </table>
    )
}