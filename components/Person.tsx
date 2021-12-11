import Link from 'next/link'

// export default function Person(person: any) {
//     console.log({ person })
//     return (
//         <li>
//             {/* <Link href="/person/[id]" as={`/person/${person.id}`}>
//                 <a>{person.name}</a>
//             </Link> */}
//             <Link href="/person/[id]" as={`/person/${person.person.id}`}>
//                 <a>{person.person.name}</a>
//             </Link>
//         </li>
//     )
// }
export default function Person({ person }: { person: any }) {
    console.log(person.id && { person })
    return (
        <li>
            <Link href="/person/[id]" as={`/person/${person.id}`}>
                <a>{person.name}</a>
            </Link>
        </li>
    )
}