import { NextApiRequest, NextApiResponse } from 'next';
import {
  connectMongo,
  server404Error,
  wrongMethodError,
  Column,
  Task,
} from '../../../lib';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, query, method } = req;
  try {
    await connectMongo().catch((error) =>
      res.status(405).json({ message: 'Error connecting to DB', error: error })
    );

    const column = await Column.findById(query.columnId);
    if (!column) {
      server404Error(res, `Cant find column with id :${query.columnId}`);
      return;
    }

    if (method === 'POST') {
      if (!body) {
        server404Error(res, 'createNewTask: No data on req.body');
        return;
      }
      const newTask = await Task.create({ ...body, colStatus: column.status });
      column.tasks.push(newTask._id);
      await column.save();

      return res
        .status(200)
        .json({ message: 'Create new board', newTask, column });
    }
    wrongMethodError(req, res, ['POST']);
    return;
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error propeties/', error });
  }
}
