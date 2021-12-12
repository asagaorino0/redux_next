import Link from 'next/link'

export default function Person({ user }: { user: any }) {
    // console.log(user.uid && { user })
    return (
        <li>
            <Link href="/user/[id]" as={`/user/${user.uid}`}>
                <a>{user.name}</a>
            </Link>
        </li>
    )
}