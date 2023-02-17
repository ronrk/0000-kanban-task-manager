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

    const task = await Task.findById(query.taskId);
    if (!task) {
      server404Error(res, `Cant find task with id :${query.taskId}`);
      return;
    }
    if (method === 'GET') {
      return res.status(200).json({ message: 'Get Single Task', task });
    }
    if (method === 'POST') {
      if (!body) {
        server404Error(res, 'createNewTask: No data on req.body');
        return;
      }
      const newSubtask = await Subtask.create(body);
      task.subtasks.push(newSubtask._id);
      await task.save();
      return res
        .status(200)
        .json({ message: 'Create new board', newSubtask, task });
    }

    if (method === 'PATCH') {
      if (!body) {
        server404Error(res, 'UpdateTask: no data on req.body');
        return;
      }
      const updatedTask = await Task.findOneAndUpdate({ _id: task._id }, body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json({ message: 'Update Task', updatedTask });
    }

    if (method === 'DELETE') {
      await task.remove();
      return res
        .status(200)
        .json({ message: 'Remove Task', taskDeleted: task._id });
    }

    wrongMethodError(req, res, ['GET', 'POST', 'PATCH', 'DELETE']);
    return;
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error propeties/', error });
  }
}
