// import { people } from '../../../src/data'
import { people } from '../../../data'
type People = {
    name: string
    id: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    gender: string,
}
import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(people)
    // console.log(people)
    // res.status(200).json({ message: `you requested for ${people} ` });
}
