import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = async (url: string) => {

    const res = await fetch('/api/users')
    const data = await res.json()
    // const data = Object.entries(await res.json());
    // console.log(data)
    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}
// export const Person = async (url: string) => {
export default function User() {
    const { query } = useRouter()
    const { data, error } = useSWR(
        () => query.id && `/api/users/${query.id}`,
        fetcher
    )
    console.log(data)
    if (error) return <div>{error.message}</div>
    if (!data) return <div>Loading...</div>
    // const res = await fetch(url);
    // const data = () => [query.id && data]
    // console.log(data)

    return (
        <table>
            <thead>
                <tr>
                    <th>uid</th>
                    <th>Name</th>
                    {/* <th>Height</th>
                    <th>Mass</th>
                    <th>Hair color</th>
                    <th>Skin color</th>
                    <th>Eye color</th>
                    <th>Gender</th> */}
                </tr>
            </thead>
            <tbody>
                {/* <tr> */}
                {/* <td>{query.id}</td>
                    <td>{data.name}</td> */}
                {/* <td>{data.height}</td>
                    <td>{data.mass}</td>
                    <td>{data.hair_color}</td>
                    <td>{data.skin_color}</td>
                    <td>{data.eye_color}</td>
                    <td>{data.gender}</td> */}
                {
                    data
                        .filter((data: any) => data.uid === query.id)
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
                }
            </tbody>
        </table>
    )
}