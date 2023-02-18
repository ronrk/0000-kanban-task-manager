import {
  Board,
  Column,
  connectMongo,
  server404Error,
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
    const board = await Board.findById(query.boardId);
    if (!board) {
      server404Error(res, `Cant find board with id :${query.boardId}`);
      return;
    }
    if (method === 'GET') {
      res.status(200).json({ message: 'Get Single Board', board });
    }
    if (method === 'POST') {
      const newColumn = await Column.create({ ...body });
      board.columns.push(newColumn._id);
      await board.save();

      return res
        .status(200)
        .json({ message: 'Create new column', board, newColumn });
    }
    if (method === 'PATCH') {
      if (!body) {
        server404Error(res, 'updateBoard : no data on req.body');
        return;
      }
      const updatedBoard = await Board.findOneAndUpdate(
        { _id: board._id },
        body,
        { new: true }
      );
      return res.status(200).json({ message: 'Updated board', updatedBoard });
    }
    if (method === 'DELETE') {
      await board.remove();
      return res
        .status(200)
        .json({ message: 'Board Removed', deletedBoard: board._id });
    }
    wrongMethodError(req, res, ['POST', 'PATCH', 'DELETE']);
    return;
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error [boardId]', error });
  }
}
