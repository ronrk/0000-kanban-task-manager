import {
  Column,
  connectMongo,
  server404Error,
  Subtask,
  Task,
  wrongMethodError,
} from '@/database';
import { ISubtaskSchema, ITask } from '@/types';
import { HydratedDocument } from 'mongoose';
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

    const column = await Column.findById(query.columnId).select('tasks');
    if (!column) {
      return server404Error(res, `Cant find column with id :${query.columnId}`);
    }

    if (method === 'GET') {
      const columnFound = await Column.findById(column._id);
      return res.status(200).json({
        message: 'Get Tasks by Column Id',
        tasks: columnFound.tasks,
      });
    }

    if (method === 'POST') {
      if (!body) {
        return server404Error(res, 'createNewTask: No data on req.body');
      }
      const subtasks = body.subtasks.map(
        (sub: ISubtaskSchema) => new Subtask(sub)
      );
      const newTask = new Task({ ...body, subtasks });
      column.tasks.push(newTask._id);
      await column.save();
      await newTask.save();
      await subtasks.forEach(
        async (sub: HydratedDocument<ISubtaskSchema>) => await sub.save()
      );
      return res.status(201).json({ body, newTask, subtasks, column });
    }
    if (method === 'PATCH') {
      const task = await Task.findById(body.taskId);
      if (!task) {
        return server404Error(res, `Cant find column with id :${body.taskId}`);
      }
      const newColumn = await Column.findById(body.newColId);
      if (!newColumn) {
        return server404Error(
          res,
          `Cant find column with id :${body.newColId}`
        );
      }
      column.tasks = column.tasks.filter(
        (tsk: ITask) => tsk._id.toString() !== task._id.toString()
      );
      newColumn.tasks.push(task._id);
      await column.save();
      await newColumn.save();
      return res
        .status(200)
        .json({ message: 'Move Task To new Column', task, column, newColumn });
    }
    return wrongMethodError(req, res, ['GET', 'POST', 'PATCH']);
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error propeties/', error });
  }
}
