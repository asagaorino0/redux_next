// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//     name: string
// }
// const name = 'hogehoge';//無効、効かない、反応なし
export default (query: { name: string }, res: NextApiResponse) => {

    res.status(200).json({ message: `you requested for ${query.name} ` });
};

// export default ({ query: { name } }, res) => {
//     res.status(200).json({ message: `you requested for ${name} ` });
// };
