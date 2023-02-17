import { NextApiRequest, NextApiResponse } from 'next';
import {
  connectMongo,
  server404Error,
  User,
  wrongMethodError,
} from '@/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method, query } = req;
  try {
    await connectMongo().catch((error) =>
      res.status(405).json({ message: 'Error connecting to DB', error: error })
    );
    const user = await User.findById(query.uid);
    if (!user) {
      server404Error(res, `Cant find user with id: ${query.uid}`);
      return;
    }
    if (method === 'PATCH') {
      if (!body) {
        server404Error(res, 'updateUser : No data on req.body');
        return;
      }
      const updatedUser = await User.findOneAndUpdate({ _id: user._id }, body, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({ message: 'Update User', updatedUser });
    }
    if (method === 'DELETE') {
      await user.remove();
      return res
        .status(200)
        .json({ message: 'User Deleted', deleted: user._id });
    }
    wrongMethodError(req, res, ['PATCH', 'DELETE']);
    return;
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error propeties/', error });
  }
}
