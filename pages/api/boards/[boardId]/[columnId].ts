import {
  Board,
  Column,
  connectMongo,
  server404Error,
  wrongMethodError,
} from '@/database';
import { IColumnSchema } from '@/types';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
// server404Error(res, `Cant find user with id :${query.uid}`);
// server404Error(res, 'createNewUser: no data on req.body');
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
      return server404Error(res, `Cant find board with id :${query.boardId}`);
    }
    const column = await Column.findById(query.columnId);
    if (!column) {
      return server404Error(res, `Cant find column with id :${query.columnId}`);
    }

    //

    if (method === 'PATCH') {
      if (!body) {
        server404Error(res, 'updateColumn: no data on req.body');
        return;
      }
      const updatedColumn = await Column.findOneAndUpdate(
        { _id: column._id },
        body,
        { new: true }
      );
      return res.status(200).json({ message: 'Updated column', updatedColumn });
    }
    if (method === 'DELETE') {
      const deletedColumn = await Column.findOneAndDelete({
        _id: column._id,
      }).select('_id');
      const columns = board.columns
        .filter((col: mongoose.Types.ObjectId) => {
          console.log({ col: col, column: column._id });
          console.log(col.toString() !== column._id.toString());
          return col.toString() !== column._id.toString();
        })
        .map((col: IColumnSchema) => col._id);
      const updatedBoard = await Board.findByIdAndUpdate(
        { _id: board._id },
        {
          columns,
        },
        { new: true }
      );
      console.log({ deletedColumn, updatedBoard, columns });
      return res.status(200).json({ message: 'Column Removed', deletedColumn });
    }
    wrongMethodError(req, res, ['PATCH', 'DELETE']);
    return;
  } catch (error) {
    console.log({ error });
    return res.status(404).json({ message: 'Error propeties/', error });
  }
}
