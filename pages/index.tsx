import useSWR from 'swr'
import Person from '../components/Person'

// const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR('/api/people', fetcher)
  console.log({ data })
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  const fetchAPI = async () => {
    const response = await fetch(`/api/people`);
    const data = await response.json();
    console.log(data);
  }
  return (
    <div>
      <button onClick={fetchAPI}>
        fetchAPI
      </button>

      {data.map((p: any, i: any) => (
        <Person key={i} person={p} />
      ))}
    </div>
  )

}


