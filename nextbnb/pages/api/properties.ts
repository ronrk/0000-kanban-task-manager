import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../lib/models/User';
import connectMongo from '../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo().catch((error) =>
      res.status(405).json({ message: 'Error connecting to DB', error: error })
    );

    const user = await User.findById('63ee69fd1c02a8e1302127a0');
    return res.status(200).json({ message: 'Disconnected', user });
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error propeties/', error });
  }
}
