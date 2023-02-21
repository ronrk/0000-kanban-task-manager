import { IColumnSchema } from '@/types';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { Board } from '../models/Board';
import { Column } from '../models/Column';
import { User } from '../models/User';
import { server404Error } from '../serverFunction';

export const createNewBoardAPI = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { body, query } = req;
  try {
    const user = await User.findById(query.uid);
    if (!user) {
      return server404Error(res, `Cant create board without UID`, 401);
    }
    if (!body) {
      return server404Error(res, 'createNewBoard: No data on req.body');
    }

    const newBoard = {
      ...body,
      columns: body.columns.map((col: IColumnSchema) => col._id),
    };
    await body.columns.forEach(
      async (col: IColumnSchema) => await Column.create(col)
    );
    const board = await Board.create({
      ...newBoard,
      user: query.uid,
      _id: new mongoose.Types.ObjectId(),
    });

    user.boards.push(board.id);

    await user.save();
    query.boardId = board._id.toString();
    return await getBoardByUID(req, res);
  } catch (error) {
    console.log({ error });
    return server404Error(
      res,
      'Something wrong with CREATE NEW BOARD CONTROLLER',
      403
    );
  }
};

export const generateTemplateBoardAPI = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const initialColumn = new Column({ status: 'Todo' });
  const initialBoard = new Board({
    name: '',
  });
  return res.status(200).json({ initialBoard, initialColumn });
};

export const getBoardByUID = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const boards = await Board.find({ user: req.query.uid });
    if (!boards) {
      throw 'cant find boards';
    }
    return res
      .status(200)
      .json({ message: `Get all boards for ${req.query.uid}`, data: boards });
  } catch (error) {
    console.log({ error, message: 'GetBoardsByUID' });
    return server404Error(res, `Cant find boards`);
  }
};

export const getSingleBoardAPI = async (
  { query }: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const board = await Board.findById(query.boardId);
    console.log({ board, message: 'GET SINGLE BOARD CONTROLLER' });
    if (!board) {
      return server404Error(res, `Cant find board with id :${query.boardId}`);
    }
    return res
      .status(200)
      .json({ message: 'Get board by board id', data: board });
  } catch (error) {
    return server404Error(res, `Cant find board with id :${query.boardId}`);
  }
};

export const editBoardByIdAPI = async (
  { query, body }: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    console.log({ message: 'EDIT BOARD CONTROLLER' });
    const columns = await body.columns.map(async (col: IColumnSchema) => {
      const updatedCol = await Column.findByIdAndUpdate(col._id, col, {
        new: true,
      });
      if (!updatedCol) {
        return await Column.create(col);
      }
      return updatedCol;
    });

    console.log({ columns });
    const board = await Board.findByIdAndUpdate(query.boardId, body, {
      new: true,
    });
    console.log({ board, columns });
    if (!board) {
      return server404Error(res, `Cant find board with id :${query.boardId}`);
    }
    return res
      .status(200)
      .json({ message: 'Edit board by board id', data: { board, columns } });
  } catch (error) {
    return server404Error(res, `Cant find board with id :${query.boardId}`);
  }
};
