import { users } from '../../src/data'
// import { name } from '../../../data'
// import { UserState } from "../../src/types/user";
type UserState = {
    name: string,
    uid: string,
    icon: string | undefined
    namae: string,
    sei: string,
    age: number,
    menu: string,
    day: string,
    tokoro: string,
    area: string,
    sns: string,
    qr: string,
    users: any
}
import type { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(users)
    // console.log(people)
    // res.status(200).json({ message: `you requested for ${people} ` });
}
