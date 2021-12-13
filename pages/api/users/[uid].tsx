import { users } from '../../../src/data'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function personHandler(query: { uid: string }, res: NextApiResponse) {
    const filtered = users.filter((p: any) => p.uid === query.uid)

    // User with id exists
    if (filtered.length > 0) {
        res.status(200).json(filtered[0])
    } else {
        res.status(404).json({ message: `User with id: ${query.uid} not found.` })
    }
}