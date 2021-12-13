import { UsersItem } from '../../../src/data'

import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(UsersItem)
    // console.log(people)
    // res.status(200).json({ message: `you requested for ${people} ` });
}
