// import { user } from '../../../src/App'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function personHandler(query: { id: string }, res: NextApiResponse) {
    // const filtered = user.filter((p: any) => p.id === query.id)

    // User with id exists
    // if (filtered.length > 0) {
    res.status(200).json(query.id)
    // } else {
    // res.status(404).json({ message: `User with id: ${query.id} not found.` })
}
// }