// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Board, Column, Task, Subtask, connectMongo } from '../../lib';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo().catch(() =>
    res.status(405).json({ error: 'Error in the Connction' })
  );
  try {
    const user = new User({
      username: 'TEST USER',
      email: 'TEST@TEST.COM',
    });
    const board = new Board({
      name: 'Platform Launch',
      user: user._id,
    });

    const column = new Column({
      status: 'Todo',
    });

    const task = new Task({
      title: 'Build UI for onboarding flow',
      description: 'SOME DESCRIPTION',
      colStatus: column.status,
    });

    const subtask1 = new Subtask({
      title: 'Sign up page',
      isCompleted: true,
    });
    const subtask2 = new Subtask({
      title: 'Sign in page',
    });
    const subtask3 = new Subtask({
      title: 'Welcome Page',
    });
    user.boards.push(board._id);
    column.tasks.push(task._id);
    board.columns.push(column._id);
    task.subtasks.push(subtask1._id, subtask2._id, subtask3._id);
    await user.save();
    await board.save();
    await column.save();
    await task.save();
    await subtask1.save();
    await subtask2.save();
    await subtask3.save();
    return res.status(200).json({
      message: 'Create TEmplate Data',
      user,
      board,
      task,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: 'Error creating Template Data', error });
  }
}
