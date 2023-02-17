import { NextApiRequest, NextApiResponse } from 'next';
import {
  connectMongo,
  server404Error,
  wrongMethodError,
  Task,
  Subtask,
} from '../../../../lib';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, query, method } = req;

  try {
    await connectMongo().catch((error) =>
      res.status(405).json({ message: 'Error connecting to DB', error: error })
    );

    const subtask = await Subtask.findById(query.subtaskId);
    if (!subtask) {
      server404Error(res, `Cant find subtask with id :${query.subtaskId}`);
      return;
    }
    if (method === 'GET') {
      return res.status(200).json({ message: 'Get Single Task', subtask });
    }

    if (method === 'PATCH') {
      if (!body) {
        server404Error(res, 'UpdateSubtask: no data on req.body');
        return;
      }
      const updatedSubtask = await Subtask.findOneAndUpdate(
        { _id: subtask._id },
        body,
        {
          new: true,
          runValidators: true,
        }
      );
      return res
        .status(200)
        .json({ message: 'Update Subtask', updatedSubtask });
    }

    if (method === 'DELETE') {
      await subtask.remove();
      return res
        .status(200)
        .json({ message: 'Remove subTask', subtaskDeleted: subtask._id });
    }

    wrongMethodError(req, res, ['GET', 'POST', 'DELETE']);
    return;
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error propeties/', error });
  }
}
