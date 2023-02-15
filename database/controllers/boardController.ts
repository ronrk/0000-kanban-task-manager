import { IApiBoardRequest } from '@/pages/api/boards';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import Board from '../models/Board';
import Column from '../models/Column';

export async function getAllBoards(req: NextApiRequest, res: NextApiResponse) {
  try {
    const boards = await Board.find({});
    if (!boards) {
      return res.status(404).json({ message: 'Data not found' });
    }
    return res.status(200).json(boards);
  } catch (error) {
    return res.status(404).json({ message: 'Error while fetching data' });
  }
}
export async function getSingleBoards() {}
export async function getColumnsByBoardId() {}

export async function createNewBoard(
  req: IApiBoardRequest,
  res: NextApiResponse
) {
  const newColumnsFormated = req.body.columns.map((col) => ({
    ...col,
    _id: new mongoose.Types.ObjectId(),
  }));
  const newBoardFormated = {
    ...req.body,
    columns: newColumnsFormated.map((col) => col._id),
    _id: new mongoose.Types.ObjectId(),
  };
  const newBoard = await Board.create(newBoardFormated);

  const newColumns = await Column.insertMany(newColumnsFormated);

  return res
    .status(200)
    .json({ message: 'Create New Board', data: { newBoard, newColumns } });
}

export async function getTemplateBoard(
  req: IApiBoardRequest,
  res: NextApiResponse
) {
  const initialBoard = await new Board({
    name: '',
    columns: [],
  });
  const initialColumn = new Column({ name: 'Todo' });
  initialBoard.columns.push(initialColumn._id);

  return res.status(200).json({ initialBoard, initialColumn });
  /*   } catch (error) {
    return res.status(404).json({ error, nessage: 'Error' });
  } */
}

export async function updateBoard() {}

export async function deleteBoard() {}
