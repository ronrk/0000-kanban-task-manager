import {
  connectMongo,
  server404Error,
  Subtask,
  Task,
  wrongMethodError,
} from '@/database';
import { NextApiRequest, NextApiResponse } from 'next';

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
      return server404Error(
        res,
        `Cant find subtask with id :${query.subtaskId}`
      );
    }
    const task = await Task.findById(query.taskId);
    if (!task) {
      return server404Error(res, `Cant find task with id :${query.task}`);
    }
    if (method === 'GET') {
      return res.status(200).json({ message: 'Get Single Task', subtask });
    }

    if (method === 'PATCH') {
      subtask.isCompleted = !subtask.isCompleted;
      await subtask.save();
      return res.status(200).json({ message: 'Update Subtask', subtask });
    }

    if (method === 'DELETE') {
      await subtask.remove();
      task.subtasks = task.subtasks.filter((sub) => sub._id !== subtask._id);
      await task.save();
      return res
        .status(200)
        .json({ message: 'Remove subtask', subtaskDeleted: subtask._id });
    }

    wrongMethodError(req, res, ['GET', 'POST', 'DELETE']);
    return;
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error propeties/', error });
  }
}
