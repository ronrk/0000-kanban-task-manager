import {
  Board,
  Column,
  connectMongo,
  server404Error,
  User,
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
    if (method === 'GET') {
      if (query.template === 'true') {
        const initialColumn = new Column({ status: 'Todo' });
        const initialBoard = new Board({
          name: '',
        });
        console.log({ initialColumn, initialBoard });
        return res.status(200).json({ initialBoard, initialColumn });
      }
      const board = await Board.findById(query.boardId);
      if (!board) {
        server404Error(res, `Cant find board with id :${query.boardId}`);
        return;
      }
      return res.status(200).json({ message: 'Get board by board id', board });
    }
    if (method === 'POST') {
      const user = await User.findById(query.uid);
      if (!user) {
        server404Error(res, `Cant create board without UID`, 401);
        return;
      }
      if (!body) {
        server404Error(res, 'createNewBoard: No data on req.body');
        return;
      }
      const newBoard = await Board.create({ ...body, user: query.uid });
      user.boards.push(newBoard.id);
      await user.save();
      return res.status(200).json({ message: 'Create new board', newBoard });
    }
    wrongMethodError(req, res, ['GET', 'POST']);
    return;
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error propeties/', error });
  }
}
