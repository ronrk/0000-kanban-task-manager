import {
  Column,
  connectMongo,
  server404Error,
  Subtask,
  Task,
  wrongMethodError,
} from '@/database';
import { ISubtaskSchema, ITaskSchema } from '@/types';
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
    const column = await Column.findById(query.columnId);
    const task = await Task.findById(query.taskId);
    if (!task) {
      return server404Error(res, `Cant find task with id :${query.taskId}`);
    }
    if (method === 'GET') {
      return res.status(200).json({ message: 'Get Single Task', task });
    }
    if (method === 'POST') {
      if (!body) {
        return server404Error(res, 'createNewTask: No data on req.body');
      }
      const newSubtask = await Subtask.create(body);
      task.subtasks.push(newSubtask._id);
      await task.save();
      return res
        .status(200)
        .json({ message: 'Create new subtask', newSubtask, task });
    }

    if (method === 'PATCH') {
      if (!body) {
        return server404Error(res, 'UpdateTask: no data on req.body');
      }
      try {
        body.subtasks.forEach(async (subtask: ISubtaskSchema) => {
          await Subtask.findByIdAndUpdate(subtask._id, subtask).catch(
            (error) => {
              console.log({ error });
            }
          );
        });

        const isTaskAlreadyInColumn = column.tasks.find(
          (tsk: ITaskSchema) => tsk._id.toString() === task._id.toString()
        );

        if (!isTaskAlreadyInColumn) {
          const originalColumn = await Column.findById(body.originalColumn._id);
          column.tasks.push(task._id);
          originalColumn.tasks = originalColumn.tasks.filter(
            (tsk: ITaskSchema) => tsk._id.toString() !== task._id.toString()
          );
          await column.save();
          await originalColumn.save();
        }

        const updatedTask = await Task.findOneAndUpdate(
          { _id: task._id },
          body.task,
          {
            new: true,
            runValidators: true,
          }
        );

        return res.status(200).json({ message: 'Update Task', updatedTask });
      } catch (error) {
        return res.status(401).json(error);
      }
    }

    if (method === 'DELETE') {
      await task.remove();
      return res
        .status(200)
        .json({ message: 'Remove Task', taskDeleted: task._id });
    }

    return wrongMethodError(req, res, ['GET', 'POST', 'PATCH', 'DELETE']);
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error propeties/', error });
  }
}
