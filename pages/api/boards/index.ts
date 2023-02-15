// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectMongo } from '@/database/connect';
import {
  createNewBoard,
  getAllBoards,
  getTemplateBoard,
} from '@/database/controllers/boardController';
import { serverWrongMethodError } from '@/lib/server/serverErrorRes';
import { IBoard } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface IApiBoardRequest extends NextApiRequest {
  body: IBoard;
}

export default async function handler(
  req: IApiBoardRequest,
  res: NextApiResponse
) {
  connectMongo().catch(() =>
    res.status(405).json({ error: 'Error in the Connction' })
  );
  const { method, body, query } = req;
  const isQuery = Object.keys(query).length !== 0;
  switch (method) {
    case 'GET':
      if (isQuery) {
        if (query.template && query.template === 'true') {
          getTemplateBoard(req, res);
          break;
        }
        res
          .status(200)
          .json({ message: 'Get single Board', boardId: query.boardId });
        break;
      }
      await getAllBoards(req, res);
      break;

    case 'POST':
      /*     if (!body) {
        serverNoDataOnBodyError(res);
        break;
      } */
      await createNewBoard(req, res);
      break;
    default:
      serverWrongMethodError(res, ['GET', 'POST'], method || '');
      break;
  }
}
