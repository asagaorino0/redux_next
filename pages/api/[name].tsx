import { users } from '../../src/data'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function personHandler(query: { name: string }, res: NextApiResponse) {
    const filtered = users.filter((p: any) => p.name === query.name)

    // User with id exists
    if (filtered.length > 0) {
        res.status(200).json(filtered[0])
    } else {
        res.status(404).json({ message: `User with id: ${query.name} not found.` })
    }
}