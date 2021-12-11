import useSWR from 'swr'
import Person from '../components/Person'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index(data: any) {
    //   const { data: any, error } = useSWR('/api/people', fetcher)
    //   console.log({ data })
    //   if (error) return <div>Failed to load</div>
    //   if (!data) return <div>Loading...</div>


    //   return (
    //     <div>
    //       {data.map((p: any, i: any) => (
    //         <Person key={i} person={p} />
    //       ))}
    //     </div>
    //   )
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
            {/* {
        data.map((data: any) => {
          <div key={data.id}>
            {data.name}
          </div>
        })
      } */}

        </div>
    )

}


