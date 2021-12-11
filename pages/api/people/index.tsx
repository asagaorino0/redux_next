import { people } from '../../../src/data'
// import { people } from '../../../data'
import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // res.status(200).json(people)
    // res.status(200).json({ message: `you requested for ${people} ` });
    res.status(200).json({ message: `you requested for ${people} ` });
}