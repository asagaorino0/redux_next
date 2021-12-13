import Link from 'next/link'

export default function User({ user }: { user: any }) {
    // console.log(user.uid && { user })
    return (
        <li>
            <Link href="/user/[uid]" as={`/user/${user.uid}`}>
                <a>{user.name}</a>
            </Link>
        </li>
    )
}