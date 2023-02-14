import { IApiBoardRequest } from '@/pages/api/boards';
import { IBoardWithId } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import Boards from '../models/Board';

export async function getAllBoards(req: NextApiRequest, res: NextApiResponse) {
  try {
    const boards = await Boards.find({});
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
  try {
    const boardData = req.body;
    if (!boardData) {
      return;
    }
    const board: IBoardWithId = new Boards(boardData);
    return res.status(200).json({ boardData, board });
  } catch (error) {
    return res.status(404).json({ message: 'Error while fetching data' });
  }
}

export async function updateBoard() {}

export async function deleteBoard() {}
