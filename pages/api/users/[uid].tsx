import { UsersItem } from '../../../src/data'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function personHandler(query: { uid: string }, res: NextApiResponse) {
    // const filtered = UsersItem.filter((p: any) => p.id === query.id)

    // User with id exists
    // if (filtered.length > 0) {
    res.status(200).json(query.uid)
    // } else {
    // res.status(404).json({ message: `User with id: ${query.id} not found.` })
}
// }